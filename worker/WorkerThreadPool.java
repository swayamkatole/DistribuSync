package com.distribusync.worker;

import org.springframework.stereotype.Component;
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class WorkerThreadPool {

    private final ExecutorService threadPool;
    private final ReentrantLock lock = new ReentrantLock();
    private int activeJobs = 0;
    private final int MAX_JOBS = 50;

    public WorkerThreadPool() {
        this.threadPool = Executors.newFixedThreadPool(10);
        System.out.println("WorkerThreadPool initialized with 10 threads");
    }

    public boolean submitJob(String jobId, String jobName, Runnable jobTask) {
        lock.lock();
        try {
            if (activeJobs >= MAX_JOBS) {
                System.out.println("Worker at capacity! Rejecting job: " + jobId);
                return false;
            }
            activeJobs++;
            System.out.println("Accepting job: " + jobId + " | Active jobs: " + activeJobs);
        } finally {
            lock.unlock();
        }

        threadPool.submit(() -> {
            try {
                System.out.println("Executing job: " + jobId + " (" + jobName + ")");
                jobTask.run();
                System.out.println("Completed job: " + jobId);
            } catch (Exception e) {
                System.err.println("Job failed: " + jobId + " | Error: " + e.getMessage());
            } finally {
                lock.lock();
                try {
                    activeJobs--;
                } finally {
                    lock.unlock();
                }
            }
        });

        return true;
    }

    public int getActiveJobs() {
        lock.lock();
        try {
            return activeJobs;
        } finally {
            lock.unlock();
        }
    }

    public void shutdown() {
        threadPool.shutdown();
    }
}