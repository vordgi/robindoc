import React from "react";
import { type Structure } from "../types/structure";
import { parseStructure } from "./parse-structure";
import { getConfiguration } from "./get-configuration";
import { Document, type DocumentProps } from "../blocks/document";

type PageProps = Omit<Partial<DocumentProps>, "uri"> & {
    path: string;
};

export const initializeRobindoc = (structure: Structure) => {
    const { tree, pages } = parseStructure(structure, getConfiguration(structure));

    const Page: React.FC<PageProps> = async ({ path, ...props }) => {
        const pathname = path.replace(/\/$/, "") || "/";
        const pageData = pages[pathname];
        if (!pageData) {
            throw new Error(`Can not find data for "${pathname}". Please check structure`);
        }
        const content = await pageData.configuration.provider?.load(pageData.uri);

        return <Document pathname={pathname} links={tree} content={content || ""} {...props} />;
    };

    const getPages = async (basePath?: string) => {
        const pagesArr = Object.keys(pages);
        if (basePath) return pagesArr.filter((page) => page.startsWith(basePath));
        return pagesArr;
    };

    return { Page, getPages };
};
