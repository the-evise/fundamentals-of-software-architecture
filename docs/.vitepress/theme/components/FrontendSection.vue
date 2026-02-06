<template>
  <section class="frontend-lens">
    <div class="frontend-lens__content">
      <div v-if="title" class="frontend-lens__badge">{{ title }}</div>
      <p v-if="lead" class="frontend-lens__lead" v-html="renderInline(lead)"></p>
      <ul v-if="normalizedBullets.length" class="frontend-lens__list">
        <li v-for="(item, index) in normalizedBullets" :key="index" class="frontend-lens__item">
          <span class="frontend-lens__icon">
            <component v-if="iconComponent(item)" :is="iconComponent(item)" size="18" weight="duotone" />
            <span v-else>{{ fallbackText(item) }}</span>
          </span>
          <span class="frontend-lens__text" v-html="renderInline(typeof item === 'string' ? item : item.text)"></span>
        </li>
      </ul>
    </div>
    <div class="frontend-lens__media">
      <ImagePlaceholder
        v-if="imageTitle && imageChapter"
        :title="imageTitle"
        :chapter="imageChapter"
        :src="imageSrc"
      ></ImagePlaceholder>
      <div v-else class="frontend-lens__placeholder" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import {
  PhArrowsClockwise,
  PhBracketsCurly,
  PhBroadcast,
  PhChartLine,
  PhCloud,
  PhDatabase,
  PhFlask,
  PhGauge,
  PhShieldCheck,
  PhStack,
  PhTimer,
  PhUsersThree,
  PhFlowArrow,
} from '@phosphor-icons/vue'
import ImagePlaceholder from './ImagePlaceholder.vue'

const props = defineProps<{
  title?: string
  lead?: string
  bullets?: Array<string | { icon?: string; text: string }> | string
  imageTitle?: string
  imageChapter?: string | number
  imageSrc?: string
}>()

const normalizedBullets = computed(() => {
  if (!props.bullets) return []
  if (Array.isArray(props.bullets)) return props.bullets
  try {
    const parsed = JSON.parse(props.bullets)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
})

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true,
})

const renderInline = (text: string) => md.renderInline(text)

const iconRegistry: Record<string, any> = {
  shieldcheck: PhShieldCheck,
  phshieldcheck: PhShieldCheck,
  gauge: PhGauge,
  phgauge: PhGauge,
  flask: PhFlask,
  phflask: PhFlask,
  arrowsclockwise: PhArrowsClockwise,
  pharrowsclockwise: PhArrowsClockwise,
  stack: PhStack,
  phstack: PhStack,
  bracketscurly: PhBracketsCurly,
  phbracketscurly: PhBracketsCurly,
  database: PhDatabase,
  phdatabase: PhDatabase,
  cloud: PhCloud,
  phcloud: PhCloud,
  broadcast: PhBroadcast,
  phbroadcast: PhBroadcast,
  usersthree: PhUsersThree,
  phusersthree: PhUsersThree,
  chartline: PhChartLine,
  phchartline: PhChartLine,
  timer: PhTimer,
  phtimer: PhTimer,
  flowarrow: PhFlowArrow,
  phflowarrow: PhFlowArrow,
}

const iconComponent = (item: string | { icon?: string; text: string }) => {
  if (typeof item === 'string') return null
  if (!item.icon) return null
  const key = item.icon.replace(/\s+/g, '').toLowerCase()
  return iconRegistry[key] ?? null
}

const fallbackText = (item: string | { icon?: string; text: string }) => {
  if (typeof item === 'string') return '*'
  if (item.icon && item.icon.trim().length) return item.icon
  const firstWord = item.text.split(' ')[0] || '*'
  return firstWord.slice(0, 3).toUpperCase()
}
</script>
