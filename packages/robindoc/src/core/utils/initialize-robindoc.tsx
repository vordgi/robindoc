import React from "react";

import { Article as ArticleBase, type ArticleProps as ArticlePropsBase } from "@src/components/elements/article";
import { Sidebar as SidebarBase, type SidebarProps as SidebarPropsBase } from "@src/components/elements/sidebar";

import { type Structure } from "../types/structure";
import { parseStructure } from "./parse-structure";
import { getConfiguration } from "./get-configuration";
import { getMetadata as getMetadataBase } from "./get-metadata";
import { normalizePathname, removeTrailingSlash } from "./path-tools";
import { loadContent } from "./load-content";

type PageProps = Omit<Partial<ArticlePropsBase>, "uri" | "content" | "provider" | "pathname" | "pages"> & {
    pathname: string;
};

type SidebarProps = Omit<SidebarPropsBase, "tree">;

const loadStructure = async (structureTemplate: Structure | (() => Structure | Promise<Structure>)) => {
    if (typeof structureTemplate === "function") {
        return structureTemplate();
    } else {
        return structureTemplate;
    }
};

export const initializeRobindoc = (structureTemplate: Structure | (() => Structure | Promise<Structure>)) => {
    const structureParsedPromise = loadStructure(structureTemplate).then((structure) =>
        parseStructure(structure.items || [], getConfiguration(structure.configuration || {})),
    );

    const Page: React.FC<PageProps> = async ({ pathname, ...props }) => {
        const { pages } = await structureParsedPromise;
        const pathnameNormalized = normalizePathname(pathname);
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            throw new Error(`Can not find data for "${pathnameNormalized}". Please check structure`);
        }

        const paths = Object.keys(pages);
        const targetPageIndex = paths.indexOf(pathnameNormalized);
        const prevPagePathname = paths[targetPageIndex - 1];
        const nextPagePathname = targetPageIndex < paths.length - 1 && paths[targetPageIndex + 1];
        const prev = prevPagePathname && { pathname: prevPagePathname, title: pages[prevPagePathname].title };
        const next = nextPagePathname && { pathname: nextPagePathname, title: pages[nextPagePathname].title };

        const breadcrumbs = pageInstruction.crumbs.map((crumb) => ({ title: pages[crumb].title, pathname: crumb }));
        const clientPages = Object.entries(pages).reduce<{ clientPath: string; origPath: string }[]>(
            (acc, [clientPath, { origPath }]) => {
                if (origPath) acc.push({ clientPath, origPath });
                return acc;
            },
            [],
        );

        return (
            <ArticleBase
                pathname={pathnameNormalized}
                provider={pageInstruction.configuration.provider}
                uri={pageInstruction.uri}
                title={pageInstruction.title}
                breadcrumbs={breadcrumbs}
                prev={prev || undefined}
                next={next || undefined}
                pages={clientPages}
                {...props}
            />
        );
    };

    const Sidebar: React.FC<SidebarProps> = async (props) => {
        const { tree } = await structureParsedPromise;

        return <SidebarBase tree={tree} {...props} />;
    };

    const getStaticParams = async <T extends string = "segments">(
        prefix: string = "",
        segmentsParamKey: T = "segments" as T,
    ) => {
        const { pages } = await structureParsedPromise;
        const pagesArr = Object.keys(pages);
        const prefixWithoutTrailingSlash = removeTrailingSlash(prefix);

        return pagesArr.reduce<Record<T, string[]>[]>((acc, cur) => {
            if (!cur.startsWith(prefixWithoutTrailingSlash)) return acc;

            acc.push({
                [segmentsParamKey]: cur.substring(prefixWithoutTrailingSlash.length + 1).split("/"),
            } as Record<T, string[]>);

            return acc;
        }, []);
    };

    const getMetadata = async (pathname: string) => {
        const { pages } = await structureParsedPromise;
        const pathnameNormalized = normalizePathname(pathname);
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            throw new Error(`Can not find data for "${pathnameNormalized}". Please check structure`);
        }

        const metadata = await getMetadataBase({
            uri: pageInstruction.uri,
            provider: pageInstruction.configuration.provider,
        });
        return metadata;
    };

    const getPageData = async (pathname: string) => {
        const { pages } = await structureParsedPromise;
        const pathnameNormalized = normalizePathname(pathname);
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            throw new Error(`Can not find data for "${pathnameNormalized}". Please check structure`);
        }

        const title = pageInstruction.title;
        const { data } = await loadContent(pageInstruction.uri, pageInstruction.configuration.provider);

        return { title, raw: data };
    };

    const getPageInstruction = async (pathname: string) => {
        const { pages } = await structureParsedPromise;
        const pathnameNormalized = normalizePathname(pathname);
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            throw new Error(`Can not find data for "${pathnameNormalized}". Please check structure`);
        }

        return pageInstruction;
    };

    return { Page, Sidebar, getStaticParams, getMetadata, getPageData, getPageInstruction };
};
