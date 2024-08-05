import { type Provider } from "../types/content";
import { GithubProvider } from "../providers/github";
import { FileSystemProvider } from "../providers";

export const loadContent = async (uri: string, providerArg?: Provider, root?: string) => {
    if (providerArg) {
        const content = await providerArg.load(uri);
        return content;
    }
    if (uri.startsWith("https://github.com/")) {
        const provider = new GithubProvider(uri);
        if (provider.pathname) {
            const content = await provider.load(provider.pathname);
            return content;
        } else {
            throw new Error("Can not load content");
        }
    }
    if (uri.match(/https?:\/\//)) {
        const resp = await fetch(uri);
        if (!resp.ok) {
            throw new Error("Can not load content");
        }
        const content = await resp.text();
        return content;
    }

    const provider = new FileSystemProvider(root);
    const content = await provider.load(uri);
    return content;
};
