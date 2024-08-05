import { type Provider } from "./content";

export type Configuration = {
    sourceUri?: string;
    provider?: Provider;
    basePath?: string;
    gitToken?: string;
};

export type Pages = { [key: string]: { title: string; uri: string; configuration: Configuration } };

export type DocItem = {
    type?: "heading" | "row";
    title: string;
    sourceUri?: string;
    gitToken?: string;
    hidden?: boolean;
    basePath?: string;
    items?: DocItem[] | null;
    href?: string;
};

export type Structure = {
    sourceUri?: string;
    gitToken?: string;
    basePath?: string;
    items?: DocItem[];
};
