<template>
  <div class="value-card">
    <div class="value-card__icon" aria-hidden="true">
      <component :is="iconComponent" weight="fill" />
    </div>
    <div class="value-card__title">{{ title }}</div>
    <div v-if="details" class="value-card__details">{{ details }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PhCompass, PhRobot, PhShareNetwork } from '@phosphor-icons/vue'

const props = defineProps<{
  icon: 'compass' | 'share-network' | 'robot'
  title: string
  details?: string
}>()

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'share-network':
      return PhShareNetwork
    case 'robot':
      return PhRobot
    case 'compass':
    default:
      return PhCompass
  }
})
</script>
