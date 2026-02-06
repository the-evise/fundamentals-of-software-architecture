# Chapter 21 — Architecture Decisions

## Why This Chapter Exists
Many architecture failures are not failures of ideas—they are failures of decision-making: decisions made too early, made without justification, not documented, or communicated in a way that disappears. A “good” architectural decision is one that guides teams toward better technical choices under real constraints.

This chapter frames architectural decisions as a lifecycle: gather information, justify, document, and communicate—while avoiding common decision anti-patterns. It also places ADRs (Architecture Decision Records) as the practical mechanism for keeping decisions durable and maintainable over time.

---

## What Makes a Good Architectural Decision

Regardless of context, a good architectural decision is one that:
- guides development teams toward the right technical choices
- is made with enough relevant information
- is justified (technical + business)
- is documented in a durable place
- is communicated to the right stakeholders effectively

A decision can be “architectural” even when it looks like a technology choice if it materially affects:
- structure (architecture styles/patterns)
- architectural characteristics (nonfunctional qualities)
- dependencies and interfaces
- construction techniques (frameworks, tools, platforms, processes that alter architecture outcomes)

**Structural impact examples**
- choosing a style (layered vs microservices)
- selecting gateway/service-bus/adapter patterns for access and orchestration
- selecting observability/mesh approaches that affect coupling and runtime behavior

---

## Decision Timing: The Last Responsible Moment

Architects rarely have perfect information. One pragmatic principle is:

<QuoteBlock>
Wait until the last responsible moment to make an important decision.
</QuoteBlock>

This is the point where:
- there is enough information to justify and validate the choice
- waiting longer would either block development or increase risk/cost beyond the benefit of deferring

Deferring has a cost. When the cost of deferring exceeds the risk of deciding, it is time to decide.

<ImagePlaceholder title="cost of delay vs risk of early decision curve intersection" chapter="21"></ImagePlaceholder>

---

## Decision Anti-Patterns

### 1) Covering Your Assets
A decision is avoided or delayed out of fear of being wrong. This can create:
- stalled progress
- hidden decisions made by teams under pressure
- analysis paralysis

**What counters it (in practice)**
- last responsible moment discipline
- continual collaboration with dev teams to reduce blind spots
- feasibility checks (POCs where needed) to avoid “paper architecture”

<ImagePlaceholder title="defer → uncertainty remains → defer again" chapter="21"></ImagePlaceholder>

---

### 2) Groundhog Day
The same decision is debated repeatedly because people do not know:
- what was decided
- why it was decided
- what trade-offs were accepted

Root cause: insufficient justification and poor persistence of the rationale.

A decision’s **why** is more valuable than its **how**, because the “why” provides context when circumstances change.

---

### 3) Email-Driven Architecture
Decisions are “communicated” via email threads, and then:
- forgotten
- lost
- inaccessible to new team members
- ambiguous due to partial context

A more robust communication model:
- email carries **only context + a link**
- the decision and details live in a single system of record
- recipients are only stakeholders who actually need to know

<ImagePlaceholder title="decision scattered across threads vs single record + link" chapter="21"></ImagePlaceholder>

---

## Architectural Decision Records (ADRs)

One of the most effective ways to document architecture decisions is an **Architecture Decision Record (ADR)**:
- short (typically 1–2 pages)
- text-based (Markdown/AsciiDoc)
- versioned and reviewable
- optimized for maintainability and change history

The core value is emphasis on **why** a decision was made, not just what was chosen.

Tooling exists to manage ADRs, but the stable practice is that ADRs are simple files stored with version control.

### Where ADRs Live
A common recommendation:
- store ADRs in a dedicated Git repo (or in the main repo under `/docs/adr/`)
- ensure broad access across teams
- optionally render via wiki/static site tooling for easy consumption

---

## ADR Structure (Practical Template)

A standard ADR commonly includes:

1) **Title**
- numbered
- short, descriptive phrase

2) **Status**
- Proposed
- Accepted
- Superseded (with pointer to replacement)

3) **Context**
- forces at play
- what situation requires the decision
- constraints and assumptions

4) **Decision**
- the decision itself
- full justification (technical + business)
- why this is preferred over alternatives

5) **Consequences**
- impact of the decision (positive and negative)
- trade-offs and second-order effects

Two additional sections are often useful:

6) **Compliance** (recommended)
- how adherence will be measured
- governance mechanisms (fitness functions, checks, review cadence)

7) **Notes** (recommended)
- metadata: author, approval date, approver(s)
- superseded date, last modified, etc.

<ImagePlaceholder title="ADR layout with sections highlighted" chapter="21"></ImagePlaceholder>

---

## What Counts as “Architecturally Significant”

A decision is architecturally significant if it affects:
- system structure (style/pattern selection)
- key architectural characteristics (performance, scalability, reliability, security, etc.)
- dependencies and interfaces (how parts connect and are accessed)
- construction techniques that alter architectural outcomes (platforms, frameworks, processes)

This is why “technology choices” can be architectural decisions: technologies often constrain structure and characteristics.

---

## AI and LLMs: How They Help (and Where They Don’t)

From your notes’ perspective:

- LLM outputs are largely probability-driven: “most likely answer / common best practice.”
- Architectural decisions require contextual trade-off analysis:
    - translating business concerns (time-to-market, growth) into architectural characteristics (maintainability, deployability, testability)
    - choosing a least-worst option given context and constraints
- This translation and judgment relies heavily on experience.

A practical best-case use of generative AI:
- generate a list of possible trade-offs
- surface missing considerations
- help broaden the decision space

But the selection and accountability remain human:
- AI may have knowledge, but lacks the “wisdom” of contextual judgment and responsibility for consequences.

<ImagePlaceholder title="AI suggesting trade-off checklist; architect deciding with context" chapter="21"></ImagePlaceholder>

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="In frontend-heavy systems, architectural decisions frequently show up as:"
  bullets="[{&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;API consumption patterns (BFF, gateway, orchestration location)&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;contract strategy (GraphQL vs REST, field selectors, versioning)&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;state management boundaries (domain modules vs shared global state)&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;performance constraints (SSR/ISR/CSR choices, caching boundaries)&quot;}, {&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;observability requirements (client-side logging, tracing correlation)&quot;}, {&quot;icon&quot;: &quot;Flask&quot;, &quot;text&quot;: &quot;ADRs are especially useful for frontend decisions because:&quot;}, {&quot;icon&quot;: &quot;UsersThree&quot;, &quot;text&quot;: &quot;teams turn over frequently&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;tooling changes rapidly&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;“why we chose this” becomes more important than “what we chose”&quot;}]"
></FrontendSection>

## Closing Perspective
Architecture decisions are not a single action; they are a lifecycle:
- gather relevant information
- make the decision at the last responsible moment
- justify it in both technical and business terms
- document it in a durable system of record
- communicate it by reference, not by scattering details

ADRs are the practical mechanism that keeps this discipline lightweight and maintainable.
