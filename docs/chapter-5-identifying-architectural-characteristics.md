# Chapter 5 — Identifying Architectural Characteristics

## Why This Chapter Exists

Many architectural failures do not come from poor implementation, but from **supporting the wrong qualities—or too many of them**. Teams often optimize for speed, scalability, or flexibility without understanding whether those qualities actually serve the domain.

This chapter addresses a single problem:

<QuoteBlock>
How can architects translate vague domain concerns into concrete architectural characteristics without over-engineering the system?
</QuoteBlock>

---

## Architectural Characteristics: Where They Come From

Architectural characteristics rarely appear in one place. They emerge from three overlapping sources:

1. **Domain concerns**
2. **Project requirements**
3. **Implicit domain knowledge**

Experienced architects internalize many of these characteristics. For example, in financial systems, **data integrity** often becomes implicit. Fundamental to the degree that it is no longer explicitly discussed, yet shapes every design decision.

This implicit knowledge is powerful, but also dangerous when left unexamined.

---

## The Translation Gap Between Domains and Architecture

A recurring tension exists between architects and domain stakeholders:

- Stakeholders speak in terms of **user satisfaction, deadlines, cost**
- Architects respond with **availability, interoperability, fault tolerance**

Neither side is wrong. They are simply speaking different languages.

Understanding **domain goals** allows architects to translate concerns into architectural “-ilities” that justify structural decisions.

For example:

<QuoteBlock>
It does not matter how fast a system is if it is unavailable when needed.
</QuoteBlock>

Speed without availability does not serve the domain—it merely optimizes a metric.

---

## Explicit vs. Implicit Characteristics

Most architectural characteristics originate from **explicit statements** in requirements documents. Others must be **decoded** from domain language.

<QuoteBlock>
Architects must often translate *what the domain says* into *what the system must structurally support*.
</QuoteBlock>

A requirements document may never say “availability,” yet continuously emphasize uptime, reliability, or uninterrupted workflows.

<QuoteBlock cite="Fred Brooks">
“Great designers design, of course.”
</QuoteBlock>
Experience reveals what requirements omit.

---

## Nuance in Architectural Characteristics

Not all characteristics are equal, and many are misunderstood.

### Performance Is Not Singular
Performance is contextual:
- First load time?
- Interaction latency?
- Build time?
- Runtime responsiveness?

In frontend systems (React / Next.js), performance may relate more to **perceived speed** than raw execution metrics.

### Security as Architecture or Design
Security becomes an architectural characteristic **only when it influences structure**:
- Authentication boundaries
- Data flow isolation
- Rendering strategies (server vs client)

If it affects structure and is critical to the system, it qualifies.

---

## Synergy and Trade-offs

Architectural characteristics do not exist in isolation.

Each one interacts with the others, often amplifying complexity. This is why **over-specifying characteristics** is a common architectural failure.

<QuoteBlock>
There are no wrong answers in architecture—only expensive ones.
</QuoteBlock>

Trade-off analysis is not optional; it defines the architect’s role.

There is no “best” design—only a **least-worst collection of trade-offs**.

---

## The Cost of Supporting Too Much

Every additional architectural characteristic:
- Increases system complexity
- Expands the solution space
- Raises cognitive and maintenance cost

The goal is not to maximize characteristics, but to **minimize unnecessary ones**.

A useful exercise:
<QuoteBlock>
After identifying architectural characteristics, try removing one or two.
If the system still serves its core purpose, those characteristics were likely optional.
</QuoteBlock>

Simplicity remains the underlying motivation.

---

## Business and Architecture: Shared Responsibility

Architectural characteristics should never be identified in isolation.

Collaboration between architects and business stakeholders is critical. Trade-off discussions surface hidden priorities and prevent accidental over-engineering.

Analysis does not slow decisions—it **prevents irreversible ones**.

---

## Translating Domain Concerns into Architectural Characteristics

Below are common translations observed across projects:

<TableBlock>
<table>
  <thead>
    <tr>
      <th>Domain Concern</th>
      <th>Architectural Characteristics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Time &amp; budget</td>
      <td>Simplicity, feasibility</td>
    </tr>
    <tr>
      <td>User satisfaction</td>
      <td>Performance, availability, fault tolerance, testability</td>
    </tr>
    <tr>
      <td>Time to market</td>
      <td>Agility, testability, deployability</td>
    </tr>
    <tr>
      <td>Mergers &amp; acquisitions</td>
      <td>Interoperability, scalability, extensibility</td>
    </tr>
  </tbody>
</table>
</TableBlock>

These mappings are not prescriptions—they are patterns.

---

## Frontend Lens (React / Next.js Perspective)

<FrontendSection
  lead="In frontend-heavy systems:"
  bullets="[{&quot;icon&quot;: &quot;ShieldCheck&quot;, &quot;text&quot;: &quot;Availability may relate to **deployment resilience**&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;Performance often maps to **UX perception**&quot;}, {&quot;icon&quot;: &quot;Flask&quot;, &quot;text&quot;: &quot;Testability affects long-term velocity more than initial delivery&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Agility may justify architectural choices like modular component boundaries&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Backend characteristics exist, but they are not the focus here.&quot;}]"
></FrontendSection>

## External References

- Architecture Katas  
  https://fundamentalsofsoftwarearchitecture.com/katas/list.html

---

## Visual Placeholders (For Later)

<ImagePlaceholder title="Domain concerns → Architectural characteristics → Structural decisions" chapter="5"></ImagePlaceholder>

<ImagePlaceholder title="Explicit requirements vs implicit domain knowledge" chapter="5"></ImagePlaceholder>

<ImagePlaceholder title="Characteristics vs complexity impact" chapter="5"></ImagePlaceholder>

---

## Closing Perspective

Architectural characteristics are not goals.  
They are **constraints chosen in service of domain intent**.

Identifying fewer—and choosing them deliberately—is often the most architectural decision of all.
