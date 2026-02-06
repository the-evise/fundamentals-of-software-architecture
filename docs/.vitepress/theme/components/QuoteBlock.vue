<template>
  <figure class="quote-block">
    <blockquote class="quote-block__text" v-html="rendered"></blockquote>
    <figcaption v-if="cite" class="quote-block__cite">-- {{ cite }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  cite?: string
}>()

const slots = useSlots()
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

const rendered = computed(() => {
  const content = slots.default?.() ?? []
  const text = content
    .map((node) => {
      if (typeof node.children === 'string') return node.children
      if (Array.isArray(node.children)) {
        return node.children.map((child) => (typeof child === 'string' ? child : '')).join('')
      }
      return ''
    })
    .join('')
    .trim()
  return md.render(text)
})
</script>
