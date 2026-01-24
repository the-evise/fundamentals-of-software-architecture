import { defineConfig } from 'vitepress'

export default defineConfig({
    // Site metadata
    base: '/fundamentals-of-software-architecture/',
    title: 'Fundamentals of Software Architecture',
    description: 'High-level reference for frontend developers based on Neal Ford’s book, focusing on architecture principles, trade-offs, and decision-making.',

    // Theme configuration
    themeConfig: {
        logo: '/images/logo.png', // optional
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Chapters', link: '/index' },
        ],
        sidebar: [
            {
                text: 'Chapters',
                items: [
                    { text: 'Introduction', link: '/index' },
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
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourusername/vitepress-architecture' }
        ]
    },

    // Optional appearance settings
    appearance: true, // supports light/dark mode
})
