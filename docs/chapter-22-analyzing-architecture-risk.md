# Chapter 22 — Analyzing Architecture Risk

## Why This Chapter Exists
Architectures rarely fail all at once. They decay: small structural deficiencies accumulate until change becomes slow, failures become frequent, or nonfunctional expectations are missed. Analyzing architectural risk is one of the architect’s most important ongoing activities because it exposes where the architecture is most likely to break—and where corrective action has the highest leverage.

This chapter frames risk analysis as a repeatable, collaborative practice that turns subjective concerns into an objective, negotiable view of risk.

---

## What “Risk” Means in Architecture

Architectural risk becomes actionable when it is evaluated using two dimensions:

- **Impact**: how bad it is if the risk materializes
- **Likelihood**: how likely it is to occur

A simple way to move from subjective to objective is a scoring matrix:
- give each dimension a numeric rating
- compute a composite score
- treat uncertainty conservatively

When likelihood is unknown, treat it as high until proven otherwise.

<ImagePlaceholder title="3x3 impact/likelihood matrix with risk levels" chapter="22"></ImagePlaceholder>

---

## Risk Scoring (Simple and Operable)

A practical scoring approach:

- impact: 1–3
- likelihood: 1–3
- **risk score = impact × likelihood**

Interpretation:
- **high risk**: score ≥ 6
- **medium risk**: score ≥ 3
- **low risk**: below medium threshold

This does not make risk “true,” but it makes risk comparable across concerns.

<ImagePlaceholder title="impact(1–3) × likelihood(1–3) with thresholds" chapter="22"></ImagePlaceholder>

---

## Risk Is Assessed Against What You Actually Care About

Not every risk matters equally. A performance risk might be irrelevant if the critical success characteristics are scalability, elasticity, and data integrity—unless performance is a dependency of those goals.

To avoid analyzing irrelevant risks, teams define a **risk criteria table**:
- list the domain concerns and architectural characteristics that matter
- assess and summarize risk for each
- focus mitigation on what affects success criteria

This creates alignment:
- what risks are tracked
- why they matter
- where mitigation investment is justified

<ImagePlaceholder title="rows: characteristics/domain concerns; columns: impact/likelihood/score/notes" chapter="22"></ImagePlaceholder>

---

## Scope Matters: Risk per Characteristic, per Quantum

Modern systems often contain multiple architecture quanta (independently deployable units with scoped characteristics). Risk analysis becomes more precise when scoped:
- per architectural characteristic
- per quantum (not only system-wide)

Example framing:
- “availability risk in the checkout quantum”
- “data integrity risk in the billing quantum”
- “deployability risk in the admin UI quantum”

This avoids a vague “the system is risky” conclusion and replaces it with actionable targeting.

<ImagePlaceholder title="quanta mapped to characteristic risks" chapter="22"></ImagePlaceholder>

---

## Risk Storming: A Collaborative Risk Practice

No architect can accurately determine overall system risk alone. Risk storming formalizes risk analysis as a collaborative exercise, typically involving:
- architects
- senior developers
- tech leads (often the people closest to failure modes in code and operations)

Risk storming is used to assess architectural risk within a specific dimension:
- context (e.g., planned migration)
- criteria (e.g., resilience)
- or a characteristic (e.g., scalability)

A strong practice is to run focused storming sessions:
- ideally one session per architectural characteristic (or per major characteristic group)

---

## Risk Storming Phases

### 1) Identification
Each participant independently identifies risk areas:
- encourages unbiased input
- avoids anchoring on the architect’s perspective
- surfaces hidden risks known to implementers

### 2) Consensus
The group collaborates to:
- discuss evidence and assumptions
- agree on impact and likelihood ratings
- converge on risk levels

Consensus does not require perfection; it requires shared understanding.

### 3) Mitigation
Once risk levels are agreed, the team considers mitigation:
- changing architecture aspects (structure, contracts, coupling, deployment model)
- adding governance/fitness functions
- scoping work as technical tasks or architectural refactors
- making trade-offs explicit to stakeholders

Mitigation often becomes negotiation:
- cost vs benefit
- near-term delivery vs long-term sustainability
- risk acceptance vs risk reduction

Risk storming supports that negotiation by making the decision surface explicit.

<ImagePlaceholder title="identification → consensus → mitigation loop" chapter="22"></ImagePlaceholder>

---

## Risk Storming Is Not One-Time

Risk storming is not an upfront ceremony. It continues throughout the system lifecycle:
- as code grows
- as teams change
- as requirements shift
- before risks appear in production

Ongoing risk analysis is essentially maintenance of architectural viability.

---

## Story-Level Risk (Iteration Risk)

The same matrix can be applied to user stories inside iterations:

- **impact**: how bad it is if the story is not completed in the iteration
- **likelihood**: probability the story will not be completed this iteration

This extends risk storming from architecture shape to delivery reality.

<ImagePlaceholder title="impact vs likelihood for iteration completion" chapter="22"></ImagePlaceholder>

---

## Unknown Technology Is High Risk by Default

Unproven or unfamiliar technologies are high risk until validated because:
- likelihood is unknown
- failure modes are unclear
- operational support may be immature

This is not a rejection of innovation; it is a recognition that novelty requires validation:
- proof of concept
- limited rollout
- measurable acceptance criteria

---

## Frontend Context (React / Next.js Lens)

<FrontendSection
  lead="Frontend architecture risk often clusters around:"
  bullets="[{&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;**performance vs responsiveness** (perceived UX vs end-to-end latency)&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;**deployability** (release frequency, rollback safety)&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;**contract volatility** (API changes, schema drift)&quot;}, {&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;**observability gaps** (client-side error tracking, tracing correlation)&quot;}, {&quot;icon&quot;: &quot;ChartLine&quot;, &quot;text&quot;: &quot;**coupling** (shared UI libraries becoming domain logic hubs)&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Risk storming is useful here because frontend risks are frequently cross-cutting:&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;a “backend” decision changes UI latency profiles&quot;}, {&quot;icon&quot;: &quot;Database&quot;, &quot;text&quot;: &quot;a “frontend” caching decision changes data integrity perception&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;a deployment constraint affects both&quot;}, {&quot;icon&quot;: &quot;Stack&quot;, &quot;text&quot;: &quot;Scoping risks by characteristic and by quantum keeps the discussion grounded:&quot;}, {&quot;icon&quot;: &quot;ShieldCheck&quot;, &quot;text&quot;: &quot;“availability risk in the public web UI”&quot;}, {&quot;icon&quot;: &quot;Gauge&quot;, &quot;text&quot;: &quot;“performance risk in SSR rendering”&quot;}, {&quot;icon&quot;: &quot;BracketsCurly&quot;, &quot;text&quot;: &quot;“contract risk in checkout orchestration”&quot;}]"
></FrontendSection>

## Closing Perspective
Architectural risk analysis turns “unease” into a decision-ready artifact:
- score risk using impact × likelihood
- anchor risk to characteristics that define success
- scope risk per quantum
- use risk storming to identify, align, and mitigate collaboratively

The goal is not zero risk. The goal is clarity: which risks matter most, why they matter, and what trade-offs the organization is choosing.
