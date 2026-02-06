import { defineConfig } from 'vitepress'

export default defineConfig({
  // Site metadata
  title: 'Software Architecture',
  description: "High-level reference for frontend developers based on Neal Ford's book, focusing on architecture principles, trade-offs, and decision-making.",

  // Theme configuration
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Style Comparison', link: '/style-comparison' },
      {
        text: 'Chapters',
        items: [
          { text: 'Chapter 1: Introduction', link: '/chapter-1-introduction' },
          { text: 'Chapter 2: Architectural Thinking', link: '/chapter-2-architectural-thinking' },
          { text: 'Chapter 3: Modularity', link: '/chapter-3-modularity' },
          { text: 'Chapter 4: Architectural Characteristics Defined', link: '/chapter-4-architecture-characteristics' },
          { text: 'Chapter 5: Identifying Architectural Characteristics', link: '/chapter-5-identifying-architectural-characteristics' },
          { text: 'Chapter 6: Measuring and Governing Architectural Characteristics', link: '/chapter-6-measuring-governing-architectural-characteristics' },
          { text: 'Chapter 7: Scope of Architectural Characteristics', link: '/chapter-7-scope-of-architecture-characteristics' },
          { text: 'Chapter 8: Component-Based Thinking', link: '/chapter-8-component-based-thinking' },
          { text: 'Chapter 9: Foundations', link: '/chapter-9-foundations' },
          { text: 'Chapter 10: Layered Architecture Style', link: '/chapter-10-layered-architecture-style' },
          { text: 'Chapter 11: Modular Monolith Architecture Style', link: '/chapter-11-modular-monolith-architecture-style' },
          { text: 'Chapter 12: Pipeline Architecture Style', link: '/chapter-12-pipeline-architecture-style' },
          { text: 'Chapter 13: Microkernel Architecture Style', link: '/chapter-13-microkernel-architecture-style' },
          { text: 'Chapter 14: Service-Based Architecture Style', link: '/chapter-14-service-based-architecture-style' },
          { text: 'Chapter 15: Event-Driven Architecture Style', link: '/chapter-15-event-driven-architecture-style' },
          { text: 'Chapter 16: Space-Based Architecture Style', link: '/chapter-16-space-based-architecture-style' },
          { text: 'Chapter 17: Orchestration-Driven Service-Oriented Architecture Style', link: '/chapter-17-orchestration-driven-service-oriented-architecture-style' },
          { text: 'Chapter 18: Microservices Architecture', link: '/chapter-18-microservices-architecture' },
          { text: 'Chapter 19: Choosing the Appropriate Architecture Style', link: '/chapter-19-choosing-the-appropriate-architecture-style' },
          { text: 'Chapter 20: Architectural Patterns', link: '/chapter-20-architectural-patterns' },
          { text: 'Chapter 21: Architecture Decisions', link: '/chapter-21-architecture-decisions' },
          { text: 'Chapter 22: Analyzing Architecture Risk', link: '/chapter-22-analyzing-architecture-risk' },
          { text: 'Chapter 23: Diagramming and Presenting Architecture', link: '/chapter-23-diagramming-presenting-architecture' },
          { text: 'Chapter 24: Making Teams Effective', link: '/chapter-24-making-teams-effective' },
          { text: 'Chapter 25: Negotiation and Leadership Skills', link: '/chapter-25-negotiation-leadership-skills' },
          { text: 'Chapter 26: Architectural Intersections', link: '/chapter-26-architectural-intersections' },
          { text: 'Chapter 27: The Laws of Software Architecture, Revisited', link: '/chapter-27-the-laws-software-architecture-revisited' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Chapters',
        items: [
          { text: 'Chapter 1: Introduction', link: '/chapter-1-introduction' },
          { text: 'Chapter 2: Architectural Thinking', link: '/chapter-2-architectural-thinking' },
          { text: 'Chapter 3: Modularity', link: '/chapter-3-modularity' },
          { text: 'Chapter 4: Architectural Characteristics Defined', link: '/chapter-4-architecture-characteristics' },
          { text: 'Chapter 5: Identifying Architectural Characteristics', link: '/chapter-5-identifying-architectural-characteristics' },
          { text: 'Chapter 6: Measuring and Governing Architectural Characteristics', link: '/chapter-6-measuring-governing-architectural-characteristics' },
          { text: 'Chapter 7: Scope of Architectural Characteristics', link: '/chapter-7-scope-of-architecture-characteristics' },
          { text: 'Chapter 8: Component-Based Thinking', link: '/chapter-8-component-based-thinking' },
          { text: 'Chapter 9: Foundations', link: '/chapter-9-foundations' },
          { text: 'Chapter 10: Layered Architecture Style', link: '/chapter-10-layered-architecture-style' },
          { text: 'Chapter 11: Modular Monolith Architecture Style', link: '/chapter-11-modular-monolith-architecture-style' },
          { text: 'Chapter 12: Pipeline Architecture Style', link: '/chapter-12-pipeline-architecture-style' },
          { text: 'Chapter 13: Microkernel Architecture Style', link: '/chapter-13-microkernel-architecture-style' },
          { text: 'Chapter 14: Service-Based Architecture Style', link: '/chapter-14-service-based-architecture-style' },
          { text: 'Chapter 15: Event-Driven Architecture Style', link: '/chapter-15-event-driven-architecture-style' },
          { text: 'Chapter 16: Space-Based Architecture Style', link: '/chapter-16-space-based-architecture-style' },
          { text: 'Chapter 17: Orchestration-Driven Service-Oriented Architecture Style', link: '/chapter-17-orchestration-driven-service-oriented-architecture-style' },
          { text: 'Chapter 18: Microservices Architecture', link: '/chapter-18-microservices-architecture' },
          { text: 'Chapter 19: Choosing the Appropriate Architecture Style', link: '/chapter-19-choosing-the-appropriate-architecture-style' },
          { text: 'Chapter 20: Architectural Patterns', link: '/chapter-20-architectural-patterns' },
          { text: 'Chapter 21: Architecture Decisions', link: '/chapter-21-architecture-decisions' },
          { text: 'Chapter 22: Analyzing Architecture Risk', link: '/chapter-22-analyzing-architecture-risk' },
          { text: 'Chapter 23: Diagramming and Presenting Architecture', link: '/chapter-23-diagramming-presenting-architecture' },
          { text: 'Chapter 24: Making Teams Effective', link: '/chapter-24-making-teams-effective' },
          { text: 'Chapter 25: Negotiation and Leadership Skills', link: '/chapter-25-negotiation-leadership-skills' },
          { text: 'Chapter 26: Architectural Intersections', link: '/chapter-26-architectural-intersections' },
          { text: 'Chapter 27: The Laws of Software Architecture, Revisited', link: '/chapter-27-the-laws-software-architecture-revisited' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/the-evise/fundamentals-of-software-architecture' },
    ],
  },

  // Optional appearance settings
  appearance: true,
})
