# Chapter 14 — Service-Based Architecture Style

## Why This Chapter Exists
Many teams want the modularity and deploy independence of distributed systems, but not the operational overhead and coordination complexity of fine-grained services. Service-based architecture is frequently positioned as a pragmatic middle ground: domain-partitioned services with coarse granularity, typically avoiding service-to-service chatter and heavy orchestration.

This chapter describes the style’s topology, why it is considered pragmatic, and where its major risks concentrate—especially around shared data and boundary governance.

---

## What Service-Based Architecture Is

Service-based architecture is a distributed architecture style commonly used for business-oriented applications. It is often described as:

- a **distributed macro-layered structure**
- with a separately deployed **user interface**
- a set of separately deployed **coarse-grained domain services**
- optionally a **shared monolithic database**

Services typically represent a domain or subdomain, and are often called **domain services**.

**Image placeholder:**
- `service-based-topology.png` — UI → domain services (coarse) → shared DB (optional)

---

## Domain Services: Coarse-Grained by Design

Domain services in this style are intentionally coarse-grained:
- each service owns a meaningful slice of business capability
- services are usually designed to be largely independent

A common guiding idea in this style:
- **services should not talk to each other** (or do so rarely)
- orchestration happens at the UI, an API layer, or an API gateway

Excessive service-to-service communication is often interpreted as either:
- poor domain partitioning, or
- a mismatch between the problem and this architecture style

Another recurring risk is creating **too many** domain services. When a shared monolithic database is used, a common recommendation is to keep service count modest (often cited as “no more than ~12”) to reduce change control, scalability, and fault tolerance complexity.

**Image placeholder:**
- `domain-services-independence.png` — services isolated; orchestration at UI/gateway

---

## Internal Design of a Domain Service

Because domain services are coarse, each service frequently contains its own internal structure. Two common internal design variants appear:

1) **Layered service internals**
    - API facade layer
    - business layer
    - persistence layer

2) **Subdomain partitioning within the service**  
   Similar to modular monolith thinking, but scoped inside one service.

Regardless of internal design, each domain service must expose an access surface—an API facade—to execute business functionality and orchestrate requests from UI.

**Image placeholder:**
- `domain-service-internal-variants.png` — layered service vs subdomain-partitioned service

---

## UI Variants and API Layers

Service-based architecture supports multiple UI interaction shapes. Common variants include:
- UI calling domain services directly
- UI calling an API layer (or gateway) which routes/orchestrates calls to services
- multiple UIs sharing the same set of domain services (web + mobile + internal UI)

This flexibility contributes to the style’s popularity.

**Image placeholders:**
- `service-based-ui-variants.png` — multiple UI patterns
- `api-layer-between-ui-and-services.png` — UI → API gateway → services

---

## Data Topology: Distributed Services with a Shared Database

This architecture is notable for being a distributed style that can still support a **monolithic database** effectively.

A shared DB allows:
- familiar SQL querying and joins
- simpler reporting patterns
- reduced duplication of data

However, it concentrates risk:
- schema changes can impact many services
- DB becomes a coupling point even when services do not communicate directly

The database often becomes the primary place where “hidden coupling” exists.

**Image placeholder:**
- `service-based-db-topologies.png` — shared DB vs logically partitioned DB vs partial separation

---

## Database Change Risk and Mitigations

When services share database tables or entity objects, a schema change can ripple broadly.

A common acceleration of that ripple is shared libraries:
- a single shared library containing DB entities used by many services
- changes to that library propagate impact everywhere

**Image placeholder:**
- `single-shared-entity-library-impact.png` — one entity lib affects all services

One mitigation is **logical partitioning** of the database and reflecting that partitioning in shared libraries:
- multiple domain-specific entity libraries
- clearer visibility into what services are impacted by changes

**Image placeholder:**
- `multiple-domain-entity-libraries.png` — entity libs aligned to data domains

Another organizational mitigation sometimes appears:
- locking common entity objects in version control
- restricting schema/entity changes to a database-focused team

This increases change control and reduces accidental ripples, but introduces coordination cost.

The deeper structural takeaway: the more the database is partitioned into well-defined data domains, the more the architecture retains modularity despite shared storage.

---

## Governance Focus Areas

Governance in service-based architecture tends to focus on protecting the style’s central promise: domain modularity without distributed orchestration.

Common governance targets:
- prevent changes that span multiple domain services (or make them explicit)
- limit service-to-service communication
- keep orchestration at UI/gateway/API layer
- control database coupling and schema evolution
- detect “too many services” early (granularity creep)

**Image placeholder:**
- `service-based-governance.png` — checks for cross-service change, DB coupling, comms limits

---

## Team Topologies Fit

Because services are partitioned by domain, this style works best when teams are aligned by domain area:
- cross-functional teams owning a domain service end-to-end

Technically partitioned teams (UI team, backend team, DB team) tend to map poorly, because they reintroduce cross-domain coordination inside each change.

Observations by topology:
- **Stream-aligned teams**: strong fit (domain ownership aligns with services)
- **Enabling teams**: less naturally effective than in some distributed styles due to coarse services, but can still contribute by improving internal modularity and platform practices
- **Complicated subsystem teams**: can focus on complex domain/subdomain processing within specific services
- **Platform teams**: can leverage modularity for tooling, pipelines, shared runtime standards, and gateways

**Image placeholder:**
- `service-based-team-alignment.png` — teams mapped to domain services

---

## Architecture Quantum and Scope

Service-based architecture often yields multiple quanta:
- each service is typically independently deployable
- each service tends to have high functional cohesion
- shared database can constrain quantum independence depending on coupling

Even with separate deployments, shared data topology can pull quanta toward tighter coupling at the persistence boundary.

**Image placeholder:**
- `service-based-quanta.png` — separate quanta with a shared DB coupling point

---

## Characteristic Profile (Qualitative)

Common benefits:
- good modularity (domain partitioning)
- improved agility vs monoliths (smaller scope of change)
- improved testability (domain-scoped services)
- improved deployability (more frequent, lower-risk deployments than monolith)

Common constraints:
- scalability, elasticity, fault tolerance improve as operational investment increases
- shared DB is a central coupling and availability risk
- service count creep increases change control and coordination overhead

This style is often described as one of the most cost-effective distributed architectures to implement: it provides meaningful modularity without requiring distributed orchestration/choreography as a default capability.

A recurring framing:
> “Not every portion of an application needs to be microservices.” — Mark Richards

---

## Where It Fits (and Where It Doesn’t)

Service-based architecture tends to fit when:
- domains can be partitioned into a small set of coarse services
- teams want modularity without microservice-level granularity complexity
- the organization is aligned for domain ownership (DDD-friendly)

It tends to strain when:
- the system requires extreme operational characteristics (elasticity, high fault tolerance, high availability) across all domains
- the database is highly shared without partitioning discipline
- services become chatty (implicit orchestration emerges)

---

## Frontend Context (React / Next.js Lens)

From a frontend perspective, service-based architecture commonly manifests as:
- UI interacting with a small set of coarse domain APIs
- an API gateway/BFF providing orchestration and response shaping
- explicit domain boundaries in contracts that map well to frontend feature modules

It is typically easier for frontend teams than microservices-heavy environments because the number of services and cross-service coordination surface are intentionally constrained.

---

## Closing Perspective
Service-based architecture trades fine-grained independence for pragmatism:
- coarse services reduce coordination complexity
- avoiding service-to-service orchestration keeps distributed complexity lower
- shared databases simplify data access but concentrate coupling and risk

When domains are well-defined and the database coupling is governed, it provides a strong balance of modularity and operational feasibility.
