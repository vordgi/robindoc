import { readFile } from "fs/promises";
import { type Provider } from "../types/content";
import { GithubProvider } from "../providers/github";

export const loadContent = async (uri: string, provider?: Provider) => {
    if (provider) {
        const content = await provider.load(uri);
        return content;
    }
    if (uri.startsWith("https://github.com/")) {
        const match = uri.match(
            /^https:\/\/github.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/blob\/(?<ref>[^/]+)\/(?<pathname>.+)$/,
        );
        if (!match?.groups) {
            throw new Error("Invalid URI");
        }
        const { owner, repo, ref, pathname } = match.groups;
        const provider = new GithubProvider({ owner, repo, ref });
        const content = await provider.load(pathname);
        return content;
    }
    if (uri.match(/https?:\/\//)) {
        const resp = await fetch(uri);
        if (!resp.ok) {
            throw new Error("Can not load content");
        }
        const content = await resp.text();
        return content;
    }
    const content = await readFile(uri, "utf-8");
    return content;
};
