# Chapter 10 — Layered Architecture Style

## Why This Chapter Exists
Layered architecture remains the default structure for many systems—especially when teams start building without explicitly choosing an architecture style. In frontend work, similar patterns appear as “UI → services → data” flows, often without clear boundaries or governance.

This chapter provides a structured view of the **layered architecture style**, its strengths, liabilities, and how it behaves as systems scale—so it can be recognized deliberately rather than adopted accidentally.

---

## What Layered Architecture Is

Layered architecture is a technically partitioned architecture style. It organizes a system into horizontal layers based on technical responsibility rather than domain capability.

It became the de facto standard for many legacy applications due to:
- simplicity
- familiarity
- low initial cost

A common observation: when teams “just start coding” without choosing a style, they often produce a layered architecture.

---

## Typical Layers

Many layered systems use four conventional layers:

- **Presentation**  
  User interaction and input/output transformation.

- **Business**  
  Domain logic and business rules.

- **Persistence**  
  Data access logic and storage interaction.

- **Database**  
  Physical data store.

Each layer forms an abstraction around a specific responsibility. Requests flow through layers to satisfy business needs.

**Image placeholder:**
- `layered-architecture-4-layers.png` — presentation → business → persistence → database

---

## Partitioning: Technical, Not Domain

Because partitioning is technical, a business capability is typically spread across layers:
- UI pieces in presentation
- rules in business
- queries in persistence
- data in the database

This diffusion makes the style less compatible with domain-oriented decomposition such as DDD bounded contexts.

**Image placeholder:**
- `domain-spread-across-layers.png` — one business feature threaded through all layers

---

## Open vs Closed Layers

Layers can be **closed** or **open**:

- **Closed layer**: a request must pass through the next layer below it  
  (Presentation → Business → Persistence → Database)

- **Open layer**: a layer may bypass the layer below it and call deeper layers directly

Closed layers support the “layers of isolation” concept: changes in one layer should not affect others as long as contracts remain stable.

Open layers are sometimes introduced for efficiency or convenience, but ungoverned openness tends to create tight coupling.

A recurring risk: failing to document which layers are open or closed—and why—commonly leads to brittle architectures that are difficult to test, maintain, and deploy.

**Image placeholder:**
- `open-vs-closed-layers.png` — strict flow vs bypass paths

---

## Layers of Isolation: The Intended Benefit

Layered architecture aims to isolate change:
- Each layer encapsulates technical responsibility
- Layers can be replaced with minimal impact if interfaces remain stable

For example, it is possible to replace a UI framework within the presentation layer without redesigning business logic—assuming isolation is preserved.

This benefit is structural, but fragile: it only holds if the system enforces boundaries and avoids bypass coupling.

---

## The Architecture Sinkhole Anti-Pattern

A sinkhole occurs when requests pass through layers with little or no logic in most of them.

Symptoms:
- “pass-through” layering
- unnecessary object instantiation
- wasted processing
- degraded performance
- increased maintenance overhead without corresponding structure benefits

A common heuristic is to measure how many requests are pass-through:
- If a majority of requests are sinkholes, layering may be adding ceremony rather than structure.
- Some guidance frames this as a threshold problem (often discussed as an 80/20 concern).

Two typical reactions appear:
- selectively open some layers to reduce overhead (trade-off: coupling increases)
- reconsider the architecture style entirely

**Image placeholder:**
- `architecture-sinkhole.png` — request passing layers with no meaningful work

---

## Distribution, Cloud, and Operational Limits

Layered architectures are traditionally monolithic. Cloud adoption often means deploying the monolith as a unit (or in limited split forms).

A common constraint: workflows traverse most layers, so splitting layers across network boundaries introduces latency and complexity.

Because it is commonly monolithic with limited modularity:
- fault tolerance is weak by default
- availability is impacted by higher MTTR typical of large monoliths

These are not universal truths—only common outcomes when layered systems grow large.

**Image placeholder:**
- `monolith-deployment-latency.png` — layer traversal vs distributed latency points

---

## Governance and Fitness Functions

A practical advantage of layered architecture is tooling maturity: because it is common, many structural testing tools assume layering.

Fitness functions support this style well:
- enforce allowed dependency directions
- detect boundary violations
- prevent accidental bypassing

This creates an opportunity for automated governance that is simpler than in many distributed styles.

**Image placeholder:**
- `layered-fitness-functions.png` — boundary rules → checks → violations

---

## Team Topologies and the Layered Style

Layered architecture is generally less sensitive to team topology than some distributed styles, because it often represents a single flow through a single system.

Typical mappings:
- **Stream-aligned teams**: can own end-to-end flow through layers for a product journey
- **Enabling teams**: can contribute expertise to one layer without reshaping the entire system
- **Complicated subsystem teams**: can own specialized layers or shared technical concerns
- **Platform teams**: can leverage governance and tooling, though monolith scaling becomes the long-term pressure point

A recurring challenge for platform teams is the monolith growth curve:
- even well-partitioned monoliths strain constraints over time (DB connections, memory, throughput, concurrency)
- keeping the system operational requires increasingly complex work

---

## Characteristic Profile (Qualitative)

Layered architecture tends to score well early on for:
- **cost**
- **simplicity**
- **feasibility**

But those strengths diminish as the system grows.

Common tendencies:
- deployments become high-risk and infrequent
- scalability and elasticity remain low (often a “quantum of one” system)
- responsiveness can be high with careful design (caching, concurrency), but closed layering and sinkholes reduce inherent parallelism

**Image placeholder:**
- `layered-characteristics-radar.png` — qualitative ratings across characteristics

---

## When It Fits (and When It Strains)

Layered architecture often fits:
- small, simple applications or websites
- tight budget and time constraints
- early-stage projects where teams need a quick, understandable starting point

It tends to strain for:
- large systems with high modularity needs
- organizations needing frequent, low-risk deployments
- systems where domain partitioning and independent evolution matter

A pragmatic usage pattern appears sometimes:
- start layered to deliver quickly
- keep reuse minimal and object hierarchies shallow
- migrate toward more modular styles once domain boundaries are clearer

This approach trades architectural ambition for delivery feasibility—sometimes intentionally.

---

## Frontend Lens (React / Next.js)

Frontend projects often recreate layering implicitly:
- presentation (components/pages)
- business (domain logic, orchestration)
- persistence (API clients, cache, state stores)
- data (backend or client storage)

A layered frontend can remain maintainable if:
- dependency direction is explicit
- boundaries are enforced (imports and contracts)
- sinkholes are monitored (no “fake layers” with pass-through logic)

**Image placeholder:**
- `frontend-layering-example.png` — React UI → domain → data clients → backend

---

## Related Pattern: Business Delegate

A business delegate pattern reduces coupling between UI and business services by introducing an adapter layer. Presentation calls the delegate; the delegate invokes business objects/services.

This pattern often appears where teams want:
- replaceable service access
- isolation of integration details
- stable interfaces to business workflows

**Image placeholder:**
- `business-delegate.png` — UI → delegate → business services

---

## Closing Perspective
Layered architecture is attractive because it is simple and familiar. Its liabilities emerge primarily with scale: domain diffusion across layers, sinkholes, and increasing deployment and change cost.

Recognizing the layered style early—along with its trade-offs—often determines whether it remains a stable foundation or becomes a long-term constraint.
