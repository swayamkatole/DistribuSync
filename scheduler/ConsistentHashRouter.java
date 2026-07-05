package com.distribusync.scheduler;

import org.springframework.stereotype.Component;
import java.util.*;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Component
public class ConsistentHashRouter {

    // Virtual nodes for better distribution
    private final int VIRTUAL_NODES = 150;
    private final TreeMap<Integer, String> ring = new TreeMap<>();

    // ReadWriteLock — from your resume!
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    // Add a worker to the hash ring
    public void addWorker(String workerId) {
        lock.writeLock().lock();
        try {
            for (int i = 0; i < VIRTUAL_NODES; i++) {
                int hash = hash(workerId + "-node-" + i);
                ring.put(hash, workerId);
            }
            System.out.println("Added worker to ring: " + workerId +
                             " | Ring size: " + ring.size());
        } finally {
            lock.writeLock().unlock();
        }
    }

    // Remove a worker from the hash ring
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

    // Get the worker responsible for a given job
    public String getWorkerForJob(String jobId) {
        lock.readLock().lock();
        try {
            if (ring.isEmpty()) {
                return null;
            }

            int hash = hash(jobId);

            // Find the first worker clockwise from this hash
            Map.Entry<Integer, String> entry = ring.ceilingEntry(hash);
            if (entry == null) {
                // Wrap around to the first worker
                entry = ring.firstEntry();
            }

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

    // Simple hash function
    private int hash(String key) {
        return Math.abs(key.hashCode());
    }
}