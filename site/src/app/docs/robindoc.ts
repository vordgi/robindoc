import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent, getPageData } = initializeRobindoc({
    configuration: {
        // sourceRoot: 'https://github.com/vordgi/robindoc/tree/main/docs',
        sourceRoot: '../docs',
        basePath: '/docs',
        gitToken: process.env.GIT_TOKEN,
        fetcher: (url, init) => fetch(url, {...init, cache: 'force-cache', next: { tags: ['docs'] }}),
    },
    items: [
        {
            title: 'Introduction',
            type: 'heading',
            href: '/',
            configuration: {
                // sourceRoot: 'https://github.com/vordgi/robindoc/tree/main/README.md',
                sourceRoot: '../README.md',
            }
        },
        "auto"
    ],
});
