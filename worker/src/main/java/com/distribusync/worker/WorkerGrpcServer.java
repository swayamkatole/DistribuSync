package com.distribusync.worker;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Component
public class WorkerGrpcServer {

    private static final int GRPC_PORT = 9090;
    private Server server;
    private final WorkerGrpcService workerGrpcService;

    public WorkerGrpcServer(WorkerGrpcService workerGrpcService) {
        this.workerGrpcService = workerGrpcService;
    }

    @PostConstruct
    public void start() throws Exception {
        server = ServerBuilder.forPort(GRPC_PORT)
                .addService(workerGrpcService)
                .build()
                .start();
        System.out.println("Worker gRPC server started on port " + GRPC_PORT);
    }

    @PreDestroy
    public void stop() {
        if (server != null) {
            server.shutdown();
            System.out.println("Worker gRPC server stopped");
        }
    }
}
