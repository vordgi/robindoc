import { type Pages, type Configuration, type DocItem, type Structure } from "../types/structure";
import { LinkItem } from "../components/sidebar";
import { getConfiguration } from "./get-configuration";

export const parseStructure = (item: DocItem | Structure, previousConfiguration: Configuration = {}) => {
    const pages: Pages = {};
    const tree: LinkItem[] = [];
    if (item.items) {
        for (const element of item.items) {
            const configuration = getConfiguration(element, previousConfiguration);
            const data = parseStructure(element, configuration);

            const sourceHref = element.href;
            const pathname = sourceHref && configuration.basePath ? configuration.basePath + sourceHref : sourceHref;
            if (sourceHref) {
                pages[pathname!.replace(/\/$/, "") || "/"] = {
                    title: element.title || "",
                    uri: sourceHref,
                    configuration,
                };
            }
            Object.assign(pages, data.pages);
            if (!element.hidden) {
                tree.push({
                    title: element.title || "",
                    href: pathname,
                    items: data.tree,
                    type: element.type,
                });
            }
        }
    }

    return { pages, tree };
};
