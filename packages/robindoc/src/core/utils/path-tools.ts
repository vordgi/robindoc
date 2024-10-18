export const getFileUrl = (path: string) => {
    const [, filename, ext] = path.match(/(?:^|\/)([^/]+)(\.mdx?)$/) || [];

    const clientPath = path.replace(new RegExp(`((\/|^)(readme|README|index|${filename}/${filename}))?${ext}$`), "");

    return clientPath;
};

export const normalizePathname = (path?: string | null) => {
    if (!path) return "/";

    return path.replace(/\/$/, "") || "/";
};

export const generatePseudoTitle = (path?: string | null) => {
    const pathname = normalizePathname(path);
    const pathnameSegments = pathname.split("/").filter(Boolean);

    if (pathnameSegments.length === 0) return "Index";

    const lastSegment = pathnameSegments[pathnameSegments.length - 1];
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
