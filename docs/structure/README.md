# Structure

The structure is the core component of Robindoc. Here you can describe all possible documentation pages and configure the main information for them. Robindoc fully supports both automatic structure generation and custom methods for assembling it. For more details, read the [Items](./items.md) page.

```ts
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar } = initializeRobindoc({
  configuration: {
    sourceRoot: "../docs",
    basePath: "/docs",
    gitToken: "YOUR_TOKEN",
  },
  items: "auto",
});
```

In the end, the structure is a tree, each branch of which includes [configuration instructions](./configuration.md) for the current branch and its [items](./items.md).
