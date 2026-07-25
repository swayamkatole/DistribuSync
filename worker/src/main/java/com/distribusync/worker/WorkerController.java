package com.distribusync.worker;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/worker")
public class WorkerController {

    private final WorkerThreadPool threadPool;

    public WorkerController(WorkerThreadPool threadPool) {
        this.threadPool = threadPool;
    }

    @PostMapping("/execute")
    public Map<String, String> execute(@RequestBody Map<String, String> request) {
        String jobId = request.get("jobId");
        String jobName = request.get("jobName");

        boolean accepted = threadPool.submitJob(jobId, jobName, () -> {
            try { Thread.sleep(1000); } catch (Exception e) {}
        });

        return Map.of(
            "status", accepted ? "COMPLETED" : "FAILED",
            "jobId", jobId,
            "workerId", "worker-1"
        );
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "worker", "worker-1");
    }
}
