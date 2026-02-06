// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import QuoteBlock from './components/QuoteBlock.vue'
import TableBlock from './components/TableBlock.vue'
import ImagePlaceholder from './components/ImagePlaceholder.vue'
import ValueCard from './components/ValueCard.vue'
import FrontendSection from './components/FrontendSection.vue'
import StyleRatings from './components/StyleRatings.vue'
import ArchitectureHeatmap from './components/ArchitectureHeatmap.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('QuoteBlock', QuoteBlock)
    app.component('TableBlock', TableBlock)
    app.component('ImagePlaceholder', ImagePlaceholder)
    app.component('ValueCard', ValueCard)
    app.component('FrontendSection', FrontendSection)
    app.component('StyleRatings', StyleRatings)
    app.component('ArchitectureHeatmap', ArchitectureHeatmap)
  },
} satisfies Theme
