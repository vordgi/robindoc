import { BaseProvider } from "./base";

export class GithubProvider implements BaseProvider {
    readonly type = "remote";

    rootUri: string;

    treePromise: Promise<string[]>;

    owner: string;

    repo: string;

    ref: string;

    token?: string;

    pathname?: string;

    constructor(rootUri: string, token?: string) {
        this.rootUri = rootUri;
        const groups = this.testUri(rootUri);

        if (!groups) {
            throw new Error(`Invalid URI: "${rootUri}"`);
        }

        const { owner, repo, ref = "main", pathname } = groups;
        this.owner = owner;
        this.repo = repo;
        this.ref = ref;
        this.token = token;
        this.pathname = pathname;
        this.treePromise = this.loadTree(pathname);
    }

    async load(uri: string) {
        const segments = [...(this.pathname?.split("/") || []), ...uri.split("/")].filter(Boolean);
        const uriClean = segments.join("/");
        let pathname;
        if (uriClean.endsWith(".md") || uriClean.endsWith(".mdx")) {
            pathname = uriClean;
        } else {
            const lastPart = segments[segments.length - 1];
            const files = await this.treePromise;
            const regexp = new RegExp(`^${uriClean}(.mdx?|(^|/)(readme|index|${lastPart}).mdx?)$`, "i");
            const validFile = files.find((file) => file.match(regexp));
            if (validFile) {
                pathname = validFile;
            } else {
                throw new Error(
                    `Can not find md file at "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}/${uriClean}"`,
                );
            }
        }

        const url = new URL(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathname}`);
        const headers = new Headers();
        headers.set("Accept", "application/vnd.github.raw+json");

        url.searchParams.set("ref", this.ref);
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await fetch(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error(
                `Can not load content from "https://github.com/${this.owner}/${this.repo}/blob/${this.ref}/${uriClean}": ${resp.statusText}`,
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

        const resp = await fetch(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error("Can not load tree: " + resp.statusText);
        }
        const data = (await resp.json()) as { tree: { path: string }[] };

        return data.tree.reduce<string[]>((acc, item) => {
            if (!pathnameClean || item.path.startsWith(pathnameClean)) {
                acc.push(item.path);
            }
            return acc;
        }, []);
    }

    private testUri(uri: string) {
        const match = uri.match(
            /^https:\/\/github.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\/(blob|tree)\/(?<ref>[^/]+)(?<pathname>\/.*)|\/)?$/,
        );
        const groups = match?.groups;
        return groups || null;
    }
}
