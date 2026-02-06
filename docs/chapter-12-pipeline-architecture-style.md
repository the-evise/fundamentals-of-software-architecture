# Chapter 12 — Pipeline Architecture Style

## Why This Chapter Exists
Some systems are best understood not as “features and screens,” but as **ordered transformations**: data enters, moves through a sequence of steps, and exits as a result. When the workflow is deterministic and one-directional, pipeline architecture provides a simple structure that remains readable even as complexity grows.

This chapter describes the pipeline (pipes-and-filters) style, its component topology, and where it fits—and where it becomes structurally mismatched.

---

## Topology: Pipes and Filters

The pipeline architecture consists of two primary component types:

- **Filters** — self-contained steps that perform work
- **Pipes** — unidirectional channels that connect filters

Filters typically perform composite behavior through sequencing rather than central orchestration: a complex task is achieved by composing multiple filters.

Even if a filter is implemented as a single class/file, it is still an architectural component.

<ImagePlaceholder title="producer → transformer → tester → consumer connected by pipes" chapter="12"></ImagePlaceholder>

---

## Filters: Independent Units of Work

Filters are intended to be independent from one another. The pipeline’s structure assumes that filters do not collaborate directly; they only communicate through the pipe contract.

A common architectural failure mode is overloading a filter with too much responsibility, turning it into a mini-orchestrator and defeating the separation the pipeline provides.

---

## Filter Types (Common Classification)

Four filter types are commonly referenced:

1) **Producer (Source)**  
   Entry point for data into the pipeline.

2) **Transformer**  
   Accepts input, optionally transforms/enhances it, forwards the result.  
   Examples: calculations, enrichment, formatting, mapping.

3) **Tester**  
   Applies criteria to input and optionally produces output based on the test.  
   Examples: validation, filtering, routing decisions.

4) **Consumer (Sink)**  
   Terminal point for the pipeline flow.  
   Often persists results or presents output.

<ImagePlaceholder title="producer/transformer/tester/consumer annotated along a pipeline" chapter="12"></ImagePlaceholder>

---

## Pipes: Contracts and Communication

Pipes form the communication channel between filters. Their directionality is a structural feature:
- pipes are intended to be **unidirectional**
- this preserves separation of concerns
- and prevents filter collaboration

Pipes also introduce a governance requirement:
- changing the contract between filters can break downstream filters
- contract evolution requires tests and coordination

Because the pipeline’s correctness relies on contract stability, governance is typically focused on:
- schema/versioning discipline
- compatibility testing
- clear ownership of contracts

<ImagePlaceholder title="pipe schema contract with downstream dependency highlight" chapter="12"></ImagePlaceholder>

---

## Monolithic or Distributed Variants

Most pipeline implementations are monolithic, but the style can be deployed in different ways:

- **Monolithic pipeline**  
  All filters run in-process within a single deployable artifact.

- **Distributed pipeline**  
  Each filter (or a group of filters) is deployed as a service. Communication can be:
    - synchronous remote calls, or
    - asynchronous messaging

Distributed deployment increases operational complexity and introduces distributed computing constraints (latency, reliability, versioning), but may help in modular scaling and independent evolution of filters.

<ImagePlaceholder title="in-process pipeline vs filter-as-services pipeline" chapter="12"></ImagePlaceholder>

---

## Modularity and Compositional Reuse

A major advantage of the style is **compositional reuse**:
- the simplicity of filters encourages reusability
- workflows become a composition of small, narrow steps

This produces simple but powerful composite abstractions, particularly when the steps are stable, ordered, and deterministic.

---

## Error Handling and Pipeline Boundaries

Because workflows are sequential and contracts are explicit, pipeline designs benefit from identifying fatal error conditions early:
- what happens when a filter cannot process input?
- where does error information go?
- does the pipeline stop, skip, or route around?

These questions shape whether the pipeline remains linear, branches, or requires additional mechanisms (which may push the design toward alternative styles).

<ImagePlaceholder title="fatal error stop vs routed error output" chapter="12"></ImagePlaceholder>

---

## Practical Guardrails (Structure, Not Rules)

Teams sometimes use lightweight conventions (for example, tagging filter types in entry classes) to keep filter responsibilities aligned with their role:
- producer code looks like a producer
- transformers don’t become orchestration hubs
- testers remain narrow in scope

This is less about naming and more about preventing gradual responsibility drift.

<ImagePlaceholder title="narrow filter vs bloated filter with too many concerns" chapter="12"></ImagePlaceholder>

---

## Team Topologies Fit

Pipeline architecture is generally independent of team topologies; it works under many configurations.

Common mappings:
- **Stream-aligned teams**  
  End-to-end ownership fits the pipeline’s ordered flow.
- **Complicated subsystem teams**  
  Each filter can encapsulate narrow complexity.
- **Platform teams**  
  Modularity supports shared tooling, common infra, and governance automation.

---

## Partitioning Type

Pipeline is typically considered **technically partitioned**, because logic is separated by filter type and processing step rather than by domain boundaries.

(Teams may still align filters to domain workflows, but the structural partitioning is workflow/processing-oriented.)

---

## Characteristic Profile (Qualitative)

Common strengths:
- cost (especially in monolithic form)
- simplicity
- modularity (replace/modify filters without rewriting the whole flow)

Common downsides:
- ceremony (workflow definition, contract discipline)
- deployment risk and testing completeness (especially as filter count grows)
- scalability/elasticity/fault tolerance are not inherent benefits of the style

<StyleRatings style-key="Pipeline" />

---

## Where It Fits (and Where It Doesn’t)

Pipeline tends to fit well when workflows are:
- distinct
- ordered
- deterministic
- one-way processing sequences

It tends to be structurally mismatched when:
- workflows are non-deterministic
- routing decisions are complex and event-driven
- high scalability/elasticity/fault tolerance dominate requirements

In many non-deterministic workflow scenarios, event-driven architectures are often a closer fit (discussed later).

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="Pipeline thinking appears in frontend systems primarily in:"
  bullets="[{&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;build and compile pipelines (bundling, transforms, minification)&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;data processing flows (validation → normalization → enrichment → rendering)&quot;}, {&quot;icon&quot;: &quot;FlowArrow&quot;, &quot;text&quot;: &quot;UI workflows that are truly stepwise and deterministic (wizards, staged forms)&quot;}, {&quot;icon&quot;: &quot;Broadcast&quot;, &quot;text&quot;: &quot;For interactive, branching user journeys, pipelines can become awkward unless combined with other architectural concepts (state machines, event-driven flows, orchestration).&quot;}]"
></FrontendSection>

## Closing Perspective
Pipeline architecture is a strong fit for step-by-step processing where ordering and determinism are central. Its simplicity and modularity are structural advantages—so long as filters remain narrow and contracts are governed.

When workflows become non-deterministic or operational characteristics dominate, the pipeline’s clarity can turn into rigidity.
