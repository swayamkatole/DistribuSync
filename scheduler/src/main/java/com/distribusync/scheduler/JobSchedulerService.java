package com.distribusync.scheduler;

import com.distribusync.common.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class JobSchedulerService {

    private final JobRepository jobRepository;
    private final ConsistentHashRouter hashRouter;
    private final ZooKeeperLeaderElection leaderElection;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${worker.host:localhost}")
    private String workerHost;

    @Value("${worker.port:8081}")
    private String workerPort;

    private final Map<String, String> workerUrls = new HashMap<>();

    public JobSchedulerService(JobRepository jobRepository,
                               ConsistentHashRouter hashRouter,
                               ZooKeeperLeaderElection leaderElection) {
        this.jobRepository = jobRepository;
        this.hashRouter = hashRouter;
        this.leaderElection = leaderElection;
    }

    public void registerWorker(String workerId, String host, String port) {
        String url = "https://" + host + "/worker/execute";
        workerUrls.put(workerId, url);
        hashRouter.addWorker(workerId);
        System.out.println("Registered worker: " + workerId + " at " + url);
    }

    public Job submitJob(String jobName) {
        if (workerUrls.isEmpty()) {
            registerWorker("worker-1", workerHost, workerPort);
        }

        Job job = new Job(jobName);
        job = jobRepository.save(job);

        String workerId = hashRouter.getWorkerForJob(job.getId());
        if (workerId == null) {
            job.setStatus(JobStatus.FAILED);
            jobRepository.save(job);
            throw new RuntimeException("No workers available!");
        }

        System.out.println("Assigning job " + job.getId() + " to worker " + workerId);

        String workerUrl = workerUrls.get(workerId);

        Map<String, String> request = new HashMap<>();
        request.put("jobId", job.getId());
        request.put("jobName", jobName);

        try {
            Map response = restTemplate.postForObject(workerUrl, request, Map.class);
            String status = response != null ? (String) response.get("status") : "FAILED";
            job.setStatus(status.equals("COMPLETED") ? JobStatus.COMPLETED : JobStatus.FAILED);
        } catch (Exception e) {
            System.err.println("Worker call failed: " + e.getMessage());
            job.setStatus(JobStatus.FAILED);
        }

        job.setAssignedWorker(workerId);
        jobRepository.save(job);
        return job;
    }
}
