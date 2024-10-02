import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent, getPageData } = initializeRobindoc(async () => ({
    configuration: {
        sourceRoot: 'https://github.com/vordgi/robindoc/tree/main/docs',
        // sourceRoot: '../docs',
        basePath: '/docs',
        gitToken: process.env.GIT_TOKEN,
    },
    items: [
        {
            title: 'Introduction',
            type: 'heading',
            href: '/',
            configuration: {
                sourceRoot: 'https://github.com/vordgi/robindoc/tree/main/README.md',
                // sourceRoot: '..',
            }
        },
        "auto-spreaded"
    ],
}));
