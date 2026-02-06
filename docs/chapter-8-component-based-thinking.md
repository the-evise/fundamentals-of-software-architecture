# Chapter 8 — Component-Based Thinking

## Why This Chapter Exists
Teams often jump directly to deployment diagrams (services, databases, infra) while the internal structure of the codebase remains undefined. In frontend projects, that gap shows up as inconsistent folder boundaries, unclear ownership, and “everything imports everything.”

This chapter frames **component-based thinking** as a way to define architecture first as **logical components**—what the system does and how responsibilities are separated—before mapping those components onto physical artifacts.

---

## Component-Based Thinking: A Logical View of Structure

Component-based thinking is seeing a system as a set of **logical components** interacting to perform business functions.

Each component contains source code that implements a business capability.

<ImagePlaceholder title="major business functions represented as interacting components" chapter="8"></ImagePlaceholder>

---

## Logical Architecture vs Physical Architecture

Architects can analyze directory structure, namespaces, and import graphs to understand a system’s internal structure—its **logical architecture**.

A logical architecture diagram typically does *not* show:
- UI screens
- databases
- services
- infrastructure artifacts

Instead, it shows:
- logical components
- their responsibilities
- their interactions

Ideally, the diagram corresponds to:
- directory boundaries
- module boundaries
- namespaces (or import paths)

Many architects bypass logical architecture and move directly to physical architecture. The common criticism of that approach is that physical architecture alone provides little guidance on:
- how code should be organized
- how responsibilities should be distributed
- how teams should partition work

When those questions remain unanswered, systems often become structurally unplanned—difficult to maintain, test, and deploy.

<ImagePlaceholder title="logical component diagram vs physical deployment diagram" chapter="8"></ImagePlaceholder>

---

## Logical Architecture as an Iterative Process

Creating a logical architecture is not a one-time design task. It is a continuous loop of:
- identifying components
- assigning responsibilities
- evaluating fit against architectural characteristics
- restructuring when reality conflicts with assumptions

<ImagePlaceholder title="identify → assign → analyze → restructure → repeat" chapter="8"></ImagePlaceholder>

---

## Identifying Core Components

The first activity in developing a logical architecture is identifying initial core components and assigning user stories or requirements to them.

A recurring mistake is attempting to make the initial component model perfect. In practice, early component boundaries are hypotheses that improve through iteration.

Initial core components typically align with:
- major user actions
- major workflows / processing paths

---

## Approaches to Discovering Components

### Workflow Approach
This approach models major “happy path” workflows (non-error journeys) and derives components from steps in those workflows.

It tends to emphasize the main request/response processing structure.

<ImagePlaceholder title="user journey steps mapped to components" chapter="8"></ImagePlaceholder>

### Actor–Action Approach
Useful when there are multiple actors.

The architect identifies:
- major actions each actor performs
- automated “system actor” actions (billing, replenishment, reporting)

This approach often yields more components than the workflow approach, depending on how many actions and actors are modeled.

<ImagePlaceholder title="actors/actions mapped to components (use-case style)" chapter="8"></ImagePlaceholder>

### Other Discovery Techniques (Common Alternatives)
Different teams use different discovery methods depending on context:
- Use-case diagrams
- Event storming
- Domain-based partitioning (DDD-inspired)

These methods tend to produce different initial shapes; convergence typically happens through iteration and feedback.

---

## The Entity Trap Anti-Pattern

A warning signal in component naming is the emergence of coarse “do-everything” components such as:
- `Manager`
- `Supervisor`
- `Controller`
- `Handler`
- `Engine`
- `Processor`

These names often indicate that a component is absorbing too many responsibilities and losing purpose.

When components become too coarse-grained:
- cohesion decreases
- coupling increases
- testing becomes difficult
- deployment risk increases

<ImagePlaceholder title="components with excessive responsibility and unclear boundaries" chapter="8"></ImagePlaceholder>

A related observation: if a system is purely CRUD against entities, architecture effort may shift toward selecting a suitable framework/tooling rather than designing elaborate component structures.

---

## Assigning User Stories to Components

Once initial components exist, user stories can be assigned to them to populate “empty buckets” and clarify purpose.

This step helps expose:
- missing components
- overloaded components
- mismatched boundaries

<ImagePlaceholder title="stories distributed into component “buckets”" chapter="8"></ImagePlaceholder>

---

## Analyzing Roles and Responsibilities

This step focuses primarily on **cohesion**: how interrelated a component’s operations are.

A component taking on too much responsibility often reveals itself through language patterns in its role statement:
- “and also”
- “in addition”
- “as well as”
- long comma-separated lists

These patterns tend to correlate with unclear boundaries.

Refactoring responsibility distribution changes the system’s maintainability, testability, and deployability—not because of implementation detail, but because structure determines change cost.

<ImagePlaceholder title="role statement patterns that imply low cohesion" chapter="8"></ImagePlaceholder>

---

## Architectural Characteristics as a Refinement Lens

A purely functional view may suggest a single component for “user interaction.” But architectural characteristics often demand subdivision.

Examples in frontend context:
- performance concerns can suggest separating rendering layers from data orchestration
- security concerns can suggest isolating auth logic and token handling
- maintainability can suggest feature partitioning and strict import boundaries

This refinement is one reason the component model evolves over time.

---

## Restructuring Components: Feedback as a Constant

Component restructuring is not limited to greenfield projects. It occurs throughout the life of any system undergoing maintenance.

Two forces drive this:
1. New discoveries, edge cases, and constraints
2. Developers gaining deeper understanding of where behaviors should live

Component design is therefore a continuous collaboration between architects and developers.

---

## Component Coupling

Components are coupled when:
- they communicate with each other
- or a change in one can impact the correctness of another

<ImagePlaceholder title="change ripple between components" chapter="8"></ImagePlaceholder>

### Static Coupling (Fan-in / Fan-out)
Static coupling describes dependency relationships.

- **Afferent coupling (fan-in)**  
  Degree to which other components depend on a target component.

- **Efferent coupling (fan-out)**  
  Degree to which a target component depends on other components.

<ImagePlaceholder title="many components depend on one" chapter="8"></ImagePlaceholder>
- `efferent-coupling.png` — one component depends on many

*(Terminology note: in some sources, “static coupling” is defined as compile-time dependency. In your notes it appears linked to synchronous interaction; both perspectives converge on the same concern: change propagation.)*

### Temporal Coupling
Temporal coupling refers to dependencies based on timing or transactional sequencing.

It is often difficult to detect because:
- the coupling may not appear in import graphs
- the failure modes emerge at runtime

<ImagePlaceholder title="timing-dependent interactions between components" chapter="8"></ImagePlaceholder>

---

## The Law of Demeter (Principle of The Least Knowledge)

Many architects aim for loose coupling because it tends to improve:
- maintainability
- testability
- deploy safety
- reliability

One technique associated with loose coupling is the **Law of Demeter**, also called the **Principle of Least Knowledge**:
- a component should have limited knowledge of other components

Applying it often redistributes coupling rather than eliminating it system-wide.

This reflects a recurring theme:
<QuoteBlock>
Every design has trade-offs; coupling is managed, not removed.
</QuoteBlock>

<ImagePlaceholder title="direct knowledge vs “train wreck” calls reduced to a mediator boundary" chapter="8"></ImagePlaceholder>

---

## Frontend Context: How This Shows Up in React / Next.js

<FrontendSection
  lead="Component-based thinking maps naturally to frontend structures, but the failure modes differ:"
  bullets="[{&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;Logical components drift from folder boundaries when imports are unconstrained&quot;}, {&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;Shared UI libraries start importing app logic, creating reverse dependencies&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;“Feature” components become system components via convenience shortcuts&quot;}, {&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;A logical architecture diagram that mirrors import boundaries (and is enforced) is often the difference between a maintainable monolith and an accidental one.&quot;}]"></FrontendSection>

## Closing Perspective
Component-based thinking treats architecture as the structure of responsibilities and interactions—not the deployment topology.

Physical architecture matters, but without a logical architecture
