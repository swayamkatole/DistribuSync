import { motion } from "framer-motion";
import { GitBranch, Shield, Cpu, Database, Layers } from "lucide-react";
import { Card, SectionTag, CodeBlock } from "../components/common/UI";
import { ArchitectureFlow } from "../components/architecture/ArchitectureFlow";
import { ConsistentHashRing } from "../components/architecture/ConsistentHashRing";
import { LeaderElection } from "../components/architecture/LeaderElection";
import { ThreadPoolGrid } from "../components/architecture/ThreadPoolGrid";

function Section({
  icon: Icon,
  tag,
  title,
  description,
  code,
  visual,
  reverse,
}: {
  icon: any;
  tag: string;
  title: string;
  description: string;
  code: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={reverse ? "lg:order-2" : ""}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 ring-1 ring-white/10">
          <Icon className="h-5 w-5 text-indigo-300" />
        </div>
        <SectionTag>{tag}</SectionTag>
        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/50">{description}</p>
        <div className="mt-6">
          <CodeBlock>{code}</CodeBlock>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={reverse ? "lg:order-1" : ""}
      >
        <Card className="flex items-center justify-center p-8">{visual}</Card>
      </motion.div>
    </div>
  );
}

export function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionTag>System Design</SectionTag>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Inside the DistribuSync Engine
        </h1>
        <p className="mt-4 text-white/50">
          A guided tour of the distributed-systems techniques implemented across the scheduler and
          worker Spring Boot services.
        </p>
      </div>

      <Card className="mt-12 overflow-x-auto p-6">
        <ArchitectureFlow active />
      </Card>

      <div className="divide-y divide-white/5">
        <Section
          icon={GitBranch}
          tag="Consistent Hashing"
          title="Stable job → worker assignment"
          description="ConsistentHashRouter.java places every registered worker at a position on a virtual hash ring. Incoming jobs are hashed by ID and routed clockwise to the nearest worker — so adding or removing a node only reshuffles a small fraction of jobs instead of the whole cluster."
          code={`public class ConsistentHashRouter {
    private final SortedMap<Integer, String> ring = new TreeMap<>();

    public void addWorker(String workerId) {
        ring.put(hash(workerId), workerId);
    }

    public String getWorkerForJob(String jobId) {
        if (ring.isEmpty()) return null;
        int hash = hash(jobId);
        SortedMap<Integer, String> tail = ring.tailMap(hash);
        Integer key = tail.isEmpty() ? ring.firstKey() : tail.firstKey();
        return ring.get(key);
    }
}`}
          visual={<ConsistentHashRing />}
        />

        <Section
          icon={Shield}
          tag="ZooKeeper Leader Election"
          title="Exactly-once dispatch, automatic failover"
          description="Multiple scheduler replicas can run for high availability, but only one should actively dispatch jobs. ZooKeeperLeaderElection.java registers an ephemeral sequential znode per replica — the lowest sequence number wins leadership, and if that session dies, ZooKeeper promotes the next replica automatically."
          reverse
          code={`public class ZooKeeperLeaderElection implements Watcher {
    private static final String ELECTION_NAMESPACE = "/scheduler-election";

    public void volunteerForLeadership() throws Exception {
        String znodePrefix = ELECTION_NAMESPACE + "/c_";
        currentZnodeName = zooKeeper.create(
            znodePrefix, new byte[]{},
            ZooDefs.Ids.OPEN_ACL_UNSAFE,
            CreateMode.EPHEMERAL_SEQUENTIAL
        );
    }

    public void reelectLeader() throws Exception {
        // Watch the node just below ours; if it disappears, re-check leadership
    }
}`}
          visual={<LeaderElection />}
        />

        <Section
          icon={Cpu}
          tag="gRPC + Thread Pool Execution"
          title="Low-latency dispatch, concurrent execution"
          description="Once a worker is chosen, the scheduler calls it over HTTP/gRPC. WorkerGrpcServer.java receives the request and hands the payload to WorkerThreadPool.java, a bounded ExecutorService that runs jobs concurrently without blocking the RPC thread."
          code={`@Service
public class WorkerThreadPool {
    private final ExecutorService pool =
        Executors.newFixedThreadPool(16);

    public Future<String> submit(String jobId, String jobName) {
        return pool.submit(() -> {
            // execute the unit of work
            return "COMPLETED";
        });
    }
}`}
          visual={<ThreadPoolGrid />}
        />

        <Section
          icon={Database}
          tag="Persistence Layer"
          title="Durable job lifecycle tracking"
          description="Job.java is a JPA entity persisted through Spring Data's JobRepository, tracking status transitions (PENDING → RUNNING → COMPLETED/FAILED), the assigned worker, and timestamps — backed by PostgreSQL in production."
          reverse
          code={`@Entity
@Table(name = "jobs")
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private String assignedWorker;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findByStatus(JobStatus status);
    List<Job> findByAssignedWorker(String workerId);
}`}
          visual={
            <div className="flex flex-col items-center gap-4 text-center">
              <Layers className="h-16 w-16 text-emerald-300" />
              <p className="max-w-xs text-xs text-white/40">
                Enum-backed status column keeps the job state machine explicit and query-friendly —
                <code className="mx-1 rounded bg-white/10 px-1 py-0.5 font-mono">findByStatus()</code>
                is ready to power future analytics endpoints.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
