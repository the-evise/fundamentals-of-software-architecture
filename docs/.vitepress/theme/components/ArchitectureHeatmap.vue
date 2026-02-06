<template>
  <section class="heatmap">
    <header class="heatmap__header">
      <div class="heatmap__title">Architecture Style Heatmap</div>
      <div class="heatmap__subtitle">Y-axis: styles. X-axis: metrics. Ratings 1–5.</div>
    </header>

    <div class="heatmap__table-wrap">
      <table class="heatmap__table">
        <thead>
          <tr>
            <th class="heatmap__axis heatmap__axis--y" rowspan="2">Architecture Style (Y)</th>
            <th
              v-for="group in costStructuralGroups"
              :key="group.key"
              class="heatmap__group-header"
              :class="`heatmap__group-header--${group.key}`"
              :colspan="group.columns.length"
            >
              {{ group.label }}
            </th>
          </tr>
          <tr>
            <th
              v-for="col in costStructuralColumns"
              :key="col.key"
              class="heatmap__col-header"
              :class="`heatmap__col-header--${col.groupKey}`"
              :title="col.groupLabel"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <th class="heatmap__row-header">{{ row.name }}</th>
            <td
              v-for="col in costStructuralColumns"
              :key="`${row.name}-${col.key}`"
              class="heatmap__cell"
              :class="`heatmap__cell--${col.groupKey}`"
              :style="{ backgroundColor: colorFor(col.groupKey, row.values[col.key]?.value) }"
              :title="row.values[col.key]?.explanation || ''"
            >
              {{ formatValue(row.values[col.key]?.value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="heatmap__table-wrap">
      <table class="heatmap__table">
        <thead>
          <tr>
            <th class="heatmap__axis heatmap__axis--y" rowspan="2">Architecture Style (Y)</th>
            <th
              v-for="group in engineeringGroups"
              :key="group.key"
              class="heatmap__group-header"
              :class="`heatmap__group-header--${group.key}`"
              :colspan="group.columns.length"
            >
              {{ group.label }}
            </th>
          </tr>
          <tr>
            <th
              v-for="col in engineeringColumns"
              :key="col.key"
              class="heatmap__col-header"
              :class="`heatmap__col-header--${col.groupKey}`"
              :title="col.groupLabel"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <th class="heatmap__row-header">{{ row.name }}</th>
            <td
              v-for="col in engineeringColumns"
              :key="`${row.name}-${col.key}`"
              class="heatmap__cell"
              :class="`heatmap__cell--${col.groupKey}`"
              :style="{ backgroundColor: colorFor(col.groupKey, row.values[col.key]?.value) }"
              :title="row.values[col.key]?.explanation || ''"
            >
              {{ formatValue(row.values[col.key]?.value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="heatmap__table-wrap">
      <table class="heatmap__table">
        <thead>
          <tr>
            <th class="heatmap__axis heatmap__axis--y" rowspan="2">Architecture Style (Y)</th>
            <th
              v-for="group in operationalGroups"
              :key="group.key"
              class="heatmap__group-header"
              :class="`heatmap__group-header--${group.key}`"
              :colspan="group.columns.length"
            >
              {{ group.label }}
            </th>
          </tr>
          <tr>
            <th
              v-for="col in operationalColumns"
              :key="col.key"
              class="heatmap__col-header"
              :class="`heatmap__col-header--${col.groupKey}`"
              :title="col.groupLabel"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <th class="heatmap__row-header">{{ row.name }}</th>
            <td
              v-for="col in operationalColumns"
              :key="`${row.name}-${col.key}`"
              class="heatmap__cell"
              :class="`heatmap__cell--${col.groupKey}`"
              :style="{ backgroundColor: colorFor(col.groupKey, row.values[col.key]?.value) }"
              :title="row.values[col.key]?.explanation || ''"
            >
              {{ formatValue(row.values[col.key]?.value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import data from '../../../../architecture-styles.json'

type RatingEntry = { value: number | string | null; explanation?: string }
type StyleEntry = {
  'Architecture Style': string
  Cost?: RatingEntry
  'Overall Cost'?: RatingEntry
  structural?: Record<string, RatingEntry>
  engineering?: Record<string, RatingEntry>
  operational?: Record<string, RatingEntry>
}

const entries = data as StyleEntry[]

const groupOrder = {
  costStructural: [
    { key: 'cost', label: '' },
    { key: 'structural', label: 'Structural' },
  ],
  engineering: [{ key: 'engineering', label: 'Engineering' }],
  operational: [{ key: 'operational', label: 'Operational' }],
} as const

const buildGroups = (order: Array<{ key: string; label: string }>) => {
  const groupMap: Record<string, { key: string; label: string; columns: string[] }> = {}
  order.forEach((group) => {
    groupMap[group.key] = { key: group.key, label: group.label, columns: [] }
  })

  if (groupMap.cost) {
    groupMap.cost.columns.push('$$$')
  }

  entries.forEach((entry) => {
    if (groupMap.structural) {
      Object.keys(entry.structural ?? {}).forEach((label) => {
        if (!groupMap.structural.columns.includes(label)) groupMap.structural.columns.push(label)
      })
    }
    if (groupMap.engineering) {
      Object.keys(entry.engineering ?? {}).forEach((label) => {
        if (!groupMap.engineering.columns.includes(label)) groupMap.engineering.columns.push(label)
      })
    }
    if (groupMap.operational) {
      Object.keys(entry.operational ?? {}).forEach((label) => {
        if (!groupMap.operational.columns.includes(label)) groupMap.operational.columns.push(label)
      })
    }
  })

  return order.map((group) => groupMap[group.key])
}

const costStructuralGroups = computed(() => buildGroups(groupOrder.costStructural))
const engineeringGroups = computed(() => buildGroups(groupOrder.engineering))
const operationalGroups = computed(() => buildGroups(groupOrder.operational))

const labelOverrides: Record<string, string> = {
  'Number of Quanta': 'Quanta',
}

const buildColumns = (groups: Array<{ key: string; label: string; columns: string[] }>) => {
  const items: Array<{ key: string; groupKey: string; groupLabel: string; label: string }> = []
  groups.forEach((group) => {
    group.columns.forEach((label) => {
      const displayLabel = labelOverrides[label] ?? label
      items.push({
        key: `${group.key}:${label}`,
        groupKey: group.key,
        groupLabel: group.label,
        label: displayLabel,
      })
    })
  })
  return items
}

const costStructuralColumns = computed(() => buildColumns(costStructuralGroups.value))
const engineeringColumns = computed(() => buildColumns(engineeringGroups.value))
const operationalColumns = computed(() => buildColumns(operationalGroups.value))

const rows = computed(() =>
  entries.map((entry) => {
    const values: Record<string, RatingEntry> = {}
    const costEntry = entry.Cost ?? entry['Overall Cost'] ?? { value: null }
    values['cost:$$$'] = costEntry
    Object.entries(entry.structural ?? {}).forEach(([label, value]) => {
      values[`structural:${label}`] = value
    })
    Object.entries(entry.engineering ?? {}).forEach(([label, value]) => {
      values[`engineering:${label}`] = value
    })
    Object.entries(entry.operational ?? {}).forEach(([label, value]) => {
      values[`operational:${label}`] = value
    })

    return { name: entry['Architecture Style'], values }
  })
)

const formatValue = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

const groupHue = (groupKey: string) => {
  switch (groupKey) {
    case 'structural':
      return '#78716c'
    case 'engineering':
      return '#3b82f6'
    case 'operational':
      return '#71717a'
    case 'cost':
      return '#f59e0b'
    default:
      return '#94a3b8'
  }
}

const colorFor = (groupKey: string, value: number | string | null | undefined) => {
  const n = Number(value)
  const base = groupHue(groupKey)
  if (!Number.isFinite(n)) return 'color-mix(in srgb, ' + base + ' 12%, white)'
  const clamped = Math.min(Math.max(Math.round(n), 1), 5)
  const strength = 12 + clamped * 12
  return `color-mix(in srgb, ${base} ${strength}%, white)`
}
</script>

<style scoped>
.heatmap {
  margin: 2rem 0;
}

.heatmap__header {
  text-align: center;
  margin-bottom: 1rem;
}

.heatmap__title {
  font-weight: 600;
  font-size: 1.3rem;
}

.heatmap__subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.heatmap__table-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 1.25rem;
}

.heatmap__table {
  display: table;
  overflow: visible;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 3px;
  min-width: 0;
}

:global(.VPDoc .heatmap__table) {
  display: table;
  overflow: visible;
}

.heatmap__axis,
.heatmap__group-header,
.heatmap__col-header,
.heatmap__row-header {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-2);
  padding: 0.35rem 0.3rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  line-height: 1.1;
}

.heatmap__axis--y {
  background: var(--vp-c-bg-soft);
  min-width: 120px;
}

.heatmap__row-header {
  background: var(--vp-c-bg);
  font-weight: 700;
  text-align: center;
  min-width: 120px;
  white-space: normal;
  word-break: break-word;
}

.heatmap__cell {
  text-align: center;
  padding: 0.3rem 0.2rem;
  border-radius: 8px;
  font-weight: 600;
  color: #0f172a;
  min-height: 28px;
}

@media (max-width: 960px) {
  .heatmap__table {
    min-width: 0;
  }
}

.heatmap__col-header {
  white-space: normal;
  word-break: break-word;
}

@media (max-width: 640px) {
  .heatmap__table-wrap {
    overflow-x: auto;
  }

  .heatmap__table {
    width: max-content;
    min-width: 780px;
  }
}

.heatmap__group-header--structural,
.heatmap__col-header--structural {
  background: color-mix(in srgb, #78716c 18%, var(--vp-c-bg) 82%);
}

.heatmap__group-header--engineering,
.heatmap__col-header--engineering {
  background: color-mix(in srgb, #3b82f6 18%, var(--vp-c-bg) 82%);
}

.heatmap__group-header--operational,
.heatmap__col-header--operational {
  background: color-mix(in srgb, #71717a 18%, var(--vp-c-bg) 82%);
}

.heatmap__group-header--cost,
.heatmap__col-header--cost {
  background: color-mix(in srgb, #f59e0b 18%, var(--vp-c-bg) 82%);
}

.heatmap__cell--structural,
.heatmap__cell--engineering,
.heatmap__cell--operational,
.heatmap__cell--cost {
  color: #0f172a;
}
</style>
