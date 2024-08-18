export const getFileUrl = (path: string) => {
    const [, filename, ext] = path.match(/(?:^|\/)([^/]+)(\.mdx?)$/) || [];

    const clientPath = path.replace(new RegExp(`((\/|^)(readme|README|index|${filename}/${filename}))?${ext}$`), "");

    return clientPath;
};
