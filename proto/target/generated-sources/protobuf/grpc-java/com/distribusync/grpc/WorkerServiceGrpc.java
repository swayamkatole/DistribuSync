package com.distribusync.grpc;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * <pre>
 * Scheduler → Worker: assign tasks
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.58.0)",
    comments = "Source: task_scheduler.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class WorkerServiceGrpc {

  private WorkerServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "taskscheduler.WorkerService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.distribusync.grpc.TaskAssignment,
      com.distribusync.grpc.TaskResult> getAssignTaskMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AssignTask",
      requestType = com.distribusync.grpc.TaskAssignment.class,
      responseType = com.distribusync.grpc.TaskResult.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.distribusync.grpc.TaskAssignment,
      com.distribusync.grpc.TaskResult> getAssignTaskMethod() {
    io.grpc.MethodDescriptor<com.distribusync.grpc.TaskAssignment, com.distribusync.grpc.TaskResult> getAssignTaskMethod;
    if ((getAssignTaskMethod = WorkerServiceGrpc.getAssignTaskMethod) == null) {
      synchronized (WorkerServiceGrpc.class) {
        if ((getAssignTaskMethod = WorkerServiceGrpc.getAssignTaskMethod) == null) {
          WorkerServiceGrpc.getAssignTaskMethod = getAssignTaskMethod =
              io.grpc.MethodDescriptor.<com.distribusync.grpc.TaskAssignment, com.distribusync.grpc.TaskResult>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AssignTask"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.TaskAssignment.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.TaskResult.getDefaultInstance()))
              .setSchemaDescriptor(new WorkerServiceMethodDescriptorSupplier("AssignTask"))
              .build();
        }
      }
    }
    return getAssignTaskMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo,
      com.distribusync.grpc.Ack> getRegisterWorkerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RegisterWorker",
      requestType = com.distribusync.grpc.WorkerInfo.class,
      responseType = com.distribusync.grpc.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo,
      com.distribusync.grpc.Ack> getRegisterWorkerMethod() {
    io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo, com.distribusync.grpc.Ack> getRegisterWorkerMethod;
    if ((getRegisterWorkerMethod = WorkerServiceGrpc.getRegisterWorkerMethod) == null) {
      synchronized (WorkerServiceGrpc.class) {
        if ((getRegisterWorkerMethod = WorkerServiceGrpc.getRegisterWorkerMethod) == null) {
          WorkerServiceGrpc.getRegisterWorkerMethod = getRegisterWorkerMethod =
              io.grpc.MethodDescriptor.<com.distribusync.grpc.WorkerInfo, com.distribusync.grpc.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RegisterWorker"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.WorkerInfo.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new WorkerServiceMethodDescriptorSupplier("RegisterWorker"))
              .build();
        }
      }
    }
    return getRegisterWorkerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo,
      com.distribusync.grpc.Ack> getHeartbeatMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Heartbeat",
      requestType = com.distribusync.grpc.WorkerInfo.class,
      responseType = com.distribusync.grpc.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo,
      com.distribusync.grpc.Ack> getHeartbeatMethod() {
    io.grpc.MethodDescriptor<com.distribusync.grpc.WorkerInfo, com.distribusync.grpc.Ack> getHeartbeatMethod;
    if ((getHeartbeatMethod = WorkerServiceGrpc.getHeartbeatMethod) == null) {
      synchronized (WorkerServiceGrpc.class) {
        if ((getHeartbeatMethod = WorkerServiceGrpc.getHeartbeatMethod) == null) {
          WorkerServiceGrpc.getHeartbeatMethod = getHeartbeatMethod =
              io.grpc.MethodDescriptor.<com.distribusync.grpc.WorkerInfo, com.distribusync.grpc.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Heartbeat"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.WorkerInfo.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new WorkerServiceMethodDescriptorSupplier("Heartbeat"))
              .build();
        }
      }
    }
    return getHeartbeatMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static WorkerServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<WorkerServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<WorkerServiceStub>() {
        @java.lang.Override
        public WorkerServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new WorkerServiceStub(channel, callOptions);
        }
      };
    return WorkerServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static WorkerServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<WorkerServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<WorkerServiceBlockingStub>() {
        @java.lang.Override
        public WorkerServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new WorkerServiceBlockingStub(channel, callOptions);
        }
      };
    return WorkerServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static WorkerServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<WorkerServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<WorkerServiceFutureStub>() {
        @java.lang.Override
        public WorkerServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new WorkerServiceFutureStub(channel, callOptions);
        }
      };
    return WorkerServiceFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Scheduler → Worker: assign tasks
   * </pre>
   */
  public interface AsyncService {

    /**
     */
    default void assignTask(com.distribusync.grpc.TaskAssignment request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.TaskResult> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAssignTaskMethod(), responseObserver);
    }

    /**
     */
    default void registerWorker(com.distribusync.grpc.WorkerInfo request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getRegisterWorkerMethod(), responseObserver);
    }

    /**
     */
    default void heartbeat(com.distribusync.grpc.WorkerInfo request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getHeartbeatMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service WorkerService.
   * <pre>
   * Scheduler → Worker: assign tasks
   * </pre>
   */
  public static abstract class WorkerServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return WorkerServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service WorkerService.
   * <pre>
   * Scheduler → Worker: assign tasks
   * </pre>
   */
  public static final class WorkerServiceStub
      extends io.grpc.stub.AbstractAsyncStub<WorkerServiceStub> {
    private WorkerServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected WorkerServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new WorkerServiceStub(channel, callOptions);
    }

    /**
     */
    public void assignTask(com.distribusync.grpc.TaskAssignment request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.TaskResult> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAssignTaskMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void registerWorker(com.distribusync.grpc.WorkerInfo request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getRegisterWorkerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void heartbeat(com.distribusync.grpc.WorkerInfo request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getHeartbeatMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service WorkerService.
   * <pre>
   * Scheduler → Worker: assign tasks
   * </pre>
   */
  public static final class WorkerServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<WorkerServiceBlockingStub> {
    private WorkerServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected WorkerServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new WorkerServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.distribusync.grpc.TaskResult assignTask(com.distribusync.grpc.TaskAssignment request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAssignTaskMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.distribusync.grpc.Ack registerWorker(com.distribusync.grpc.WorkerInfo request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getRegisterWorkerMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.distribusync.grpc.Ack heartbeat(com.distribusync.grpc.WorkerInfo request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getHeartbeatMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service WorkerService.
   * <pre>
   * Scheduler → Worker: assign tasks
   * </pre>
   */
  public static final class WorkerServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<WorkerServiceFutureStub> {
    private WorkerServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected WorkerServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new WorkerServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.distribusync.grpc.TaskResult> assignTask(
        com.distribusync.grpc.TaskAssignment request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAssignTaskMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.distribusync.grpc.Ack> registerWorker(
        com.distribusync.grpc.WorkerInfo request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getRegisterWorkerMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.distribusync.grpc.Ack> heartbeat(
        com.distribusync.grpc.WorkerInfo request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getHeartbeatMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_ASSIGN_TASK = 0;
  private static final int METHODID_REGISTER_WORKER = 1;
  private static final int METHODID_HEARTBEAT = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_ASSIGN_TASK:
          serviceImpl.assignTask((com.distribusync.grpc.TaskAssignment) request,
              (io.grpc.stub.StreamObserver<com.distribusync.grpc.TaskResult>) responseObserver);
          break;
        case METHODID_REGISTER_WORKER:
          serviceImpl.registerWorker((com.distribusync.grpc.WorkerInfo) request,
              (io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack>) responseObserver);
          break;
        case METHODID_HEARTBEAT:
          serviceImpl.heartbeat((com.distribusync.grpc.WorkerInfo) request,
              (io.grpc.stub.StreamObserver<com.distribusync.grpc.Ack>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getAssignTaskMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.distribusync.grpc.TaskAssignment,
              com.distribusync.grpc.TaskResult>(
                service, METHODID_ASSIGN_TASK)))
        .addMethod(
          getRegisterWorkerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.distribusync.grpc.WorkerInfo,
              com.distribusync.grpc.Ack>(
                service, METHODID_REGISTER_WORKER)))
        .addMethod(
          getHeartbeatMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.distribusync.grpc.WorkerInfo,
              com.distribusync.grpc.Ack>(
                service, METHODID_HEARTBEAT)))
        .build();
  }

  private static abstract class WorkerServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    WorkerServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.distribusync.grpc.TaskSchedulerProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("WorkerService");
    }
  }

  private static final class WorkerServiceFileDescriptorSupplier
      extends WorkerServiceBaseDescriptorSupplier {
    WorkerServiceFileDescriptorSupplier() {}
  }

  private static final class WorkerServiceMethodDescriptorSupplier
      extends WorkerServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    WorkerServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (WorkerServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new WorkerServiceFileDescriptorSupplier())
              .addMethod(getAssignTaskMethod())
              .addMethod(getRegisterWorkerMethod())
              .addMethod(getHeartbeatMethod())
              .build();
        }
      }
    }
    return result;
  }
}
