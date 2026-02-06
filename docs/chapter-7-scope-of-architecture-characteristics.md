# Chapter 7 — Scope of Architectural Characteristics

## Why This Chapter Exists
Architectural characteristics are often discussed as if they apply uniformly to an entire system. Modern architectures rarely work that way. Different parts of a system can operate under different constraints and success criteria, and those differences shape both architecture style and governance.

This chapter addresses the practical question:

<QuoteBlock>
Where do architectural characteristics *actually* apply, and how does that scope affect architectural choices?
</QuoteBlock>

---

## Characteristics Vary by Scope

Many modern styles (for example, microservices) contain architectural characteristics that differ at:
- the **service level**
- the **system level**

Scope becomes an analytical tool: it helps architects determine whether a candidate architecture style can realistically support the qualities the system needs.

A common failure mode is optimizing one layer while another layer prevents success:
- a highly elastic service backed by a database that cannot scale
- a low-latency UI calling a high-latency dependency synchronously
- a “resilient” system with a single point of failure in shared infrastructure

If one critical element cannot support the intended characteristic, the characteristic does not meaningfully exist—regardless of how well other parts are designed.

<ImagePlaceholder title="system vs service vs dependency scope (where qualities actually bind)" chapter="7"></ImagePlaceholder>

---

## Architecture Quantum as a Scope Measure

A useful way to measure scope is the **architecture quantum**.

The term *quantum* is borrowed from general usage as “the smallest unbreakable thing.” In this context:

<QuoteBlock>
An architecture quantum is the smallest part of the system that runs independently.
</QuoteBlock>

If there is more than one quantum, there are **quanta**.

The key idea: architectural characteristics are best defined **at the quantum level**, not always at the entire system level.

---

## Defining an Architecture Quantum

An architecture quantum establishes the scope for a set of architectural characteristics. It typically features:

- **Independent deployment** from other parts of the architecture
- **High functional cohesion**
- **Low external implementation (static) coupling**
- **Synchronous communication** within its boundaries (and often to other quanta)

This definition gives architects a concrete unit of analysis:
- what is cohesive enough to run independently?
- what is tightly bound and therefore shares characteristics?

<ImagePlaceholder title="quantum boundaries + characteristics boundary overlay" chapter="7"></ImagePlaceholder>

---

## Databases and the Quantum Boundary

A database is part of a quantum if the system cannot function without it.

This yields a structural consequence:

- Many legacy systems deployed with a **single shared database** tend to form **one quantum** (a quantum of one), because the database binds everything into a single operational unit.
- In microservices, each service commonly includes its own database, forming **multiple quanta**, each with its own scope for architectural characteristics.

This is not about technology preference; it is about what the architecture can change independently.

<ImagePlaceholder title="shared DB (1 quantum) vs per-service DB (many quanta)" chapter="7"></ImagePlaceholder>

---

## Cohesion and Purpose

Cohesion in component design describes how unified the contained code is in purpose. In the quantum context:

- High functional cohesion implies the quantum does something purposeful and complete.
- A quantum that mixes unrelated responsibilities tends to accumulate coupling and become harder to evolve.

In frontend systems, this often maps to:
- a feature slice that can be built, tested, and released with minimal cross-team coordination
- a boundary where state ownership is clear and stable

---

## DDD Bounded Contexts and Architectural Scope

Domain-Driven Design (DDD) offers a modeling approach for decomposing complex domains.

A key DDD concept is the **bounded context**:
- Everything related to a portion of the domain is visible internally
- It is opaque to other bounded contexts
- Each context can model concepts differently (e.g., different “Customer” definitions)
- Differences are reconciled at communication boundaries

This aligns with the quantum concept:
- strong cohesion inside boundaries
- controlled coupling across boundaries

<ImagePlaceholder title="bounded contexts mapped to frontend feature domains" chapter="7"></ImagePlaceholder>

---

## Semantic Coupling vs Implementation Coupling

Architecture is shaped by more than code-level dependencies.

### Semantic Coupling
Semantic coupling is the natural coupling imposed by the domain itself.

The domain problem defines the core forces:
- some things must relate
- some workflows inherently connect
- some data concepts cannot be made independent without changing the product meaning

No architecture pattern eliminates semantic coupling. If the problem changes, the architecture must respond.

### Implementation Coupling
Implementation coupling reflects how the team chooses to realize dependencies.

Examples:
- single database vs split databases
- monolith vs distributed services
- shared shared module vs per-domain packages

These decisions may not change semantic coupling, but they strongly shape:
- modularity
- deployability
- fault isolation
- scalability

<ImagePlaceholder title="problem coupling vs chosen wiring" chapter="7"></ImagePlaceholder>

---

## Static and Dynamic Coupling Between Quanta

Two things are coupled if changing one might break the other.

### Static Coupling
Static coupling describes “wiring” at design-time:
- dependencies between modules/services/packages
- shared libraries
- shared schemas
- build-time coupling

Static coupling defines dependency scope.

### Dynamic Coupling
Dynamic coupling describes runtime forces:
- synchronous calls
- timing dependencies
- failure propagation
- latency amplification

Communication is a primary driver of dynamic coupling in distributed architectures.

<ImagePlaceholder title="build-time dependency vs runtime call chain" chapter="7"></ImagePlaceholder>

---

## Communication and the Cost of Sync

Synchronous communication is unforgiving in distributed architectures—particularly when quanta differ in architectural characteristics.

For example:
- A UI or BFF that requires low latency may call a service optimized for throughput over latency.
- A highly available frontend path may depend on a less-available internal service synchronously.
- A system that claims resilience may still fail if critical sync dependencies are brittle.

This mismatch becomes visible when analyzing at the quantum level rather than only at the system level.

<ImagePlaceholder title="latency/failure ripple across synchronous dependencies" chapter="7"></ImagePlaceholder>

---

## What Scope Changes in Practice

In modern systems, architects increasingly define characteristics at the **quantum level**, because it reveals:
- where qualities can be enforced
- where they are constrained
- where they are simply not achievable without structural change

This is also a useful lens for selecting architecture style:
- styles differ in how many quanta they naturally create
- and in how coupling behaves between them

The details of software architecture evolve rapidly. The responsibility to analyze trade-offs remains stable.

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="Frontend systems often contain more than “a UI”:"
  bullets="[{&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;the web app itself&quot;}, {&quot;icon&quot;: &quot;Timer&quot;, &quot;text&quot;: &quot;a BFF layer (sometimes)&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;shared component libraries&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;shared design systems&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;shared data contracts&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Even within a single repo, you can still have multiple quanta if parts are independently deployable and cohesive.&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Scope questions become concrete quickly:&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;can this feature be released independently?&quot;}, {&quot;icon&quot;: &quot;Timer&quot;, &quot;text&quot;: &quot;does it share critical runtime dependencies?&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;does it depend synchronously on other boundaries with different constraints?&quot;}]"></FrontendSection>

## Closing Perspective
Scope is not an abstraction for architecture diagrams; it is the practical boundary of where architectural characteristics can be real.

If characteristics cannot be supported at the quantum boundary—especially by databases and critical synchronous dependencies—then they exist only as intention, not as architecture.
