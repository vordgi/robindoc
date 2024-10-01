# Initialization

To use Robindoc with all its features, you need to initialize it. To do this, you should call the `initializeRobindoc` function, passing your structure configuration. For more about the structure and how to work with it, read the "[Structure](../structure/README.md)" section.

## Calling the Method

The method will return dynamic components [`Page`](../customization/elements/page.md) and [`Sidebar`](../customization/elements/sidebar.md), as well as the methods [`getPages`](../customization/tools/get-pages.md), [`getMeta`](../customization/tools/get-meta.md), and [`getPageContent`](../customization/tools/get-page-content.md).

```ts
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent } =
  initializeRobindoc({
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
    },
    items: "auto",
  });
```

Now, use these elements in the necessary places. For more details, read the "[App Organization](./app-organization/README.md)" section.

## File Location

The location of the initialization file does not matter, as you will import the elements from this file later.

However, it is recommended to place these files near the pages of the section for which Robindoc is used. For example, if you are using Robindoc for a documentation section (`/docs`), it is recommended to place the initialization file at `/pages/docs/robindoc.ts`.

Initialization can be performed multiple times in different locations. If needed, you can create multiple structures within a single project — such as one configuration for documentation and a completely different one for a blog.

This way, you can combine multiple documentations from different sources into one site. For more on loading from different sources, read the "[Data Source](../structure/data-source.md)" page.