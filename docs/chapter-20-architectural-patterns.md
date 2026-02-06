# Chapter 20 — Architectural Patterns

## Why This Chapter Exists
Architecture styles describe system shape (topology, deployment, communication, data). Patterns describe **contextualized solutions** to recurring problems inside those shapes. They are more granular than styles, and they often show up even when teams don’t name them explicitly.

This chapter frames patterns as decision tools: recognize the problem, choose the pattern, then choose the implementation. It also resists “best practice” thinking, because patterns only make sense relative to context and trade-offs.

---

## Styles vs Patterns (Recap)

**Architecture styles** are named topologies distinguished by:
- component topology
- physical architecture
- deployment
- communication style
- data topology

**Architecture patterns** are contextualized solutions to problems—similar in spirit to how design patterns capture recurring solution shapes in code, but at architecture scope.

---

## “Best Practice” as a Smell

Calling something a “best practice” often implies:
- the architect has a duty to apply it whenever the situation arises

That framing can encourage “brain off” decisions:
- apply the same solution everywhere
- skip contextual analysis
- stop evaluating trade-offs

Patterns are more useful when treated as:
- “a known solution shape with known trade-offs”
  rather than
- “a universally correct answer”

---

## Pattern First, Implementation Second

Many tools, frameworks, and libraries encapsulate patterns:
- sometimes faithfully
- sometimes partially
- sometimes mixed with other patterns

A practical approach:
1) identify the appropriate **pattern** (problem → solution shape)
2) then select the most appropriate **implementation** (tool/framework/library)

This reduces tool-driven architecture and clarifies the trade-offs being accepted.

---

## Pattern Themes in This Chapter

Your notes cluster patterns into three recurring areas:
- reuse
- communication
- infrastructure

A common through-line is coupling:
- between components
- between data
- between APIs
- between operational concerns

---

# Reuse Patterns

## The Reuse Split: Domain Coupling vs Operational Coupling

Reuse pressure often comes from two different places:

### 1) Domain reuse
Sharing business logic or domain models across boundaries.

In architectures that prioritize decoupling (especially microservices), domain reuse often creates coupling that undermines the primary goal.

A recurring premise:
- some things are worse than duplication, and coupling is one of them (in decoupling-first architectures)

### 2) Operational reuse
Sharing non-domain capabilities needed everywhere:
- circuit breakers
- logging
- metrics
- tracing
- authn/authz enforcement
- retries/timeouts

Allowing each team to manage operational dependencies independently can drift into inconsistency and chaos.

The problem becomes: how to reuse operational capabilities without reintroducing domain coupling.

---

## Hexagonal Architecture (Ports and Adapters)

Hexagonal architecture is one response to reuse and coupling issues:
- treats infrastructure (including DB) as adapters
- keeps domain logic behind ports
- enables swapping adapters without contaminating domain

This pattern is frequently used to:
- reduce coupling to persistence and frameworks
- keep domain logic portable and testable

<ImagePlaceholder title="domain core + ports + adapters (DB as an adapter)" chapter="20"></ImagePlaceholder>

---

## Sidecar and Service Mesh as Reuse Mechanisms

A different class of reuse focuses on cross-cutting operational concerns.

### Orthogonal reuse pattern (orthogonal coupling)
Some concerns have distinct purposes but must intersect to form a complete solution. Recognizing this lets architects:
- find intersection points that cause least entanglement

A **sidecar** pattern isolates cross-cutting concerns by attaching a companion component alongside a service:
- consistent operational behavior
- reduced need to embed operational libraries everywhere

A **service mesh** is the generalized form:
- common operational behavior provided through infrastructure layer + sidecars
- handles routing, retries, mTLS, observability, etc.

There are trade-offs between sidecar-only usage and full service mesh adoption:
- operational complexity vs consistency
- control plane overhead vs standardized capabilities
- observability gains vs runtime footprint

<ImagePlaceholder title="service + sidecar handling cross-cutting concerns" chapter="20"></ImagePlaceholder>

---

# Communication Patterns

Architects often implement patterns without naming them because patterns are solutions to common problems. Naming matters because it makes trade-offs visible.

## Orchestration vs Choreography

This pattern shows up across multiple architecture styles (EDA, microservices, SOA):

- **Choreography**
    - no central coordinator
    - participants react to events/messages
    - strong autonomy
    - harder end-to-end reasoning and error handling

- **Orchestration**
    - coordinator controls workflow
    - clearer flow control, retries, recoverability
    - introduces coordination coupling and a central point of change

A practical benefit of recognizing this pattern:
- the trade-off becomes explicit rather than accidental

It also reinforces a core idea from earlier chapters:
- trade-off analysis is not a one-time task; it keeps recurring as systems evolve.

<ImagePlaceholder title="central coordinator vs distributed reactions" chapter="20"></ImagePlaceholder>

---

## CQRS (Command Query Responsibility Segregation)

CQRS separates:
- **writes (commands)** from
- **reads (queries)**

A typical CQRS structure:
- writes go to a primary store (often a DB; sometimes a durable queue/log)
- read models are updated separately (often asynchronously)
- reads come from a store optimized for query patterns

CQRS shows up when systems need:
- strong write controls (security, validation, auditability)
- query performance/shape that differs from write model
- isolation between write complexity and read scalability

The trade-offs include:
- eventual consistency between write and read models
- increased operational and modeling complexity

<ImagePlaceholder title="command side → write store → async projection → read store" chapter="20"></ImagePlaceholder>

---

# Infrastructure Patterns

Patterns apply to infrastructure too. Coupling exists in:
- brokers
- queues/topics
- databases
- gateways
- runtime platforms

## Broker Patterns: Single Broker vs Domain Broker

Two broker patterns appear as infrastructure topology choices:

### Single Broker Pattern
- one shared broker for the system
- simpler to manage centrally
- risk: becomes shared coupling point and scaling bottleneck
- change control and reliability concerns affect many consumers

### Domain Broker Pattern
- brokers segmented by domain
- reduces blast radius and coupling
- improves scaling and change control per domain
- increases infrastructure footprint and operational complexity

This parallels the earlier theme:
- fewer shared things tends to reduce coupling but increase operational overhead

<ImagePlaceholder title="one broker serving all domains" chapter="20"></ImagePlaceholder>

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="Patterns are visible in frontend ecosystems as well:"
  bullets="[{&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;**Ports/adapters** appear as domain-core vs API client boundaries&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;**CQRS** shows up when UI reads from cached/denormalized views while writes go through stricter command APIs&quot;}, {&quot;icon&quot;: &quot;Broadcast&quot;, &quot;text&quot;: &quot;**Orchestration vs choreography** appears in BFFs and UI aggregators (orchestrators) vs event-driven UI updates (choreography)&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;**Sidecar/mesh** affects frontend indirectly through reliability behavior (retries, timeouts, mTLS, routing) of backend APIs that the UI depends on&quot;}]"
></FrontendSection>

## Closing Perspective
Architectural patterns are not rules. They are reusable solution shapes with known trade-offs.

A consistent workflow emerges:
1) identify the problem and coupling forces
2) select the pattern that best fits the context
3) choose an implementation that matches constraints (tooling, ops maturity, cost, licensing)

This keeps decisions anchored in structure and trade-offs rather than fashion or default “best practices.”
