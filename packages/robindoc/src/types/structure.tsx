import { type Fetcher } from "./content";

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
