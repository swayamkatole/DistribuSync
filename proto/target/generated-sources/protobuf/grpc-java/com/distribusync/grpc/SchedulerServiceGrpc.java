package com.distribusync.grpc;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * <pre>
 * Client → Scheduler: submit jobs
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.58.0)",
    comments = "Source: task_scheduler.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class SchedulerServiceGrpc {

  private SchedulerServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "taskscheduler.SchedulerService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.distribusync.grpc.JobRequest,
      com.distribusync.grpc.JobResponse> getSubmitJobMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SubmitJob",
      requestType = com.distribusync.grpc.JobRequest.class,
      responseType = com.distribusync.grpc.JobResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.distribusync.grpc.JobRequest,
      com.distribusync.grpc.JobResponse> getSubmitJobMethod() {
    io.grpc.MethodDescriptor<com.distribusync.grpc.JobRequest, com.distribusync.grpc.JobResponse> getSubmitJobMethod;
    if ((getSubmitJobMethod = SchedulerServiceGrpc.getSubmitJobMethod) == null) {
      synchronized (SchedulerServiceGrpc.class) {
        if ((getSubmitJobMethod = SchedulerServiceGrpc.getSubmitJobMethod) == null) {
          SchedulerServiceGrpc.getSubmitJobMethod = getSubmitJobMethod =
              io.grpc.MethodDescriptor.<com.distribusync.grpc.JobRequest, com.distribusync.grpc.JobResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SubmitJob"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.JobRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.JobResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SchedulerServiceMethodDescriptorSupplier("SubmitJob"))
              .build();
        }
      }
    }
    return getSubmitJobMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.distribusync.grpc.JobResponse,
      com.distribusync.grpc.JobResponse> getGetJobStatusMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetJobStatus",
      requestType = com.distribusync.grpc.JobResponse.class,
      responseType = com.distribusync.grpc.JobResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.distribusync.grpc.JobResponse,
      com.distribusync.grpc.JobResponse> getGetJobStatusMethod() {
    io.grpc.MethodDescriptor<com.distribusync.grpc.JobResponse, com.distribusync.grpc.JobResponse> getGetJobStatusMethod;
    if ((getGetJobStatusMethod = SchedulerServiceGrpc.getGetJobStatusMethod) == null) {
      synchronized (SchedulerServiceGrpc.class) {
        if ((getGetJobStatusMethod = SchedulerServiceGrpc.getGetJobStatusMethod) == null) {
          SchedulerServiceGrpc.getGetJobStatusMethod = getGetJobStatusMethod =
              io.grpc.MethodDescriptor.<com.distribusync.grpc.JobResponse, com.distribusync.grpc.JobResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetJobStatus"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.JobResponse.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.distribusync.grpc.JobResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SchedulerServiceMethodDescriptorSupplier("GetJobStatus"))
              .build();
        }
      }
    }
    return getGetJobStatusMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static SchedulerServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceStub>() {
        @java.lang.Override
        public SchedulerServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SchedulerServiceStub(channel, callOptions);
        }
      };
    return SchedulerServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static SchedulerServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceBlockingStub>() {
        @java.lang.Override
        public SchedulerServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SchedulerServiceBlockingStub(channel, callOptions);
        }
      };
    return SchedulerServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static SchedulerServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SchedulerServiceFutureStub>() {
        @java.lang.Override
        public SchedulerServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SchedulerServiceFutureStub(channel, callOptions);
        }
      };
    return SchedulerServiceFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Client → Scheduler: submit jobs
   * </pre>
   */
  public interface AsyncService {

    /**
     */
    default void submitJob(com.distribusync.grpc.JobRequest request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getSubmitJobMethod(), responseObserver);
    }

    /**
     */
    default void getJobStatus(com.distribusync.grpc.JobResponse request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetJobStatusMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service SchedulerService.
   * <pre>
   * Client → Scheduler: submit jobs
   * </pre>
   */
  public static abstract class SchedulerServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return SchedulerServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service SchedulerService.
   * <pre>
   * Client → Scheduler: submit jobs
   * </pre>
   */
  public static final class SchedulerServiceStub
      extends io.grpc.stub.AbstractAsyncStub<SchedulerServiceStub> {
    private SchedulerServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SchedulerServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SchedulerServiceStub(channel, callOptions);
    }

    /**
     */
    public void submitJob(com.distribusync.grpc.JobRequest request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getSubmitJobMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getJobStatus(com.distribusync.grpc.JobResponse request,
        io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetJobStatusMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service SchedulerService.
   * <pre>
   * Client → Scheduler: submit jobs
   * </pre>
   */
  public static final class SchedulerServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<SchedulerServiceBlockingStub> {
    private SchedulerServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SchedulerServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SchedulerServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.distribusync.grpc.JobResponse submitJob(com.distribusync.grpc.JobRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getSubmitJobMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.distribusync.grpc.JobResponse getJobStatus(com.distribusync.grpc.JobResponse request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetJobStatusMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service SchedulerService.
   * <pre>
   * Client → Scheduler: submit jobs
   * </pre>
   */
  public static final class SchedulerServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<SchedulerServiceFutureStub> {
    private SchedulerServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SchedulerServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SchedulerServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.distribusync.grpc.JobResponse> submitJob(
        com.distribusync.grpc.JobRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getSubmitJobMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.distribusync.grpc.JobResponse> getJobStatus(
        com.distribusync.grpc.JobResponse request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetJobStatusMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_SUBMIT_JOB = 0;
  private static final int METHODID_GET_JOB_STATUS = 1;

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
        case METHODID_SUBMIT_JOB:
          serviceImpl.submitJob((com.distribusync.grpc.JobRequest) request,
              (io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse>) responseObserver);
          break;
        case METHODID_GET_JOB_STATUS:
          serviceImpl.getJobStatus((com.distribusync.grpc.JobResponse) request,
              (io.grpc.stub.StreamObserver<com.distribusync.grpc.JobResponse>) responseObserver);
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
          getSubmitJobMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.distribusync.grpc.JobRequest,
              com.distribusync.grpc.JobResponse>(
                service, METHODID_SUBMIT_JOB)))
        .addMethod(
          getGetJobStatusMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.distribusync.grpc.JobResponse,
              com.distribusync.grpc.JobResponse>(
                service, METHODID_GET_JOB_STATUS)))
        .build();
  }

  private static abstract class SchedulerServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    SchedulerServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.distribusync.grpc.TaskSchedulerProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("SchedulerService");
    }
  }

  private static final class SchedulerServiceFileDescriptorSupplier
      extends SchedulerServiceBaseDescriptorSupplier {
    SchedulerServiceFileDescriptorSupplier() {}
  }

  private static final class SchedulerServiceMethodDescriptorSupplier
      extends SchedulerServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    SchedulerServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (SchedulerServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new SchedulerServiceFileDescriptorSupplier())
              .addMethod(getSubmitJobMethod())
              .addMethod(getGetJobStatusMethod())
              .build();
        }
      }
    }
    return result;
  }
}
