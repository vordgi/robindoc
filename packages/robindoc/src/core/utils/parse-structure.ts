import { type DocItem } from "../types/structure";
import { type Pages, type Crumbs, type Configuration } from "../types/content";
import { type TreeItem } from "../../components/elements/sidebar/types";
import { getConfiguration } from "./get-configuration";
import { getMeta } from "./get-meta";
import { generatePseudoTitle, checkIsLinkExternal, mergePathname, normalizePathname } from "./path-tools";
import { loadContent } from "./load-content";

const parseJSONStructure = async (
    parentConfiguration: Configuration = {},
    parentPathname = "",
    crumbs: Crumbs = [],
    nestingLevel: number,
) => {
    const pages: Pages = {};
    const tree: TreeItem[] = [];

    if (!parentConfiguration.provider) return { pages, tree };

    const branchFiles = await parentConfiguration.provider.filesPromise;

    if (branchFiles.structures.includes(`${parentPathname}/structure.json`)) {
        const content = await loadContent(`${parentPathname}/structure.json`, parentConfiguration.provider);
        try {
            const structure: { [segment: string]: { title: string } } = JSON.parse(content.data);
            for (const segment in structure) {
                const data = structure[segment];
                const clientPath = normalizePathname(
                    segment === "index" ? parentPathname : parentPathname + "/" + segment,
                );
                const pathname = mergePathname(parentConfiguration.basePath, clientPath);
                const pathnameNormalized = normalizePathname(pathname);

                if (!checkIsLinkExternal(pathnameNormalized)) {
                    const origPath = await parentConfiguration.provider?.getPageSourcePathname(
                        clientPath,
                        pathnameNormalized,
                    );
                    if (origPath) {
                        pages[pathnameNormalized] = {
                            title: data.title,
                            uri: clientPath,
                            configuration: parentConfiguration,
                            origPath,
                            crumbs,
                        };
                    }
                }

                let subTree: TreeItem[] | undefined;
                if (segment !== "index") {
                    const subItemsData = await parseAutoStructure(
                        parentConfiguration,
                        [...crumbs, pathnameNormalized],
                        clientPath,
                        nestingLevel + 1,
                    );
                    subTree = subItemsData.tree;
                    Object.assign(pages, subItemsData.pages);
                }

                tree.push({
                    title: data.title,
                    href: pathnameNormalized,
                    items: subTree,
                    type: "row",
                });
            }
        } catch {
            throw new Error(`Can't parse structure "${parentPathname}/structure.json"`);
        }
        return { pages, tree };
    }
};

const parseAutoStructure = async (
    parentConfiguration: Configuration = {},
    crumbs: Crumbs = [],
    parentPathname = "",
    nestingLevel: number,
) => {
    const pages: Pages = {};
    const tree: TreeItem[] = [];

    if (!parentConfiguration.provider) return { pages, tree };

    const branchFiles = await parentConfiguration.provider.filesPromise;

    if (branchFiles.structures.includes(`${parentPathname}/structure.json`)) {
        const jsonStructureData = await parseJSONStructure(
            parentConfiguration,
            parentPathname,
            crumbs,
            nestingLevel + 1,
        );
        if (jsonStructureData) {
            return jsonStructureData;
        }
    }

    for await (const generatedItem of branchFiles.docs) {
        const linkLevel = generatedItem.clientPath.split("/").filter(Boolean).length;
        const topLevelLink = linkLevel < 2;

        if (
            (!parentPathname && !topLevelLink) ||
            (parentPathname &&
                !generatedItem.clientPath.match(new RegExp(`^${parentPathname.replace(/\/$/, "")}/[^/]+$`)))
        ) {
            continue;
        }

        const { clientPath } = generatedItem;
        const pathname = mergePathname(parentConfiguration.basePath, clientPath);
        const pathnameNormalized = normalizePathname(pathname);

        const meta = await getMeta({ provider: parentConfiguration.provider, uri: clientPath });
        const title = meta.title || generatePseudoTitle(pathnameNormalized);
        const origPath = await parentConfiguration.provider?.getPageSourcePathname(clientPath, pathnameNormalized);
        if (origPath) {
            pages[pathnameNormalized] = {
                title,
                uri: clientPath,
                configuration: parentConfiguration,
                origPath,
                crumbs,
            };
        }

        const subItemsData = await parseAutoStructure(
            parentConfiguration,
            [...crumbs, pathnameNormalized],
            clientPath,
            nestingLevel + 1,
        );
        Object.assign(pages, subItemsData.pages);

        if (nestingLevel < (parentConfiguration.spreadedLevel || 1)) {
            tree.push(
                {
                    title,
                    href: pathnameNormalized,
                    type: nestingLevel === 0 ? "heading" : "row",
                },
                ...subItemsData.tree,
            );
        } else {
            tree.push({
                title,
                href: pathnameNormalized,
                items: subItemsData.tree,
                type: nestingLevel === 0 ? "heading" : "row",
            });
        }
    }

    return { pages, tree };
};

const parseStaticStructure = async (
    items: DocItem[],
    parentConfiguration: Configuration = {},
    crumbs: Crumbs = [],
    parentPathname: string,
    nestingLevel: number,
): Promise<{
    pages: Pages;
    tree: TreeItem[];
}> => {
    const pages: Pages = {};
    const tree: TreeItem[] = [];

    for await (const item of items) {
        if (typeof item === "string") {
            const subItemsData = await parseStructure(item, parentConfiguration, crumbs, parentPathname, nestingLevel);
            Object.assign(pages, subItemsData.pages);
            tree.push(...subItemsData.tree);
            continue;
        }
        if (item.type === "separator") {
            tree.push({ type: "separator" });

            continue;
        }
        let subCrumbs = crumbs;
        const configuration = getConfiguration(item.configuration || {}, parentConfiguration);
        const clientPath = item.href;
        const pathname = mergePathname(configuration.basePath, clientPath);
        const pathnameNormalized = normalizePathname(pathname);

        if (!checkIsLinkExternal(pathnameNormalized) && clientPath) {
            const origPath = await configuration.provider?.getPageSourcePathname(clientPath, pathnameNormalized);

            if (origPath) {
                pages[pathnameNormalized] = {
                    title: item.title || "",
                    uri: clientPath,
                    configuration,
                    origPath,
                    crumbs,
                };
                subCrumbs = [...crumbs, pathnameNormalized];
            }
        }

        let subTree: TreeItem[] = [];
        if (item.items) {
            const subItemsData = await parseStructure(
                item.items,
                configuration,
                subCrumbs,
                item.href,
                nestingLevel + 1,
            );
            subTree = subItemsData.tree;
            Object.assign(pages, subItemsData.pages);
        }

        if (!item.hidden) {
            if (nestingLevel < (parentConfiguration.spreadedLevel || 1)) {
                tree.push(
                    {
                        title: item.title || generatePseudoTitle(pathnameNormalized),
                        href: item.href ? pathnameNormalized : undefined,
                        type: item.type,
                    },
                    ...subTree,
                );
            } else {
                tree.push({
                    title: item.title || generatePseudoTitle(pathnameNormalized),
                    href: item.href ? pathnameNormalized : undefined,
                    items: subTree,
                    type: item.type,
                });
            }
        }
    }

    return { pages, tree };
};

export const parseStructure = async (
    items: DocItem[] | "auto",
    parentConfiguration: Configuration = {},
    crumbs: Crumbs = [],
    pathname: string = "",
    nestingLevel: number = 0,
) => {
    if (items === "auto") {
        const structureData = await parseAutoStructure(parentConfiguration, crumbs, pathname, nestingLevel);
        return structureData;
    }

    const structureData = await parseStaticStructure(items, parentConfiguration, crumbs, pathname, nestingLevel);
    return structureData;
};
