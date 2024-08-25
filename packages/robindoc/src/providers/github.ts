import path from "path";

import { type BaseProvider } from "./base";
import { type BranchFiles, type Fetcher } from "../types/content";
import { extensionsMap } from "../data/contents";
import { getFileUrl, normalizePathname } from "../utils/path-tools";

export class GithubProvider implements BaseProvider {
    readonly type = "remote";

    rootUri: string;

    filesPromise: BaseProvider["filesPromise"];

    owner: string;

    repo: string;

    ref: string;

    token?: string;

    pathname: string;

    fetcher: Fetcher;

    constructor(rootUri: string, fetcher: Fetcher = fetch, token?: string) {
        this.rootUri = rootUri.replace(/\/$/, "");
        const groups = this.testUri(rootUri);

        if (!groups) {
            throw new Error(`Invalid URI: "${rootUri}"`);
        }

        const { owner, repo, ref = "main", pathname = "" } = groups;
        this.owner = owner;
        this.repo = repo;
        this.ref = ref;
        this.token = token;
        this.pathname = pathname;
        this.fetcher = fetcher;
        this.filesPromise = this.loadTree(pathname);
    }

    async getGitUri(uri: string) {
        const segments = [...(this.pathname?.split("/") || []), ...uri.split("/")].filter(Boolean);
        const fullUri = segments.join("/");
        let pathname;

        if (uri.endsWith(".md") || uri.endsWith(".mdx") || uri.endsWith(".json")) {
            pathname = fullUri;
        } else {
            const files = await this.filesPromise;
            const validFile = files.docs.find((file) => file.clientPath === uri);

            if (validFile) {
                pathname = this.pathname.replace(/^\/|\/$/, "") + validFile.origPath;
            } else {
                return null;
            }
        }

        return `https://github.com/${this.owner}/${this.repo}/blob/${this.ref}/${pathname}`;
    }

    async load(uri: string) {
        const segments = [...(this.pathname?.split("/") || []), ...uri.split("/")].filter(Boolean);
        const fullUri = segments.join("/");
        let pathname;

        if (uri.endsWith(".md") || uri.endsWith(".mdx") || uri.endsWith(".json")) {
            pathname = fullUri;
        } else {
            const files = await this.filesPromise;
            const validFile = files.docs.find((file) => file.clientPath === uri);

            if (validFile) {
                pathname = this.pathname.replace(/^\/|\/$/, "") + validFile.origPath;
            } else {
                throw new Error(
                    `Can not find md file at "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}/${fullUri}"`,
                );
            }
        }

        const url = new URL(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathname}`);
        const headers = new Headers();
        headers.set("Accept", "application/vnd.github.raw+json");

        url.searchParams.set("ref", this.ref);
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await this.fetcher(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error(
                `Can not load content from "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}/${fullUri}": ${resp.statusText}`,
            );
        }
        const content = await resp.text();
        return content;
    }

    private async loadTree(pathname?: string) {
        const pathnameClean = pathname?.replace(/^\//, "");
        const url = new URL(
            `https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${this.ref}?recursive=true`,
        );
        const headers = new Headers();
        headers.set("Accept", "application/vnd.github.raw+json");

        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await this.fetcher(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error("Can not load tree: " + resp.statusText);
        }
        const data = (await resp.json()) as { tree: { path: string }[] };

        const fileTree = data.tree.reduce<BranchFiles>(
            (acc, item) => {
                if (!pathnameClean || (pathnameClean && item.path.startsWith(pathnameClean))) {
                    const origPath = normalizePathname(item.path.substring(pathnameClean?.length || 0));

                    if (item.path.match(/\.(md|mdx)$/)) {
                        const clientFileUrl = getFileUrl(item.path);

                        acc.docs.push({
                            origPath,
                            clientPath: normalizePathname(clientFileUrl.substring(pathnameClean?.length || 0)),
                        });
                    } else if (item.path.endsWith(".json")) {
                        acc.structures.push(origPath);
                    }
                }
                return acc;
            },
            { docs: [], structures: [] },
        );
        this.filesPromise = fileTree;

        return fileTree;
    }

    private testUri(uri: string) {
        const match = uri.match(
            /^https:\/\/github.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\/(blob|tree)\/(?<ref>[^/]+)(?<pathname>\/.*)|\/)?$/,
        );
        const groups = match?.groups;
        return groups || null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getFileSrc(uri: string, href: string) {
        if (href.match(/https?:\/\//)) return href;

        const filePath = href.startsWith("/") ? href : uri.replace(/\/$/, "") + "/" + href;
        const url = new URL(`https://api.github.com/repos/${this.owner}/${this.repo}/contents${filePath}`);
        url.searchParams.set("ref", this.ref);

        const headers = new Headers();
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await this.fetcher(url.toString(), { headers });

        if (!resp.ok) {
            throw new Error("Can not load asset: " + resp.statusText);
        }

        const fileData = await resp.json();
        const srcUrl = new URL(fileData.download_url);

        if (srcUrl.searchParams.get("token")) {
            const { ext } = path.parse(filePath);
            return `data:${extensionsMap[ext as keyof typeof extensionsMap]};base64,${fileData.content}`;
        } else {
            return fileData.download_url;
        }
    }
}
