import React from "react";
import { type Structure } from "../types/structure";
import { parseStructure } from "./parse-structure";
import { getConfiguration } from "./get-configuration";
import { getMeta as getMetaBase } from "./get-meta";
import { Article as ArticleBase, type ArticleProps as ArticlePropsBase } from "../blocks/article";
import { Sidebar as SidebarBase, type SidebarProps as SidebarPropsBase } from "../blocks/sidebar";
import { normalizePathname } from "./path-tools";

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
    const pageDataPromise = loadStructure(structureTemplate).then((structure) =>
        parseStructure(structure.items || [], getConfiguration(structure.configuration || {})),
    );

    const Page: React.FC<PageProps> = async ({ pathname, ...props }) => {
        const { pages } = await pageDataPromise;
        const pathnameClean = normalizePathname(pathname);
        const pageData = pages[pathnameClean];

        if (!pageData) {
            throw new Error(`Can not find data for "${pathnameClean}". Please check structure`);
        }

        const paths = Object.keys(pages);
        const targetPageIndex = paths.indexOf(pathnameClean);
        const prevPagePathname = targetPageIndex > 0 && paths[targetPageIndex - 1];
        const nextPagePathname =
            targetPageIndex !== -1 && targetPageIndex < paths.length - 1 && paths[targetPageIndex + 1];
        const prev = prevPagePathname && { pathname: prevPagePathname, title: pages[prevPagePathname].title };
        const next = nextPagePathname && { pathname: nextPagePathname, title: pages[nextPagePathname].title };

        const breadcrumbs = pageData.crumbs.map((crumb) => ({ title: pages[crumb].title, pathname: crumb }));
        const clientPages = Object.entries(pages).reduce<{ clientPath: string; origPath: string }[]>(
            (acc, [clientPath, { origPath }]) => {
                if (origPath) acc.push({ clientPath, origPath });
                return acc;
            },
            [],
        );

        return (
            <ArticleBase
                pathname={pathnameClean}
                provider={pageData.configuration.provider}
                uri={pageData.uri}
                title={pageData.title}
                breadcrumbs={breadcrumbs}
                prev={prev || undefined}
                next={next || undefined}
                pages={clientPages}
                {...props}
            />
        );
    };

    const Sidebar: React.FC<SidebarProps> = async ({ pathname, link }) => {
        const { pages, tree } = await pageDataPromise;
        const pathnameClean = normalizePathname(pathname);
        const pageData = pages[pathnameClean];

        if (!pageData) {
            throw new Error(`Can not find data for "${pathnameClean}". Please check structure`);
        }

        return <SidebarBase pathname={pathnameClean} tree={tree} link={link} />;
    };

    const getPages = async (basePath?: string) => {
        const { pages } = await pageDataPromise;
        const pagesArr = Object.keys(pages);
        if (basePath) return pagesArr.filter((page) => page.startsWith(basePath));
        return pagesArr;
    };

    const getMeta = async (pathname: string) => {
        const { pages } = await pageDataPromise;
        const pathnameClean = normalizePathname(pathname);
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

    return { Page, Sidebar, getPages, getMeta };
};
