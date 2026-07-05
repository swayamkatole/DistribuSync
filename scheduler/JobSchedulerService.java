package com.distribusync.scheduler;

import com.distribusync.common.*;
import com.distribusync.grpc.*;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class JobSchedulerService {

    private final JobRepository jobRepository;
    private final ConsistentHashRouter hashRouter;
    private final ZooKeeperLeaderElection leaderElection;

    // Map of workerId -> gRPC channel
    private final Map<String, ManagedChannel> workerChannels = new HashMap<>();
    private final Map<String, Integer> workerPorts = new HashMap<>();

    public JobSchedulerService(JobRepository jobRepository,
                               ConsistentHashRouter hashRouter,
                               ZooKeeperLeaderElection leaderElection) {
        this.jobRepository = jobRepository;
        this.hashRouter = hashRouter;
        this.leaderElection = leaderElection;

        // Register default worker
        registerWorker("worker-1", "localhost", 9090);
    }

    public void registerWorker(String workerId, String host, int port) {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress(host, port)
                .usePlaintext()
                .build();

        workerChannels.put(workerId, channel);
        workerPorts.put(workerId, port);
        hashRouter.addWorker(workerId);

        System.out.println("Registered worker: " + workerId +
                         " at " + host + ":" + port);
    }

    public Job submitJob(String jobName) {
        if (!leaderElection.isLeader()) {
            throw new RuntimeException("This scheduler is not the leader!");
        }

        // Save job to database
        Job job = new Job(jobName);
        job = jobRepository.save(job);

        // Find worker using consistent hashing
        String workerId = hashRouter.getWorkerForJob(job.getId());
        if (workerId == null) {
            job.setStatus(JobStatus.FAILED);
            jobRepository.save(job);
            throw new RuntimeException("No workers available!");
        }

        System.out.println("Assigning job " + job.getId() +
                         " to worker " + workerId);

        // Send to worker via gRPC
        ManagedChannel channel = workerChannels.get(workerId);
        WorkerServiceGrpc.WorkerServiceBlockingStub stub =
                WorkerServiceGrpc.newBlockingStub(channel);

        TaskAssignment assignment = TaskAssignment.newBuilder()
                .setJobId(job.getId())
                .setJobName(jobName)
                .setWorkerId(workerId)
                .setPayload("{}")
                .build();

        TaskResult result = stub.assignTask(assignment);

        // Update job status
        job.setStatus(result.getStatus().equals("COMPLETED") ?
                JobStatus.COMPLETED : JobStatus.FAILED);
        job.setAssignedWorker(workerId);
        jobRepository.save(job);

        return job;
    }
}