package com.distribusync.common;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findByStatus(JobStatus status);
    List<Job> findByAssignedWorker(String workerId);
}
