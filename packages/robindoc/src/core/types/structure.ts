import { type Configuration } from "./content";

export type DocItem =
    | {
          type?: "heading" | "row";
          title: string;
          hidden?: boolean;
          items?: DocItem[] | null;
          href?: string;
          configuration?: Configuration;
      }
    | {
          type: "separator";
      }
    | "auto";

export type Structure = {
    configuration?: Configuration;
    items?: DocItem[] | "auto";
};
