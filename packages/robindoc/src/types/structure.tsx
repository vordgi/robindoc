import { type Fetcher } from "./content";

export type StructureConfiguration = {
    sourceUri?: string;
    gitToken?: string;
    basePath?: string;
    fetcher?: Fetcher;
};

export type DocItem = {
    type?: "heading" | "row";
    title: string;
    hidden?: boolean;
    items?: DocItem[] | null | "auto";
    href?: string;
    configuration?: StructureConfiguration;
};

export type Structure = {
    configuration?: StructureConfiguration;
    items?: DocItem[] | "auto";
};
