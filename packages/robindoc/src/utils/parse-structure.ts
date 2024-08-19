import { type Pages, type Configuration, type DocItem } from "../types/structure";
import { type LinkItem } from "../components/sidebar";
import { getConfiguration } from "./get-configuration";
import { getMeta } from "./get-meta";

export const parseStructure = async (
    items: DocItem[] | "auto",
    parentConfiguration: Configuration = {},
    prefix = "",
) => {
    const pages: Pages = {};
    const tree: LinkItem[] = [];

    if (items === "auto") {
        if (parentConfiguration.provider) {
            const generatedTree = await parentConfiguration.provider.treePromise;

            for await (const generatedItem of generatedTree) {
                if (
                    (!prefix && generatedItem.clientPath !== "/") ||
                    (prefix && !generatedItem.clientPath.match(new RegExp(`^${prefix.replace(/\/$/, "")}/[^/]+$`)))
                ) {
                    continue;
                }

                const { clientPath } = generatedItem;
                const fullUri = (parentConfiguration.basePath || "") + clientPath;
                const fullUriClean = fullUri.replace(/(.+)\/$/, "$1");

                const subItemsData = await parseStructure(
                    "auto",
                    parentConfiguration,
                    prefix.replace(/\/$/, "") + generatedItem.clientPath,
                );
                Object.assign(pages, subItemsData.pages);

                const pseudoTitle = clientPath.substring(1) || "index";
                const meta = await getMeta({ provider: parentConfiguration.provider, uri: clientPath });

                pages[fullUriClean] = {
                    title: meta.title || pseudoTitle,
                    uri: clientPath,
                    configuration: parentConfiguration,
                };

                tree.push({
                    title: meta.title || pseudoTitle,
                    href: fullUriClean,
                    items: subItemsData.tree,
                    type: "row",
                });
            }
        }
    } else {
        for await (const item of items) {
            const configuration = getConfiguration(item, parentConfiguration);
            const sourceHref = item.href;
            const pathname = sourceHref && configuration.basePath ? configuration.basePath + sourceHref : sourceHref;
            if (sourceHref) {
                pages[pathname!.replace(/\/$/, "") || "/"] = {
                    title: item.title || "",
                    uri: sourceHref,
                    configuration,
                };
            }

            let subTree: LinkItem[] = [];
            if (item.items) {
                const subItemsData = await parseStructure(item.items, configuration);
                subTree = subItemsData.tree;
                Object.assign(pages, subItemsData.pages);
            }

            if (!item.hidden) {
                tree.push({
                    title: item.title || "",
                    href: pathname,
                    items: subTree,
                    type: item.type,
                });
            }
        }
    }

    return { pages, tree };
};
