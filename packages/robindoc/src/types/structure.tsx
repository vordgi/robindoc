import { type BaseProvider } from "../providers/base";

export type Fetcher<T = Response> = (input: RequestInfo | URL, init?: RequestInit) => Promise<T>;

export type Configuration = {
    sourceUri?: string;
    provider?: BaseProvider;
    basePath?: string;
    gitToken?: string;
    fetcher?: Fetcher | null;
};

export type Pages = { [key: string]: { title: string; uri: string; configuration: Configuration } };

export type DocItem = {
    type?: "heading" | "row";
    title: string;
    sourceUri?: string;
    gitToken?: string;
    hidden?: boolean;
    basePath?: string;
    fetcher?: Fetcher;
    items?: DocItem[] | null | "auto";
    href?: string;
};

export type Structure = {
    sourceUri?: string;
    gitToken?: string;
    basePath?: string;
    fetcher?: Fetcher;
    items?: DocItem[] | "auto";
};
