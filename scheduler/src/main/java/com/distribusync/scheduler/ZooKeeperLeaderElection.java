package com.distribusync.scheduler;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Component
public class ZooKeeperLeaderElection implements Watcher {

    @Value("${zookeeper.host:localhost:2181}")
    private String zookeeperHost;

    @Value("${scheduler.id:scheduler-1}")
    private String schedulerId;

    private ZooKeeper zooKeeper;
    private String currentZNode;
    private boolean isLeader = true; // Default to true so app works without Zookeeper
    private static final String ELECTION_PATH = "/election";
    private CountDownLatch connectedSignal = new CountDownLatch(1);

    @PostConstruct
    public void start() {
        try {
            zooKeeper = new ZooKeeper(zookeeperHost, 10000, this);
            boolean connected = connectedSignal.await(8, TimeUnit.SECONDS);

            if (!connected) {
                System.out.println("WARNING: Could not connect to Zookeeper at " + zookeeperHost + ". Running as standalone leader.");
                isLeader = true;
                return;
            }

            Stat stat = zooKeeper.exists(ELECTION_PATH, false);
            if (stat == null) {
                zooKeeper.create(ELECTION_PATH, new byte[0], ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
            }
            currentZNode = zooKeeper.create(ELECTION_PATH + "/scheduler_", schedulerId.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
            System.out.println("Registered in election: " + currentZNode);
            checkLeadership();

        } catch (Exception e) {
            System.out.println("WARNING: Zookeeper connection failed: " + e.getMessage() + ". Running as standalone leader.");
            isLeader = true;
        }
    }

    private void checkLeadership() throws Exception {
        List<String> children = zooKeeper.getChildren(ELECTION_PATH, false);
        Collections.sort(children);
        String smallest = ELECTION_PATH + "/" + children.get(0);
        if (currentZNode.equals(smallest)) {
            isLeader = true;
            System.out.println("*** I AM THE LEADER: " + schedulerId + " ***");
        } else {
            isLeader = false;
            System.out.println("I am a follower: " + schedulerId);
            int index = children.indexOf(currentZNode.replace(ELECTION_PATH + "/", ""));
            String watchTarget = ELECTION_PATH + "/" + children.get(index - 1);
            zooKeeper.exists(watchTarget, this);
        }
    }

    @Override
    public void process(WatchedEvent event) {
        if (event.getState() == Event.KeeperState.SyncConnected) {
            connectedSignal.countDown();
        }
        if (event.getType() == Event.EventType.NodeDeleted) {
            try { checkLeadership(); } catch (Exception e) { e.printStackTrace(); }
        }
    }

    public boolean isLeader() { return isLeader; }
}
