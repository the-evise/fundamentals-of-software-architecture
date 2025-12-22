import { defineConfig } from 'vitepress'

export default defineConfig({
    // Site metadata
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
                    { text: 'Chapter 2: Architecture Definitions', link: '/chapter-2-architecture-definitions' },
                    { text: 'Chapter 3: Laws of Software Architecture', link: '/chapter-3-laws' },
                    { text: 'Chapter 4: Core Responsibilities', link: '/chapter-4-core-responsibilities' },
                    { text: 'Chapter 5: Frontend Context', link: '/chapter-5-frontend-context' },
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
