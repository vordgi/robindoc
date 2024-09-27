import { type TreeItem } from "./types";

export const checkIsTargetSection = (item: TreeItem, pathname?: string) => {
    if (!pathname) return false;

    if (item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "")) return true;

    if (item.items?.find((el) => checkIsTargetSection(el, pathname))) return true;

    return false;
};

export const checkIsTargetPathname = (itemHref?: string, pathname?: string) => {
    if (!pathname || !itemHref) return false;

    return pathname === new URL(itemHref, "http://r").pathname?.replace(/\/$/, "");
};
