import React from "react";
import { type Structure } from "../types/structure";
import { parseStructure } from "./parse-structure";
import { getConfiguration } from "./get-configuration";
import { getMeta as getMetaBase } from "./get-meta";
import { Document, type DocumentProps } from "../blocks/document";

type PageProps = Omit<Partial<DocumentProps>, "uri" | "content" | "provider" | "pathname"> & {
    pathname: string;
};

export const initializeRobindoc = (structure: Structure) => {
    const { tree, pages } = parseStructure(structure, getConfiguration(structure));

    const Page: React.FC<PageProps> = async ({ pathname, ...props }) => {
        const pathnameClean = pathname.replace(/\/$/, "") || "/";
        const pageData = pages[pathnameClean];
        if (!pageData) {
            throw new Error(`Can not find data for "${pathnameClean}". Please check structure`);
        }

        return (
            <Document
                pathname={pathnameClean}
                links={tree}
                provider={pageData.configuration.provider}
                uri={pageData.uri}
                {...props}
            />
        );
    };

    const getPages = async (basePath?: string) => {
        const pagesArr = Object.keys(pages);
        if (basePath) return pagesArr.filter((page) => page.startsWith(basePath));
        return pagesArr;
    };

    const getMeta = async (pathname: string) => {
        const pathnameClean = pathname.replace(/\/$/, "") || "/";
        const pageData = pages[pathnameClean];
        if (!pageData) {
            throw new Error(`Can not find data for "${pathnameClean}". Please check structure`);
        }
        const meta = await getMetaBase({
            uri: pageData.uri,
            provider: pageData.configuration.provider,
        });
        return meta;
    };

    return { Page, getPages, getMeta };
};
