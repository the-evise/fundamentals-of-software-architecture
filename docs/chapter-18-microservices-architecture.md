# Chapter 18 — Microservices Architecture

## Why This Chapter Exists
Microservices gained momentum because modern businesses change quickly and software delivery has struggled to keep pace. Many organizations want faster independent delivery, reduced coordination overhead, and architectural structures that match domain boundaries rather than technical layers.

Microservices is one of the most aggressive architectural responses to that goal: it prioritizes **decoupling** above almost everything else, accepting duplication and distributed-system complexity as the price.

---

## What Microservices Is (In This Book’s Sense)

Microservices is a distributed architecture style heavily influenced by Domain-Driven Design (DDD), especially the concept of **bounded contexts**.

A common shorthand:
- microservices is sometimes described as a **“share nothing”** architecture

Inside a bounded context, coupling is allowed to get work done:
- code, schema, and internal implementation can be tightly integrated

Across bounded contexts, coupling is actively avoided:
- no shared database
- no shared schema as an integration point
- no shared classes/types as “convenient reuse”

This results in a deliberate preference:
- **duplication over reuse** when reuse would create coupling

The rationale: reuse typically requires coupling (inheritance, shared libraries, shared contracts). If the primary goal is decoupling, duplication becomes an acceptable trade.

**Image placeholder:**
- `microservices-topology.png` — many small services each with its own data store, communicating over the network

---

## Service Size: “Micro” as a Label, Not a Literal Target

Microservices are smaller than services in other distributed styles, and include everything needed to operate independently (including a datastore and dependent components).

But “micro” is a label, not a measurement target.

> “The term microservice is a label, not a description.” — Martin Fowler

If teams take “micro” literally and over-shrink boundaries, they risk producing the distributed equivalent of big ball of mud:
- too many tiny services
- too many network calls
- unclear boundaries
- high coordination cost
- fragile workflows

Your notes call this the **Grains of Sand** failure mode (services too fine-grained).

**Image placeholder:**
- `grains-of-sand-antipattern.png` — too many tiny services creating a dense call graph

---

## Boundary Guidelines (Used as Trade-off Lenses)

Microservices boundaries are usually refined through iteration. Several guidelines help evaluate whether a boundary makes sense:

### 1) Purpose (Functional Cohesion)
A microservice ideally contributes one significant, cohesive behavior to the overall system.

If a service is a bucket of unrelated operations, it’s not cohesive.  
If it’s too small to represent meaningful behavior, it’s likely over-granular.

### 2) Transaction Boundaries
Transactions across services are hard in distributed systems. Architectures designed to avoid cross-service transactions tend to be more stable.

A recurring principle in microservices literature:
- if distributed transactions dominate, the boundaries are likely wrong (or microservices is the wrong style for the system)

### 3) Choreography vs Coordination Overhead
If a workflow forces excessive synchronous coordination among many services, bundling some services into a larger boundary can reduce communication overhead.

This is not “anti-microservices”; it is boundary refinement based on observed coupling.

Iteration is the mechanism that makes this work: architects refine boundaries as they learn more about domain behavior.

**Image placeholder:**
- `microservice-boundary-lenses.png` — purpose / transactions / coordination as evaluation lenses

---

## Data Isolation: The Defining Requirement (and Its Costs)

Microservices is the only style in this set that **requires breaking apart data** to preserve bounded contexts.

If every service shares the same database and schema, bounded contexts collapse and the primary decoupling goal disappears.

Data isolation creates headaches, but also creates opportunity:
- each team can choose the database technology that fits its needs
- teams can evolve independently
- changes become localized

The trade:
- consistency becomes harder
- integration becomes harder
- replication/caching strategies become more important

**Image placeholder:**
- `bounded-context-data-isolation.png` — separate datastores per bounded context, no shared DB

---

## Orchestration vs “Business Logic Outside the Boundary”

A common microservices discipline is:
- keep interesting business logic inside the bounded context

Pushing orchestration or business logic into a centralized mediator (or a generic API layer) violates the bounded context philosophy:
- it creates a “shadow domain” outside services
- it centralizes behavior that should belong to domain boundaries

This is one reason API layers should be watched carefully:
- they can become business logic hubs if teams are not deliberate

**Image placeholder:**
- `api-layer-business-logic-smell.png` — API layer accumulating domain rules outside services

---

## Service Discovery, Sidecars, and Service Mesh

Service discovery enables automatic detection and location of services on the network.

In many microservices ecosystems, discovery is treated as part of the “mesh” layer:
- every service participates via sidecars or mesh infrastructure
- concerns like routing, retries, mTLS, and observability are standardized

(Your notes mention sidecar pattern and service mesh as common supporting mechanisms.)

**Image placeholder:**
- `service-mesh-sidecar.png` — services with sidecars + mesh control plane

---

## Communication Styles: Sync, Async, and Interoperability

### Synchronous communication
Sender waits for response from receiver. This introduces runtime dependency and can entangle quanta.

### Asynchronous communication
Events/messages decouple processing and support parallelism (similar to Chapter 15 EDA).

Microservices often use **heterogeneous interoperability**:
- services may use different platforms and protocols (polyglot)
- services must know/discover how to communicate (protocol-aware)

One extreme governance anecdote illustrates the anti-coupling goal:
- force different stacks per team to prevent accidental class sharing
  This is the opposite of enterprise standardization policies, and highlights the trade-off: autonomy vs uniformity.

**Image placeholder:**
- `sync-vs-async-microservices.png` — sync call chains vs async event flows across services

---

## UI Styles: Single UI vs Micro-frontends

Two UI patterns commonly appear:

### 1) Single UI + API Layer
A single web/mobile/desktop UI calls through an API layer to satisfy requests.

### 2) Micro-frontends
UI is decomposed into independently owned components, mirroring backend service boundaries.
This creates a symmetry of granularity and isolation:
- UI components align with corresponding backend services

**Image placeholders:**
- `microservices-ui-single-ui.png` — one UI → API layer → services
- `micro-frontends-topology.png` — multiple UI slices aligned to backend services

---

## Choreography vs Localized Mediator

Microservices often prefer choreography:
- no central coordinator
- services publish events and react as needed
- respects bounded context autonomy

However, coordination sometimes becomes necessary. A localized mediator (often called an orchestration service) can coordinate across several services:
- increases coupling
- but concentrates it into a single boundary
- leaving other services less affected

This becomes an explicit representation of coupling rather than hidden coupling scattered everywhere.

**Image placeholder:**
- `choreography-vs-local-mediator.png` — decentralized event flow vs orchestration service boundary

---

## Transactions: “Don’t” as a Structural Signal

Atomicity is trivial in monoliths and difficult in distributed systems.

A common microservices stance:
- avoid distributed transactions when possible
- if transactions across services are common, revisit granularity

When cross-service transactions are needed, the common pattern is **Saga**:
- coordination (often via mediator/orchestrator)
- compensating transactions to roll back logical work
- significant increase in complexity (often more than double)

If sagas become the dominant mechanism, it may indicate microservices is a poor fit for the problem domain’s consistency requirements.

**Image placeholder:**
- `saga-pattern.png` — orchestrator coordinating steps + compensations

---

## Serverless as Deployment Model, Not a Style

Serverless is best viewed as a deployment model frequently used to host microservices-like bounded units rather than a separate architecture style.

---

## Governance: Measuring Dynamic Coupling

Microservices require governing both:
- static coupling (contracts, schemas, shared libs—ideally minimized)
- dynamic coupling (synchronous dependencies, call graphs, latency chains)

Gathering proper metrics often requires:
- consistent tracing/logging
- disciplined service-level indicators
- tracking sync call volume and critical paths
- observing unintended entanglement

**Image placeholder:**
- `microservices-governance-metrics.png` — tracing call graph + dependency health checks

---

## Characteristic Profile (Qualitative)

Microservices often provide:
- high decoupling and independent evolution
- strong deployability when operational maturity exists
- high modularity (many quanta)
- potential for strong scalability/elasticity/fault tolerance

At the cost of:
- distributed-system complexity
- higher operational and governance burden
- harder consistency and transactions
- increased duplication

**Image placeholder:**
- `microservices-characteristics-radar.png` — qualitative ratings across characteristics

---

## Where It Fits (and Where It Doesn’t)

Microservices tends to fit when:
- autonomy and independent delivery dominate priorities
- domain boundaries are strong and stable (DDD-friendly)
- operational maturity exists (observability, automation, incident response)
- eventual consistency is acceptable in many workflows

It tends to strain when:
- cross-service transactions dominate workflows
- boundaries are unclear and rapidly shifting
- the organization cannot support the governance and ops complexity
- the design drifts into “grains of sand” over-granularity

---

## Frontend Context (React / Next.js Lens)

Microservices affects frontend architecture through:
- API volatility and versioning pressure
- eventual consistency that shows up as intermediate UI states
- latency variability across multi-service aggregation
- the appeal of BFF/API gateway response shaping
- micro-frontends when UI ownership needs to mirror backend autonomy

A practical risk is “business logic leakage” into the API layer or UI due to orchestration pressure. The bounded context philosophy resists that by pushing domain logic back into the owning service boundary.

---

## Closing Perspective
Microservices is popular because it offers a path toward high decoupling and independent delivery. It achieves that by accepting the costs of distribution and by treating coupling—especially through shared data and schemas—as the primary enemy.

The style rewards teams that can govern boundaries and manage operational complexity. Without that discipline, it can devolve into distributed mud.
