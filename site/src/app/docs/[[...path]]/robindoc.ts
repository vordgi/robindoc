import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent, getPageData } = initializeRobindoc(async () => ({
    configuration: {
        sourceRoot: '../docs',
        basePath: '/docs',
        gitToken: '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',
    },
    items: [
        {
            title: 'Introduction',
            type: 'heading',
            href: '/',
            configuration: {
                sourceRoot: '..',
            }
        },
        {
            title: 'Getting Started',
            type: 'heading',
            href: '/getting-started',
            items: [
                {
                    title: 'Installation',
                    href: '/getting-started/installation',
                },
                {
                    title: 'Writing MD',
                    href: '/getting-started/writing-md',
                },
                {
                    title: 'Initialization',
                    href: '/getting-started/initialization',
                },
                {
                    title: 'App Organization',
                    href: '/getting-started/app-organization',
                    items: [
                        {
                            title: 'Next.js Organization',
                            href: '/getting-started/app-organization/next-js',
                        },
                    ]
                },
            ]
        },
        {
            title: 'Structure',
            type: 'heading',
            href: '/structure',
            items: [
                {
                    title: 'Configuration',
                    href: '/structure/configuration',
                },
                {
                    title: 'Items',
                    href: '/structure/items',
                },
                {
                    title: 'Data Source',
                    href: '/structure/data-source',
                },
            ]
        },
        {
            title: 'Customization',
            type: 'heading',
            href: '/customization',
            items: [
                {
                    title: 'Elements',
                    href: '/customization/elements',
                    items: 'auto',
                },
                {
                    title: 'Tools',
                    href: '/customization/tools',
                    items: 'auto',
                },
                {
                    title: 'Search',
                    href: '/customization/search',
                },
            ]
        },
    ]
}));

// Introduction
// Getting started
//   installation
//   initialization
// Structure
//   Basics
//   Data source
// Elements
//   layout
//   main
//   page
//   sidebar
// Tools
//   getPages
//   getMetadata
// How it works
//   Markup
// App organization
//   next.js organization