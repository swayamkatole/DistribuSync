package com.distribusync.worker;

import com.distribusync.grpc.*;
import io.grpc.stub.StreamObserver;
import org.springframework.stereotype.Service;

@Service
public class WorkerGrpcService extends WorkerServiceGrpc.WorkerServiceImplBase {

    private final WorkerThreadPool threadPool;

    public WorkerGrpcService(WorkerThreadPool threadPool) {
        this.threadPool = threadPool;
    }

    @Override
    public void assignTask(TaskAssignment request,
                           StreamObserver<TaskResult> responseObserver) {
        String jobId = request.getJobId();
        String jobName = request.getJobName();

        System.out.println("Received task assignment: " + jobId);

        boolean accepted = threadPool.submitJob(jobId, jobName, () -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        TaskResult result = TaskResult.newBuilder()
                .setJobId(jobId)
                .setWorkerId(request.getWorkerId())
                .setStatus(accepted ? "COMPLETED" : "FAILED")
                .setResult(accepted ? "Job executed successfully" : "Worker at capacity")
                .build();

        responseObserver.onNext(result);
        responseObserver.onCompleted();
    }

    @Override
    public void registerWorker(WorkerInfo request,
                               StreamObserver<Ack> responseObserver) {
        System.out.println("Worker registered: " + request.getWorkerId());

        Ack ack = Ack.newBuilder()
                .setSuccess(true)
                .setMessage("Worker " + request.getWorkerId() + " registered successfully")
                .build();

        responseObserver.onNext(ack);
        responseObserver.onCompleted();
    }

    @Override
    public void heartbeat(WorkerInfo request,
                          StreamObserver<Ack> responseObserver) {
        Ack ack = Ack.newBuilder()
                .setSuccess(true)
                .setMessage("alive")
                .build();

        responseObserver.onNext(ack);
        responseObserver.onCompleted();
    }
}
