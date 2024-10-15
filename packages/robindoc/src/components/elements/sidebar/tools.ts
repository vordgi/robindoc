import { type TreeItem } from "./types";

export const collectItems = (branch: TreeItem) => {
    const links: string[] = [];

    if (branch.href) links.push(branch.href);

    branch.items?.forEach((item) => {
        links.push(...collectItems(item));
    });

    return links;
};

export const isActiveItem = (branch: TreeItem): branch is TreeItem & { href: string } => Boolean(branch.href);

export const checkIsTargetPathname = (itemHref?: string, pathname?: string) => {
    if (typeof pathname !== "string" || typeof itemHref !== "string") return false;

    return pathname === new URL(itemHref, "http://r").pathname?.replace(/\/$/, "");
};
