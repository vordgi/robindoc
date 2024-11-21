import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData, getPageInstruction } = initializeRobindoc({
    configuration: {
        gitToken: process.env.GIT_TOKEN,
        fetcher: (url, init) => fetch(url, { ...init, cache: "force-cache", next: { tags: ["docs"] } }),
    },
    items: [
        {
            title: "Introduction",
            type: "heading",
            href: "/",
            configuration: {
                sourceRoot: "https://github.com/vercel/next.js/blob/canary/contributing.md",
            },
        },
        {
            title: "Core",
            type: "heading",
            items: ["auto"],
            configuration: {
                basePath: "/core",
                sourceRoot: "https://github.com/vercel/next.js/tree/canary/contributing/core",
            },
        },
        {
            title: "Docs",
            type: "heading",
            items: ["auto"],
            configuration: {
                basePath: "/docs",
                sourceRoot: "https://github.com/vercel/next.js/tree/canary/contributing/docs",
            },
        },
        {
            title: "Examples",
            type: "heading",
            items: ["auto"],
            configuration: {
                basePath: "/examples",
                sourceRoot: "https://github.com/vercel/next.js/tree/canary/contributing/examples",
            },
        },
        {
            title: "Repository",
            type: "heading",
            items: ["auto"],
            configuration: {
                basePath: "/repository",
                sourceRoot: "https://github.com/vercel/next.js/tree/canary/contributing/repository",
            },
        },
    ],
});
