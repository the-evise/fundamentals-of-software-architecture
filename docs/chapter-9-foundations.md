# Chapter 9 — Foundations

## Why This Chapter Exists
Architecture discussions often start at the pattern level (microservices, layered, event-driven) without establishing the underlying vocabulary: *what an architecture style describes, what patterns are, and what assumptions break when systems become distributed.*

This chapter sets the foundation for later style-specific chapters by defining the key dimensions of architecture styles, introducing the idea of patterns as contextualized solutions, and outlining the recurring constraints that make distributed systems harder than they initially appear.

---

## What an Architecture Style Describes

An architecture style describes several characteristics of an architecture, including:

- **Component topology**  
  How components are organized and how dependencies are structured.

- **Physical architecture**  
  Whether the system is monolithic, distributed, or hybrid.

- **Deployment**  
  Granularity of deployable units and frequency of deployment.

- **Communication style**  
  How components interact (calls, events, message brokers, APIs).

- **Data topology**  
  How data is stored, shared, or partitioned (single DB, per-service DB, replicated data, etc.).

In practice, these dimensions tend to travel together: changing one often forces changes in others.

**Image placeholder:**
- `architecture-style-dimensions.png` — the five style dimensions mapped around a system diagram

---

## Patterns vs Styles

A **pattern** captures a contextualized solution to a recurring problem.  
An **architecture style** describes the topology and default assumptions of an architecture, including both its advantages and its liabilities.

A useful distinction:
- Patterns are often applied as localized solutions.
- Styles tend to shape the system’s overall structure.

**Image placeholder:**
- `pattern-vs-style.png` — localized pattern vs system-level style influence

---

## Big Ball of Mud as a Cautionary Baseline

“Big Ball of Mud” describes systems with little internal structure—where responsibilities are tangled and coupling is unmanaged.

A modern frontend version can look like:
- UI event handlers wired directly to API calls
- API calls wired directly to persistence concerns (or persistence-like logic at the edge)
- no clear separation of responsibilities
- no stable boundaries for testing or change

This architecture can ship quickly early on, then accumulates friction as complexity grows.

**Image placeholder:**
- `big-ball-of-mud-frontend.png` — UI handlers → data calls → mixed responsibilities (tangled arrows)

---

## Simplicity as a Forward Strategy

“Favor simple designs” is not only aesthetic—it functions as future-proofing.

Simplicity reduces:
- hidden dependencies
- coordination overhead
- change amplification

It also tends to survive unknown future constraints better than designs optimized for a single predicted future.

---

## Conway’s Law

When a group of people designs a technical artifact, the structure of the artifact tends to reflect the communication structure of the organization.

In architecture, this implies:
- boundaries tend to mirror team boundaries
- coupling often mirrors cross-team friction
- organizational structure becomes an architectural force

This becomes especially visible in large frontend systems where platform teams, design systems, and product teams all co-evolve with code boundaries.

**Image placeholder:**
- `conways-law-mapping.png` — org chart mapped to component boundaries

---

## Top-Level Partitioning as a Key Distinction

One of the fundamental distinctions between architecture patterns is the type of **top-level partitioning** they support.

Two broad partitioning modes are frequently contrasted:

- **Technical partitioning**  
  Layered by technical concern (UI, domain, data, infrastructure).

- **Domain partitioning**  
  Partitioned by business capability/workflow (modular monolith, microservices).

Even for frontend developers, recognizing these shapes helps when collaborating across teams and services, because each style has different failure modes and trade-off profiles.

**Image placeholder:**
- `technical-vs-domain-partitioning.png` — layered partitions vs domain/workflow partitions

---

## Architecture Styles Covered Later

Later chapters typically analyze common architecture styles such as:
- Layered architecture
- Pipeline architecture
- Microkernel architecture
- Service-based architecture
- Event-driven architecture
- Space-based architecture
- Service-oriented architecture
- Microservice architecture

Even when the implementation focus is frontend, familiarity with these styles improves cross-team trade-off analysis and helps interpret backend constraints that surface through APIs, latency, and availability.

---

## Fallacies of Distributed Computing

A fallacy is a false belief assumed to be true. Distributed systems repeatedly fail when teams design as if the following assumptions hold:

1. **The network is reliable**
2. **Latency is zero**
3. **Bandwidth is infinite**
4. **The network is secure**
5. **Topology never changes**
6. **There is only one administrator**
7. **Transport cost is zero**
8. **The network is homogeneous**

Modern practice often adds additional “operational fallacies” commonly encountered in real systems:
- **Versioning is easy**
- **Observability is optional**

These assumptions tend to hold in monoliths because calls are local and controlled. In distributed systems they become failure multipliers.

**Image placeholder:**
- `distributed-fallacies.png` — fallacies mapped to real-world failure modes (timeouts, retries, version skew)

---

## Frontend Lens on Distributed Fallacies

Frontend systems experience distributed fallacies indirectly through APIs and dependencies.

A practical example: **stamp coupling** (bandwidth assumption)
- A REST endpoint returns more data than the client needs “just in case”
- Over time, payload size grows
- Mobile performance degrades, cache churn increases, and latency becomes visible

Common mitigation patterns include:
- More specific endpoints
- Field selectors in contracts
- GraphQL or query-based selection

This is less about technology preference and more about making coupling explicit and limiting unnecessary transfer.

**Image placeholder:**
- `stamp-coupling.png` — oversized payload vs targeted payload vs field selection

---

## Team Topologies and Architecture

Modern organizations often describe team types that influence architectural shape:

- **Stream-aligned teams**  
  Oriented around delivering value to a business stream.

- **Enabling teams**  
  Bridge capability gaps; often do research, learning, and tooling that is important but not urgent.

- **Complicated subsystem teams**  
  Reduce cognitive load for other teams by owning complex domains.

- **Platform teams**  
  Provide shared infrastructure and self-service capabilities.

These team structures often map to architectural boundaries, creating either clarity (aligned boundaries) or friction (misaligned dependencies).

**Image placeholder:**
- `team-topologies-to-architecture.png` — team types mapped to system boundaries

---

## Closing Perspective
Architects need familiarity with multiple architecture styles to perform meaningful trade-off analysis.

The details of styles change over time. The constraints that govern them—coupling, communication cost, topology, and human coordination—remain constant.
