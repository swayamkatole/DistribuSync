package com.distribusync.scheduler;

import org.springframework.stereotype.Component;
import java.util.*;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Component
public class ConsistentHashRouter {

    private final int VIRTUAL_NODES = 150;
    private final TreeMap<Integer, String> ring = new TreeMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public void addWorker(String workerId) {
        lock.writeLock().lock();
        try {
            for (int i = 0; i < VIRTUAL_NODES; i++) {
                int hash = hash(workerId + "-node-" + i);
                ring.put(hash, workerId);
            }
            System.out.println("Added worker to ring: " + workerId);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void removeWorker(String workerId) {
        lock.writeLock().lock();
        try {
            for (int i = 0; i < VIRTUAL_NODES; i++) {
                int hash = hash(workerId + "-node-" + i);
                ring.remove(hash);
            }
            System.out.println("Removed worker from ring: " + workerId);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public String getWorkerForJob(String jobId) {
        lock.readLock().lock();
        try {
            if (ring.isEmpty()) return null;
            int hash = hash(jobId);
            Map.Entry<Integer, String> entry = ring.ceilingEntry(hash);
            if (entry == null) entry = ring.firstEntry();
            return entry.getValue();
        } finally {
            lock.readLock().unlock();
        }
    }

    public List<String> getAllWorkers() {
        lock.readLock().lock();
        try {
            return new ArrayList<>(new HashSet<>(ring.values()));
        } finally {
            lock.readLock().unlock();
        }
    }

    private int hash(String key) {
        return Math.abs(key.hashCode());
    }
}
