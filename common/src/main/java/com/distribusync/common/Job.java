package com.distribusync.common;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private String assignedWorker;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Job() {}

    public Job(String name) {
        this.name = name;
        this.status = JobStatus.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
    public String getAssignedWorker() { return assignedWorker; }
    public void setAssignedWorker(String assignedWorker) { this.assignedWorker = assignedWorker; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
