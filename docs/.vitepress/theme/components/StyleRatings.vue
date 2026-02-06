<template>
  <section class="style-ratings">
    <header class="style-ratings__header">
      <div class="style-ratings__eyebrow">Architecture Style</div>
      <div class="style-ratings__title">{{ styleName }}</div>
    </header>

    <div v-if="!styleEntry" class="style-ratings__empty">
      No ratings found for "{{ styleKey }}".
    </div>

    <div v-else class="style-ratings__grid">
      <article
        v-for="card in cards"
        :key="card.key"
        class="bento-card"
        :class="[
          `bento-card--${card.group}`,
          `bento-card--${card.size}`,
          { 'bento-card--text': card.display === 'text' },
        ]"
      >
        <div class="bento-card__label">{{ card.label }}</div>

        <div class="bento-card__rating">
          <div v-if="card.display === 'text' || !card.showAntennas" class="bento-card__value">
            {{ card.displayValue }}
          </div>
          <div v-if="card.showAntennas" class="bento-card__antennas" aria-hidden="true">
            <span
              v-for="index in 5"
              :key="index"
              class="bento-antenna"
              :class="{ 'is-on': index <= card.ratingValue }"
            ></span>
          </div>
        </div>

        <div v-if="card.explanation" class="bento-card__note">
          {{ card.explanation }}
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import stylesData from '../../../../architecture-styles.json'

type RatingEntry = {
  value: number | string | null
  explanation?: string
}

type StyleEntry = {
  'Architecture Style': string
  Cost?: RatingEntry
  'Overall Cost'?: RatingEntry
  structural?: Record<string, RatingEntry>
  engineering?: Record<string, RatingEntry>
  operational?: Record<string, RatingEntry>
}

const props = defineProps<{
  styleKey: string
}>()

const normalizeKey = (value: string | undefined | null) =>
  value?.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '') ?? ''

const styleEntry = computed<StyleEntry | undefined>(() => {
  const target = normalizeKey(props.styleKey)
  return (stylesData as StyleEntry[]).find(
    (entry) => normalizeKey(entry['Architecture Style']) === target
  )
})

const styleName = computed(() => styleEntry.value?.['Architecture Style'] ?? props.styleKey)

const getCost = (entry: StyleEntry | undefined): RatingEntry | undefined => {
  if (!entry) return undefined
  return entry.Cost ?? entry['Overall Cost']
}

const isNumericRating = (value: number | string | null) => {
  if (value === null || value === undefined || value === '') return false
  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric >= 0 && numeric <= 5
}

const formatValue = (value: number | string | null) => {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

const cards = computed(() => {
  if (!styleEntry.value) return []
  const entry = styleEntry.value
  const items: Array<{
    key: string
    label: string
    group: 'structural' | 'engineering' | 'operational' | 'neutral' | 'cost'
    size: 'sm' | 'md' | 'lg' | 'lg-compact'
    display: 'rating' | 'text'
    displayValue: string
    ratingValue: number
    showAntennas: boolean
    explanation: string
  }> = []

  const pushCard = (
    key: string,
    label: string,
    group: 'structural' | 'engineering' | 'operational' | 'neutral' | 'cost',
    size: 'sm' | 'md' | 'lg' | 'lg-compact',
    entryValue?: RatingEntry,
    display: 'rating' | 'text' = 'rating'
  ) => {
    const value = entryValue?.value ?? null
    const explanation = entryValue?.explanation?.trim() ?? ''
    const numeric = Number(value)
    const showAntennas = display === 'rating' && isNumericRating(value)
    items.push({
      key,
      label: label.toUpperCase(),
      group,
      size,
      display,
      displayValue: formatValue(value),
      ratingValue: Number.isFinite(numeric) ? numeric : 0,
      showAntennas,
      explanation,
    })
  }

  const structural = entry.structural ?? {}
  pushCard('partition-type', 'Partition Type', 'structural', 'md', structural['Partition Type'], 'text')
  const costEntry = getCost(entry)
  if (costEntry) {
    pushCard('cost', 'Cost', 'cost', 'md', costEntry)
  }
  pushCard('quanta', 'Number of Quanta', 'structural', 'sm', structural['Number of Quanta'], 'text')
  pushCard('simplicity', 'Simplicity', 'structural', 'md', structural['Simplicity'])
  pushCard('modularity', 'Modularity', 'structural', 'lg-compact', structural['Modularity'])

  const engineering = entry.engineering ?? {}
  pushCard('maintainability', 'Maintainability', 'engineering', 'md', engineering['Maintainability'])
  pushCard('testability', 'Testability', 'engineering', 'md', engineering['Testability'])
  pushCard('deployability', 'Deployability', 'engineering', 'lg', engineering['Deployability'])
  pushCard('evolvability', 'Evolvability', 'engineering', 'md', engineering['Evolvability'])

  const operational = entry.operational ?? {}
  pushCard('responsiveness', 'Responsiveness', 'operational', 'lg-compact', operational['Responsiveness'])
  pushCard('scalability', 'Scalability', 'operational', 'lg', operational['Scalability'])
  pushCard('elasticity', 'Elasticity', 'operational', 'md', operational['Elasticity'])
  pushCard('fault-tolerance', 'Fault Tolerance', 'operational', 'md', operational['Fault Tolerance'])

  return items
})
</script>

<style scoped>
.style-ratings {
  --bento-structural-bg: color-mix(in srgb, #78716c 18%, var(--vp-c-bg) 82%);
  --bento-structural-text: var(--vp-c-text-1);
  --bento-engineering-bg: color-mix(in srgb, #3b82f6 16%, var(--vp-c-bg) 84%);
  --bento-engineering-text: var(--vp-c-text-1);
  --bento-operational-bg: color-mix(in srgb, #71717a 20%, var(--vp-c-bg) 80%);
  --bento-operational-text: var(--vp-c-text-1);
  --bento-neutral-bg: color-mix(in srgb, #64748b 14%, var(--vp-c-bg) 86%);
  --bento-neutral-text: var(--vp-c-text-1);
  --bento-cost-bg: color-mix(in srgb, #f59e0b 22%, var(--vp-c-bg) 78%);
  --bento-cost-text: var(--vp-c-text-1);
  --bento-card-radius: 18px;
  margin: 1.75rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.style-ratings__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  align-items: center;
  text-align: center;
}

.style-ratings__eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.style-ratings__title {
  font-family: 'IBM Plex Serif', 'Times New Roman', Times, serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.style-ratings__empty {
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: var(--bento-card-radius);
  color: var(--vp-c-text-2);
}

.style-ratings__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.9rem;
  width: min(100%, 980px);
  max-width: 100%;
  margin: 0 auto;
  justify-content: stretch;
  grid-auto-flow: dense;
}

.bento-card {
  border-radius: var(--bento-card-radius);
  padding: 1rem 1.05rem 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-height: 120px;
  text-align: center;
  align-items: center;
}

.bento-card--sm {
  grid-column: span 4;
  min-height: 105px;
}

.bento-card--md {
  grid-column: span 4;
}

.bento-card--lg {
  grid-column: span 4;
  grid-row: span 2;
  min-height: 180px;
}

.bento-card--lg-compact {
  grid-column: span 4;
  grid-row: span 1;
  min-height: 150px;
}

.bento-card--structural {
  background: var(--bento-structural-bg);
  color: var(--bento-structural-text);
}

.bento-card--engineering {
  background: var(--bento-engineering-bg);
  color: var(--bento-engineering-text);
}

.bento-card--operational {
  background: var(--bento-operational-bg);
  color: var(--bento-operational-text);
}

.bento-card--neutral {
  background: var(--bento-neutral-bg);
  color: var(--bento-neutral-text);
}

.bento-card--cost {
  background: var(--bento-cost-bg);
  color: var(--bento-cost-text);
}

.bento-card__label {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.75;
}

.bento-card__rating {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.bento-card__value {
  font-size: 1.9rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.bento-card--text .bento-card__value {
  font-size: 1.35rem;
  font-weight: 600;
}

.bento-card__antennas {
  display: flex;
  gap: 0.35rem;
  align-items: flex-end;
}

.bento-antenna {
  width: 9px;
  height: 14px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.25;
  position: relative;
}

.bento-antenna:nth-child(2) {
  height: 18px;
}

.bento-antenna:nth-child(3) {
  height: 22px;
}

.bento-antenna:nth-child(4) {
  height: 26px;
}

.bento-antenna:nth-child(5) {
  height: 30px;
}

.bento-antenna.is-on {
  opacity: 0.95;
}

.bento-card__note {
  font-size: 0.75rem;
  line-height: 1.4;
  opacity: 0.75;
}

@media (max-width: 960px) {
  .style-ratings__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .bento-card--sm {
    grid-column: span 3;
  }

  .bento-card--md,
  .bento-card--lg,
  .bento-card--lg-compact {
    grid-column: span 3;
    min-height: 150px;
  }
}

@media (max-width: 640px) {
  .style-ratings__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bento-card--sm,
  .bento-card--md,
  .bento-card--lg,
  .bento-card--lg-compact {
    grid-column: span 2;
    min-height: 140px;
  }
}
</style>
