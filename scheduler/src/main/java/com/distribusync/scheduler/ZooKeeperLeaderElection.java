package com.distribusync.scheduler;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Component
public class ZooKeeperLeaderElection implements Watcher {

    private final String zookeeperHost = "localhost:2181";
    private final String schedulerId = "scheduler-1";
    private ZooKeeper zooKeeper;
    private String currentZNode;
    private boolean isLeader = false;
    private static final String ELECTION_PATH = "/election";

    @PostConstruct
    public void start() throws Exception {
        zooKeeper = new ZooKeeper(zookeeperHost, 3000, this);
        Thread.sleep(1000);
        Stat stat = zooKeeper.exists(ELECTION_PATH, false);
        if (stat == null) {
            zooKeeper.create(ELECTION_PATH, new byte[0], ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }
        currentZNode = zooKeeper.create(ELECTION_PATH + "/scheduler_", schedulerId.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
        System.out.println("Registered in election: " + currentZNode);
        checkLeadership();
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
        if (event.getType() == Event.EventType.NodeDeleted) {
            try { checkLeadership(); } catch (Exception e) { e.printStackTrace(); }
        }
    }

    public boolean isLeader() { return isLeader; }
}
