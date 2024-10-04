import path from "path";

import { type BranchFiles, type Fetcher } from "../types/content";
import { BaseProvider } from "./base";
import { extensionsMap } from "../data/contents";
import { getFileUrl, normalizePathname } from "../utils/path-tools";

export class GithubProvider extends BaseProvider {
    readonly type = "remote";

    owner: string;

    repo: string;

    ref: string;

    token?: string;

    pathname: string;

    fetcher: Fetcher;

    constructor(sourceRoot: string, fetcher: Fetcher = fetch, token?: string) {
        super(sourceRoot);

        const groups = this.parseUri(sourceRoot);
        if (!groups) {
            throw new Error(`Invalid URI: "${sourceRoot}"`);
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

    async getPageSourcePathname(uri: string) {
        if (this.pathname.endsWith(".md") || this.pathname.endsWith(".mdx")) {
            return this.pathname;
        }
        const segments = [...(this.pathname?.split("/") || []), ...uri.split("/")].filter(Boolean);
        const fullUri = segments.join("/");
        return super.getPageSourcePathname(uri, fullUri);
    }

    async load(uri: string) {
        const pathname = await this.getPageSourcePathname(uri);
        if (!pathname) {
            throw new Error(
                `Can not find md file for "${uri}" at "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}"`,
            );
        }

        const url = new URL(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathname}`);
        const headers = new Headers();
        headers.set("Accept", "application/vnd.github.raw+json");

        url.searchParams.set("ref", this.ref);
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await this.fetcher(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error(
                `Can not load "${uri}" content from "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}": ${resp.statusText}`,
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
                    if (item.path.match(/\.(md|mdx)$/)) {
                        const clientUrl = getFileUrl(item.path);
                        const origClientPath = normalizePathname(clientUrl.substring(pathnameClean?.length || 0));
                        const clientPath = origClientPath.replace(/\/[0-9]+[-_](.)/g, "/$1");

                        acc.docs.push({
                            origPath: "/" + item.path,
                            clientPath,
                            origClientPath,
                        });
                    } else if (item.path.endsWith("structure.json")) {
                        acc.structures.push(item.path);
                    }
                }
                return acc;
            },
            { docs: [], structures: [] },
        );
        fileTree.docs.sort((a, b) => a.origClientPath.localeCompare(b.origClientPath));
        this.filesPromise = fileTree;
        return fileTree;
    }

    private parseUri(uri: string) {
        const match = uri.match(
            /^https:\/\/github.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\/(blob|tree)\/(?<ref>[^/]+)(?<pathname>\/.*)|\/)?$/,
        );
        const groups = match?.groups;
        return groups || null;
    }

    async getEditUri(uri: string) {
        const pathname = await this.getPageSourcePathname(uri);
        if (!pathname) {
            return null;
        }

        return `https://github.com/${this.owner}/${this.repo}/edit/${this.ref}${pathname}`;
    }

    async getLastModifiedDate(uri: string) {
        const pathname = await this.getPageSourcePathname(uri);
        if (!pathname) {
            return null;
        }

        const url = new URL(`https://api.github.com/repos/${this.owner}/${this.repo}/commits?page=1&per_page=1`);
        url.searchParams.set("path", pathname);
        url.searchParams.set("sha", this.ref);

        const headers = new Headers();
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await fetch(url, { headers });
        if (!resp.ok) {
            throw new Error(
                `Can not load last modified date for "${uri}" from "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}": ${resp.statusText}`,
            );
        }

        const data = await resp.json();
        return data[0].commit.committer.date;
    }

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
