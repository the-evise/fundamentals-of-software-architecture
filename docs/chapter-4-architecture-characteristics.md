# Chapter 4: Architectural Characteristics Defined

## Introduction
Teams often focus on *what* a system should do, yet many architectural failures emerge from what the system must support beyond domain behavior. This chapter clarifies **architectural characteristics**—the non-domain capabilities that shape structure, constrain design, and ultimately determine whether a system succeeds in practice, especially in long-lived frontend applications.

---

## Beyond the Domain

Architects frequently collaborate on defining the problem domain. However, a software solution consists of more than domain functionality.

Every system also carries expectations around:
- Performance
- Security
- Scalability
- Auditability
- Legal compliance
- Data handling

Much of the effort involved in building software is not about domain behavior, but about **capabilities** that allow that behavior to exist reliably in the real world.

These capabilities are referred to as **architectural characteristics**.

---

## What Qualifies as an Architectural Characteristic

Not every non-functional requirement qualifies as architectural.

To be considered an architectural characteristic, a requirement must:

1. Represent a **non-domain design consideration**
2. **Influence structural decisions**
3. Be **critical to the success** of the application

If a requirement does not shape structure or materially affect outcomes, it remains a design or implementation concern rather than an architectural one.

<ImagePlaceholder title="non-domain, structural impact, criticality" chapter="4"></ImagePlaceholder>

---

## Requirements vs Characteristics

Design requirements describe **what** the application does.  
Architectural characteristics describe **how** and **why** those requirements are implemented in a particular way.

From a structural perspective:
- Domain requirements define system behavior
- Architectural characteristics define system shape

Together, they form the operational and design criteria for project success.

---

## Choosing Fewer, Not More

A system can theoretically support a large number of architectural characteristics. In practice, each additional characteristic increases complexity and reduces clarity.

For this reason, architects tend to favor:
- Selecting the **fewest possible** characteristics
- Prioritizing those with the highest structural impact

Attempting to support too many characteristics often results in generic, over-engineered solutions that solve no specific problem particularly well.

---

## A Spectrum of Characteristics

Architectural characteristics exist along a broad spectrum, from low-level structural concerns to high-level operational capabilities.

### Operational Architectural Characteristics

These focus on runtime and infrastructure behavior and often overlap with DevOps concerns.

Common examples include:
- **Availability** – proportion of time the system must be accessible
- **Continuity** – disaster recovery expectations
- **Performance** – responsiveness under load
- **Recoverability** – business continuity after failure
- **Reliability / Safety** – tolerance for failure, especially in critical systems
- **Robustness** – handling of errors and edge cases
- **Scalability** – ability to grow with demand

*Frontend context:*  
Page load performance, SSR strategies, caching, and client-side error boundaries often reflect these concerns.

<ImagePlaceholder title="runtime-focused capabilities" chapter="4"></ImagePlaceholder>

---

### Structural Architectural Characteristics

These focus on internal code organization and long-term changeability.

Common examples include:
- **Configurability** – ability to adjust behavior without code changes
- **Extensibility** – ease of adding new capabilities
- **Installability** – simplicity of deployment across environments
- **Leverageability / Reuse** – shared components across products
- **Localization** – multi-language and regional support
- **Maintainability** – effort required to modify or enhance the system
- **Portability** – ability to run across platforms
- **Upgradeability** – ease of moving to newer versions

*Frontend context:*  
Component composition, design systems, and build tooling decisions often directly impact these characteristics.

<ImagePlaceholder title="internal structure and changeability" chapter="4"></ImagePlaceholder>

---

### Cloud-Related Characteristics

Modern systems introduce additional characteristics tied to cloud platforms.

Examples include:
- **On-demand scalability**
- **On-demand elasticity**
- **Zone-based availability**
- **Region-based privacy and security**

While often associated with backend systems, frontend architectures increasingly reflect these constraints through deployment strategies, CDN usage, and regional rendering policies.

---

### Cross-Cutting Architectural Characteristics

Some characteristics apply across all layers of a system.

Common examples include:
- **Accessibility** – inclusive access for users with disabilities
- **Archivability** – data retention and deletion constraints
- **Authenticity** – verifying user identity
- **Authorization** – access control at various levels
- **Legal** – regulatory constraints
- **Privacy** – protection of sensitive data
- **Security** – encryption and secure communication
- **Supportability** – operational support requirements
- **Usability / Achievability** – effort required for users to achieve goals

These concerns often interact with both domain behavior and system structure.

<ImagePlaceholder title="characteristics spanning all layers" chapter="4"></ImagePlaceholder>

---

## Trade-offs and Ambiguity

Architectural characteristics introduce unavoidable trade-offs.

Several observations consistently appear:

- Supporting a characteristic is rarely free
- Characteristics interact and influence one another
- Improving one often degrades another
- Definitions vary across organizations

Because there are no universal definitions, ambiguity is common. Clear, shared understanding gives architectural decisions shape and intent.

<QuoteBlock>
“Never shoot for the best architecture, but rather for the least worst one.”
</QuoteBlock>

Attempting to maximize all characteristics simultaneously is unrealistic. Architecture becomes a balancing act among competing concerns.

---

## Iteration Over Perfection

Given uncertainty and evolving requirements, architectures benefit from being **easy to change**.

An iterative approach reduces the pressure to get everything right upfront and aligns with lessons from agile development. This principle applies not just to code, but to structure itself.

Architectural characteristics guide direction—not finality.

---

## Closing Perspective

Architectural characteristics represent the silent constraints that shape every system.

They explain:
- Why systems look the way they do
- Why certain decisions persist
- Why trade-offs are unavoidable

In frontend architecture, clarity around these characteristics often makes the difference between a system that evolves—and one that resists change.
