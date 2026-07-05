package com.distribusync.scheduler;

import com.distribusync.common.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class SchedulerController {

    private final JobSchedulerService schedulerService;

    public SchedulerController(JobSchedulerService schedulerService) {
        this.schedulerService = schedulerService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitJob(@RequestBody Map<String, String> request) {
        try {
            String jobName = request.get("jobName");
            Job job = schedulerService.submitJob(jobName);
            return ResponseEntity.ok(Map.of(
                "jobId", job.getId(),
                "status", job.getStatus().toString(),
                "assignedWorker", job.getAssignedWorker()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}