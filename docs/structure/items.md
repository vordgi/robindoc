# Items

Each item consists of the following keys:

- `title` - the title of the item. It will be used in the sidebar;
- `type` - the type of the item. It can be `row` - a regular item, and `heading` - a heading item, which will be bold text;
- `href` - the link where the current item will be accessible. The link is specified fully except for the `basePath`. If no link is provided, it will be displayed as plain text;
- `configuration` - the configuration of the current subtree;
- `items` - the subtree items of the current item.

## Manual Generation

Firstly, Robindoc reads the structure passed as an argument:

```ts
export const { Page, Sidebar } = initializeRobindoc({
  // ...
  items: [
    {
      title: "Introduction",
      type: "heading",
      href: "/",
      configuration: {
        sourceRoot: "..",
      },
    },
    // ...
    {
      title: "Structure",
      type: "heading",
      href: "/structure",
      items: [
        // ...
        {
          title: "Data Source",
          href: "/structure/data-source",
        },
      ],
    },
    {
      title: "Elements",
      type: "heading",
      href: "/elements",
      items: "auto",
    },
  ],
});
```

You can also pass an asynchronous callback as an argument. In this case, you can form the structure in a way that suits you.

```ts
export const { Page, Sidebar } = initializeRobindoc(async () => {
  const items = await loadItems();

  return {
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
    },
    items,
  };
});
```

This configuration determines the list of available and generated pages, all links, the sidebar tree, etc.

## Automatic Generation

To have the subtree generated automatically, you need to pass `items: 'auto'`.

```ts
export const { Page, Sidebar } = initializeRobindoc({
  // ...
  items: "auto",
});
```

This, like any configuration setting, can be done anywhere in the structure.

```ts
export const { Page, Sidebar } = initializeRobindoc({
  // ...
  items: [
    {
      title: "Structure",
      type: "heading",
      href: "/structure",
      items: [
        // ...
        {
          title: "Data Source",
          href: "/structure/data-source",
        },
      ],
    },
    {
      title: "Elements",
      type: "heading",
      href: "/elements",
      items: "auto",
    },
  ],
});
```

In automatic mode, Robindoc first looks for a `structure.json` file in the current directory.

If the `structure.json` file is not in the current directory, Robindoc will try to create the structure on its own based on the files in the directory. In this case, it will determine all paths, slugs, as well as the header for the sidebar link. The header is formed according to the same principles as the meta-header. Learn more about getting metadata on the [Get Meta](../customization/tools/get-meta.md) page.

## structure.json

`structure.json` - a file with basic instructions for the current level of documentation. It is stored next to the markdown documentation files.

`/blog/structure.json`

```json
{
  "index": {
    "title": "Blog"
  },
  "updates": {
    "title": "Updates"
  },
  "tutorials": {
    "title": "Tutorials"
  }
}
```

For each structure element, Robindoc will repeat the process and check if there is a `structure.json` file. If so, it will include them in the final structure. This continues until no more files are left down the tree.