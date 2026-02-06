<template>
  <div class="image-placeholder" role="img" :aria-label="title">
    <div class="image-placeholder__frame">
      <img
        v-if="src"
        class="image-placeholder__img"
        :src="src"
        :alt="title"
        @load="isLoaded = true"
        @error="isLoaded = false"
      />
      <div v-if="!src || !isLoaded" class="image-placeholder__title">
        {{ title }}
      </div>
      <div v-if="chapter" class="image-placeholder__chapter">
        CHAPTER {{ chapter }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  chapter?: string | number
  src?: string
}>()

const isLoaded = ref(false)

watch(
  () => props.src,
  () => {
    isLoaded.value = false
  }
)
</script>
