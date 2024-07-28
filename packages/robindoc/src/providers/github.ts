export class GithubProvider {
    owner: string;

    repo: string;

    ref?: string;

    token?: string;

    constructor(config: { owner: string; repo: string; ref?: string; token?: string }) {
        const { owner, repo, ref, token } = config;

        this.owner = owner;
        this.repo = repo;
        this.ref = ref;
        this.token = token;
    }

    async load(uri: string) {
        const url = new URL(
            `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${uri.replace(/^\//, "")}`,
        );
        const headers = new Headers();
        headers.set("Accept", "application/vnd.github.raw+json");

        if (this.ref) url.searchParams.set("ref", this.ref);
        if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

        const resp = await fetch(url.toString(), { headers });
        if (!resp.ok) {
            throw new Error("Can not load content");
        }
        const content = await resp.text();
        return content;
    }
}
