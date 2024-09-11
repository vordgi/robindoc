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

    if (pathname === "/") return "index";

    return pathname.substring(1);
};
