export type TreeItem =
    | {
          title: string;
          href?: string;
          type?: "row" | "heading";
          items?: TreeItem[] | null;
      }
    | {
          type: "separator";
      };
