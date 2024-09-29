import { type Configuration } from "./content";

export type DocItem = {
    type?: "heading" | "row";
    title: string;
    hidden?: boolean;
    items?: DocItem[] | null | "auto" | "auto-spreaded";
    href?: string;
    configuration?: Configuration;
};

export type Structure = {
    configuration?: Configuration;
    items?: DocItem[] | "auto" | "auto-spreaded";
};
