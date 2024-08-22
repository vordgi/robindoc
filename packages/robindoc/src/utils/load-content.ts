import { type BaseProvider } from "../providers/base";
import { GithubProvider } from "../providers/github";
import { FileSystemProvider } from "../providers";

export const loadContent = async (uri: string, providerArg?: BaseProvider, root?: string) => {
    if (providerArg) {
        const content = await providerArg.load(uri);
        return { data: content, type: providerArg.type, provider: providerArg };
    }
    if (uri.startsWith("https://github.com/")) {
        const provider = new GithubProvider(uri);
        if (provider.pathname) {
            const content = await provider.load(provider.pathname);
            return { data: content, type: "remote", provider };
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
        return { data: content, type: "remote", provider: null };
    }

    const provider = new FileSystemProvider(root);
    const content = await provider.load(uri);
    return { data: content, type: "local", provider };
};
