# Chapter 23 — Diagramming and Presenting Architecture

## Why This Chapter Exists
Architecture only matters if it changes outcomes. That requires communication: managers must fund it, and development teams must implement it. If the architecture can’t be explained clearly, it effectively doesn’t exist as a shared decision.

Diagramming is one of the highest-leverage communication skills for architects because it compresses complexity into a form people can discuss, challenge, and refine.

---

## Diagramming as an Architect’s Communication Skill

An architect’s work is routinely challenged. Diagramming supports:
- aligning stakeholders on what is being built
- exposing trade-offs and boundaries
- creating a shared mental model
- making decisions reviewable and governable

In practice, the value of a diagram is less about beauty and more about shared understanding.

---

## Representational Consistency

Representational consistency means:
- always showing the relationships between parts of an architecture **before** changing views

This applies to both diagrams and presentations. It reduces confusion by ensuring the viewer can track:
- what’s on the canvas
- how pieces relate
- what changed when the view changed

A recurring failure mode in architecture communication:
- switching to a new diagram/view without preserving relationship context
- viewers lose track of what is connected to what
- misunderstandings emerge that look like “disagreement”

**Image placeholder:**
- `representational-consistency-before-after.png` — same relationships shown, then zoomed/filtered view

---

## Scope Clarity: What Exactly Is Being Shown

Every diagram implicitly has scope. If scope isn’t explicit, viewers infer it—and often infer it incorrectly.

A practical goal in each diagram:
- make the scope of the subject obvious (system, quantum, service, module, component)
- avoid mixing logical and physical views without labeling the shift

This removes a common source of confusion:
- someone assumes a “logical component diagram” is a “deployment diagram,” or vice versa

**Image placeholder:**
- `scope-labeling-example.png` — “Scope: Domain service boundary” / “Scope: system-level topology”

---

## Agile Diagramming: Avoid Artifact Attachment

Spending many hours making a “perfect” diagram increases emotional attachment to the artifact. The risk:
- the diagram becomes defended rather than revised
- changes feel like loss
- discussion becomes political

Agile-style artifact creation pushes toward:
- just-in-time diagrams
- low ceremony
- fast iteration
- easy disposal when wrong

Lightweight tooling supports this by making it easy to:
- redraw
- experiment
- revise collaboratively

A diagram should be disposable enough that it can evolve.

**Image placeholder:**
- `diagram-iteration-cycle.png` — sketch → discuss → revise → discard/replace

---

## Lightweight Tools and “Quick and Dirty” Artifacts

Early in design, fast diagrams are often more valuable than polished ones:
- they encourage exploration
- they invite critique
- they keep attention on structure rather than aesthetics

Polish can be useful later—when the goal is stable communication—but early polish can freeze the design prematurely.

---

## Building a Personal Diagramming Style

A consistent personal style reduces cognitive load for the viewer. A practical style kit includes:

- **Titles**  
  What is this diagram about? What is its scope?

- **Lines**  
  Represent relationships and communication.

- **Shapes**  
  Consistent meaning for service/module/component/etc.

- **Labels**  
  Clarify boundaries, protocols, responsibilities.

- **Color**  
  Encode categories (domain vs infra, trust boundaries, ownership).

- **Keys / Legends**  
  Explain the representation rules so new viewers can decode quickly.

A style is not an aesthetic choice; it is an encoding system.

**Image placeholder:**
- `diagram-style-kit.png` — legend: shapes, line types, colors

---

## Line Semantics: Sync vs Async

A useful convention (and common expectation in architecture diagrams):

- **Solid lines** → synchronous communication
- **Dotted lines** → asynchronous communication

This makes coupling visible at a glance:
- sync often implies runtime dependency and waiting
- async often implies decoupling, buffering, and eventual processing

Keeping this consistent across diagrams helps audiences reason about trade-offs without reading paragraphs of explanation.

**Image placeholder:**
- `sync-async-line-legend.png` — solid vs dotted with examples

---

## Presentations: Preserve Relationships When Changing Views

When presenting, the same representational consistency rule applies:
- show the relationship map first
- then zoom in, filter, or reframe

This keeps audiences oriented:
- “this detail lives inside that boundary”
- “this component interacts with those three others”
- “this view is a projection of the same structure”

**Image placeholder:**
- `presentation-zoom-sequence.png` — system topology → domain boundary → component detail

---

## Frontend Context (React / Next.js Lens)

In frontend-heavy systems, diagrams often work best when they separate views:

- **Logical architecture**
    - feature modules / bounded contexts
    - UI composition (pages, feature slices, microfrontends)
    - API contracts by domain

- **Physical architecture**
    - Next.js runtime (SSR/ISR/CSR paths)
    - CDN/edge caching layers
    - BFF/gateway placement

- **Communication**
    - sync: UI → BFF → service
    - async: UI triggers action; UI updates via polling/events/webhooks

Using consistent line semantics and explicit scope prevents common confusion:
- “Is this diagram showing UI routing or deployment routing?”
- “Is that a module boundary or a service boundary?”

**Image placeholders:**
- `frontend-logical-vs-physical.png` — logical modules vs physical deployment
- `ui-bff-service-communication.png` — sync + async flows clearly marked

---

## Closing Perspective
Architecture diagrams are communication artifacts, not monuments. Their value comes from:
- representational consistency
- explicit scope
- lightweight iteration
- a stable visual language that makes coupling and boundaries legible

The goal is not “beautiful diagrams.” The goal is shared understanding that survives disagreement, iteration, and time.
