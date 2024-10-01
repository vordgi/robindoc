# Tools

When initializing Robindoc, in addition to the core elements, you will also receive special utilities.

These utilities work based on the structure and documentation files. They are needed to fine-tune page generation, and their specific usage will vary depending on the chosen framework. For more details on page configuration, refer to the [App Organization](../../getting-started/app-organization/README.md) page.

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

For more information on using the utilities, refer to their respective pages - [`getMeta`](./get-meta.md), [`getPages`](./get-pages.md), [`getPageContent`](./get-page-content.md).
