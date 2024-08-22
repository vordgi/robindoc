import { type DocItem } from "../types/structure";
import { type Pages, type Crumbs, type Configuration } from "../types/content";
import { type LinkItem } from "../components/sidebar";
import { getConfiguration } from "./get-configuration";
import { getMeta } from "./get-meta";
import { generatePseudoTitle, normalizePathname } from "./path-tools";

const parseFileTreeStructure = async (parentConfiguration: Configuration = {}, prefix = "", crumbs: Crumbs = []) => {
    const pages: Pages = {};
    const tree: LinkItem[] = [];

    if (parentConfiguration.provider) {
        const branchFiles = await parentConfiguration.provider.filesPromise;

        for await (const generatedItem of branchFiles.docs) {
            if (
                (!prefix && generatedItem.clientPath !== "/") ||
                (prefix && !generatedItem.clientPath.match(new RegExp(`^${prefix.replace(/\/$/, "")}/[^/]+$`)))
            ) {
                continue;
            }

            const { clientPath } = generatedItem;
            const pathname = (parentConfiguration.basePath || "") + clientPath;
            const pathnameNormalized = normalizePathname(pathname);

            const meta = await getMeta({ provider: parentConfiguration.provider, uri: clientPath });
            const title = meta.title || generatePseudoTitle(pathnameNormalized);
            pages[pathnameNormalized] = {
                title,
                uri: clientPath,
                configuration: parentConfiguration,
                crumbs,
            };

            const subItemsData = await parseFileTreeStructure(
                parentConfiguration,
                prefix.replace(/\/$/, "") + generatedItem.clientPath,
                [...crumbs, pathnameNormalized],
            );
            Object.assign(pages, subItemsData.pages);

            tree.push({
                title,
                href: pathnameNormalized,
                items: subItemsData.tree,
                type: "row",
            });
        }
    }

    return { pages, tree };
};

const parseStaticStructure = async (items: DocItem[], parentConfiguration: Configuration = {}, crumbs: Crumbs = []) => {
    const pages: Pages = {};
    const tree: LinkItem[] = [];

    for await (const item of items) {
        let subCrumbs = crumbs;
        const configuration = getConfiguration(item, parentConfiguration);
        const sourceHref = item.href;
        const pathname = sourceHref && configuration.basePath ? configuration.basePath + sourceHref : sourceHref;
        const pathnameNormalized = normalizePathname(pathname);

        if (sourceHref) {
            pages[pathnameNormalized] = {
                title: item.title || "",
                uri: sourceHref,
                configuration,
                crumbs,
            };
            subCrumbs = [...crumbs, pathnameNormalized];
        }

        let subTree: LinkItem[] = [];
        if (item.items) {
            const subItemsData = await parseStructure(item.items, configuration, subCrumbs);
            subTree = subItemsData.tree;
            Object.assign(pages, subItemsData.pages);
        }

        if (!item.hidden) {
            tree.push({
                title: item.title || generatePseudoTitle(pathnameNormalized),
                href: pathnameNormalized,
                items: subTree,
                type: item.type,
            });
        }
    }

    return { pages, tree };
};

export const parseStructure = async (
    items: DocItem[] | "auto",
    parentConfiguration: Configuration = {},
    crumbs: Crumbs = [],
) => {
    if (items === "auto") {
        const structureData = await parseFileTreeStructure(parentConfiguration, "", crumbs);
        return structureData;
    }

    const structureData = await parseStaticStructure(items, parentConfiguration, crumbs);
    return structureData;
};
