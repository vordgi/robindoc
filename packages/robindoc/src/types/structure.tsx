import { BaseProvider } from "../providers/base";

export type Configuration = {
    sourceUri?: string;
    provider?: BaseProvider;
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
    items?: DocItem[] | null | "auto";
    href?: string;
};

export type Structure = {
    sourceUri?: string;
    gitToken?: string;
    basePath?: string;
    items?: DocItem[] | "auto";
};
