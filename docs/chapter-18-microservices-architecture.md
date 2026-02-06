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

<ImagePlaceholder title="many small services each with its own data store, communicating over the network" chapter="18"></ImagePlaceholder>

---

## Service Size: “Micro” as a Label, Not a Literal Target

Microservices are smaller than services in other distributed styles, and include everything needed to operate independently (including a datastore and dependent components).

But “micro” is a label, not a measurement target.

<QuoteBlock cite="Martin Fowler">
“The term microservice is a label, not a description.”
</QuoteBlock>

If teams take “micro” literally and over-shrink boundaries, they risk producing the distributed equivalent of big ball of mud:
- too many tiny services
- too many network calls
- unclear boundaries
- high coordination cost
- fragile workflows

Your notes call this the **Grains of Sand** failure mode (services too fine-grained).

<ImagePlaceholder title="too many tiny services creating a dense call graph" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="purpose / transactions / coordination as evaluation lenses" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="separate datastores per bounded context, no shared DB" chapter="18"></ImagePlaceholder>

---

## Orchestration vs “Business Logic Outside the Boundary”

A common microservices discipline is:
- keep interesting business logic inside the bounded context

Pushing orchestration or business logic into a centralized mediator (or a generic API layer) violates the bounded context philosophy:
- it creates a “shadow domain” outside services
- it centralizes behavior that should belong to domain boundaries

This is one reason API layers should be watched carefully:
- they can become business logic hubs if teams are not deliberate

<ImagePlaceholder title="API layer accumulating domain rules outside services" chapter="18"></ImagePlaceholder>

---

## Service Discovery, Sidecars, and Service Mesh

Service discovery enables automatic detection and location of services on the network.

In many microservices ecosystems, discovery is treated as part of the “mesh” layer:
- every service participates via sidecars or mesh infrastructure
- concerns like routing, retries, mTLS, and observability are standardized

(Your notes mention sidecar pattern and service mesh as common supporting mechanisms.)

<ImagePlaceholder title="services with sidecars + mesh control plane" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="sync call chains vs async event flows across services" chapter="18"></ImagePlaceholder>

---

## UI Styles: Single UI vs Micro-frontends

Two UI patterns commonly appear:

### 1) Single UI + API Layer
A single web/mobile/desktop UI calls through an API layer to satisfy requests.

### 2) Micro-frontends
UI is decomposed into independently owned components, mirroring backend service boundaries.
This creates a symmetry of granularity and isolation:
- UI components align with corresponding backend services

<ImagePlaceholder title="one UI → API layer → services" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="decentralized event flow vs orchestration service boundary" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="orchestrator coordinating steps + compensations" chapter="18"></ImagePlaceholder>

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

<ImagePlaceholder title="tracing call graph + dependency health checks" chapter="18"></ImagePlaceholder>

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

<StyleRatings style-key="Microservices" />

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

<FrontendSection
  lead="Microservices affects frontend architecture through:"
  bullets="[{&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;API volatility and versioning pressure&quot;}, {&quot;icon&quot;: &quot;Broadcast&quot;, &quot;text&quot;: &quot;eventual consistency that shows up as intermediate UI states&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;latency variability across multi-service aggregation&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;the appeal of BFF/API gateway response shaping&quot;}, {&quot;icon&quot;: &quot;UsersThree&quot;, &quot;text&quot;: &quot;micro-frontends when UI ownership needs to mirror backend autonomy&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;A practical risk is “business logic leakage” into the API layer or UI due to orchestration pressure. The bounded context philosophy resists that by pushing domain logic back into the owning service boundary.&quot;}]"
></FrontendSection>

## Closing Perspective
Microservices is popular because it offers a path toward high decoupling and independent delivery. It achieves that by accepting the costs of distribution and by treating coupling—especially through shared data and schemas—as the primary enemy.

The style rewards teams that can govern boundaries and manage operational complexity. Without that discipline, it can devolve into distributed mud.
