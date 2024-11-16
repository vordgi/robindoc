export const getFileUrl = (pathname: string) => {
    const [, filename, ext] = pathname.match(/(?:^|\/)([^/]+)(\.mdx?)$/) || [];

    const clientPath = pathname.replace(
        new RegExp(`((\/|^)(readme|README|index|${filename}/${filename}))?${ext}$`),
        "",
    );

    return clientPath;
};

export const normalizePathname = (pathname?: string | null) => {
    if (!pathname) return "/";

    return pathname.replace(/\/$/, "") || "/";
};

export const removeTrailingSlash = (pathname?: string | null) => {
    if (!pathname) return "";

    return pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;
};

export const addTrailingSlash = (pathname?: string | null) => {
    if (!pathname) return "";

    return pathname.endsWith("/") ? pathname : pathname + "/";
};

export const generatePseudoTitle = (pathname?: string | null) => {
    const pathnamename = normalizePathname(pathname);
    const pathnamenameSegments = pathnamename.split("/").filter(Boolean);

    if (pathnamenameSegments.length === 0) return "Index";

    const lastSegment = pathnamenameSegments[pathnamenameSegments.length - 1];
    const lastSegmentWords = lastSegment.split("-");
    return lastSegmentWords.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
};

export const checkIsLinkExternal = (href: string) => {
    const url = new URL(href, "http://r");
    return url.host !== "r";
};

export const mergePathname = (basePath?: string, href?: string) => {
    return !href || checkIsLinkExternal(href) ? href : (basePath || "") + href;
};
