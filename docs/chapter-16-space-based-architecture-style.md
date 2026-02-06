# Chapter 16 — Space-Based Architecture Style

## Why This Chapter Exists
When scalability requirements are extreme and demand is highly variable, systems often fail by concentrating contention in the database. Teams then attempt to “scale the DB” or retrofit caching onto an architecture that still routes every request through persistence.

Space-based architecture approaches the problem differently: it treats the database as a persistence concern rather than the center of runtime coordination, using **in-memory data grids** and **parallel processing units** to absorb load and variability.

---

## What Space-Based Architecture Is

Space-based architecture is a style designed for extreme, variable scalability. It uses:
- multiple parallel processing units
- a shared memory model (in-memory cache/data grid)
- asynchronous persistence to a database

A request enters a virtualized middleware layer. A messaging/grid component determines which processing units are available and forwards the request.

A common implementation of the virtualized middleware layer is a web server/load balancer such as:
- Nginx
- HAProxy

<ImagePlaceholder title="virtualized middleware → processing units → async data pumps → DB" chapter="16"></ImagePlaceholder>

---

## Core Components (Conceptual)

While implementations vary, the style is often explained using these conceptual parts:

- **Virtualized middleware**  
  Entry point and routing, often a load balancer.

- **Processing units**  
  Independent units that execute workflows and contain in-memory data.

- **Data grid**  
  The in-memory data store. In modern implementations it is frequently embedded within processing units.

- **Messaging grid**  
  Routing and messaging layer that supports delivery guarantees, persistence, ordering.

- **Data pumps**  
  Asynchronous mechanisms to move data between processing and persistence layers.

- **Processing grid (optional)**  
  Used when orchestration is required between different types of processing units.

- **Deployment manager**  
  Scales processing units up/down based on load.

<ImagePlaceholder title="labeled diagram: middleware, processing units, data grid, pumps, DB" chapter="16"></ImagePlaceholder>

---

## Why It Scales: No Direct DB Bottleneck on the Hot Path

Space-based architecture scales by removing direct database access from the primary request path:
- requests are handled using in-memory data
- database writes occur asynchronously

This is the key structural trade:
- runtime throughput and responsiveness increase
- persistence becomes eventual, not immediate

This is why the style is often described as “architectural caching” rather than “adding a cache.”

---

## Caching Models: Replicated vs Distributed

Space-based architecture typically relies on caching as a first-class structural feature. Two caching approaches show up commonly:

### Replicated Cache
- each processing unit has a copy of the cached dataset

Optimized for:
- performance (local reads)
- resilience (higher fault tolerance)

Costs:
- replication lag risk
- higher memory usage
- collision risk under high write rates

### Distributed Cache
- data is partitioned across units (sharded)

Optimized for:
- consistency (fewer replication collisions)
- large datasets

Costs:
- increased cross-unit lookup
- lower fault tolerance if not engineered carefully

**Table placeholder:**
- `replicated-vs-distributed-cache.png` — performance vs consistency, cache size, data type, update frequency, fault tolerance

Suggested decision signals commonly discussed:
- distributed cache when data is large (e.g., >100MB), write rates are high, collisions are unacceptable
- replicated cache when data is smaller, relatively static, and fault tolerance is prioritized

---

## Data Pumps and Eventual Consistency

A data pump sends data to another processor or persistence layer. In space-based architecture, data pumps are typically:
- asynchronous
- eventually consistent

This decouples request throughput from persistence speed, but introduces the operational reality that persistence lags behind runtime state.

<ImagePlaceholder title="in-memory state → persistent queue → DB writer" chapter="16"></ImagePlaceholder>

---

## Messaging: More Than “Async”

Messaging grids are often used not only for asynchronous communication but also for:
- guaranteed delivery
- message persistence
- ordering (including FIFO where required)

These properties help maintain correctness when the system prioritizes throughput and parallelism.

---

## Database Topology Flexibility

Space-based architecture is flexible in database topology. It can support:
- local DB writes via asynchronous writers
- on-prem DB with cloud compute
- multi-tier persistence (read replicas, write stores)

A common hybrid is:
- deploy processing units, middleware, and data pumps in cloud
- keep writer/reader services and DB on-premise (or vice versa)

<ImagePlaceholder title="cloud compute + on-prem DB hybrid deployment paths" chapter="16"></ImagePlaceholder>

---

## Orchestration in Modern Implementations

Older descriptions often assume a single orchestration engine. Many modern implementations—especially those using fine-grained services—implement orchestration as separate orchestration processing units:
- each orchestration unit handles a single major workflow
- orchestration is parallelized rather than centralized

<ImagePlaceholder title="multiple workflow orchestration units rather than one orchestrator" chapter="16"></ImagePlaceholder>

---

## Data Collisions and Replication Lag

Replicated caching introduces collision risk when:
- multiple instances modify overlapping data
- replication latency is non-trivial

This is a common structural risk. Some formulations model collision rate as a function of:
- number of instances
- update rate
- cache size
- replication latency

This reinforces the replicated vs distributed cache trade-off:
- replicated is fast, but must manage replication lag risk
- distributed avoids many replication collisions but changes access patterns

<ImagePlaceholder title="timeline showing conflicting updates + lag" chapter="16"></ImagePlaceholder>

---

## Governance: Observability as a Design Requirement

Space-based architecture is complicated to design and implement, and it becomes operationally opaque without governance and observability.

A common governance focus is ensuring each processing unit instance periodically reports:
- memory usage
- cache state health
- queue lag
- replication status (if replicated)

Continuous automated fitness functions can enforce these expectations.

<ImagePlaceholder title="processing units emitting telemetry periodically" chapter="16"></ImagePlaceholder>

---

## Characteristic Profile (Qualitative)

Space-based architecture is often positioned as:
- high responsiveness
- high scalability and elasticity
- high performance under spiky load

Its costs include:
- complexity in design and implementation
- eventual consistency constraints
- operational sophistication requirements (telemetry, queueing, cache correctness)

<StyleRatings style-key="Space-based" />

---

## Typical Technologies (Examples)

Common technology examples in space-based discussions include:
- Hazelcast
- Apache Ignite
- Oracle Coherence

These are not requirements, but reference points for data grid capabilities.

---

## Where It Fits

Space-based architecture is commonly associated with:
- highly spiky workloads
- very high concurrency (often cited as >10k concurrent users)
- systems where DB scaling is the limiting factor
- use cases where eventual consistency is acceptable

It is less appropriate where:
- strict immediate consistency is required end-to-end
- the organization cannot sustain the operational complexity
- caching correctness cannot be governed reliably

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="Frontend teams most often encounter space-based systems indirectly:"
  bullets="[{&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;fast response times and immediate “accepted” UX&quot;}, {&quot;icon&quot;: &quot;Broadcast&quot;, &quot;text&quot;: &quot;eventual consistency (UI may show intermediate states)&quot;}, {&quot;icon&quot;: &quot;Database&quot;, &quot;text&quot;: &quot;data freshness and reconciliation patterns become important&quot;}, {&quot;icon&quot;: &quot;Database&quot;, &quot;text&quot;: &quot;“why does the UI show stale data?” becomes a systems question, not a UI bug&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;This style can produce excellent user-perceived responsiveness, but it requires product-level clarity about consistency semantics.&quot;}]"
></FrontendSection>

## Closing Perspective
Space-based architecture is a complex but powerful answer to a specific class of problems: extreme, variable scale where database contention would otherwise dominate.

It achieves its strength by changing the shape of the system:
- in-memory data as runtime truth
- asynchronous persistence as durability
- parallel processing as throughput

The trade is predictable: performance and scalability in exchange for design, governance, and consistency complexity.
