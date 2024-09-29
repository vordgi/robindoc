import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent, getPageData } = initializeRobindoc(async () => ({
    configuration: {
        sourceRoot: '../docs',
        // sourceRoot: 'https://github.com/vordgi/robindoc/tree/main/docs',
        basePath: '/docs',
        // Shit happens
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
        "auto-spreaded"
    ],
    // items: "auto",
}));
