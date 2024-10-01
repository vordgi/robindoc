# Get Meta

`getMeta` generates a metadata object for the current structure (including those automatically generated during initialization).

## Metadata Generation

To collect metadata, Robindoc supports front-matter:

```markdown
---
title: "Get Meta | Robindoc"
description: "Robindoc AAAAAA"
---
```

If you do not provide a front-matter title, the first-level heading of the page will be used as the title.

## Usage

`getMeta` is obtained as a result of [initializing Robindoc](../../01-getting-started/03-initialization.md).

The specific usage depends on the chosen framework and needs. For more details on using the utility in your application, refer to the section [App Organization](../../01-getting-started/04-app-organization/README.md).

You can get the metadata object for a specific page using the following method:

```ts
import { getMeta } from "./robindoc";

export const getPageMetadata = async (pathname: string) => {
  const meta = await getMeta(pathname);
  return meta;
};
```

## Arguments

`pathname` - the full path of the current page (e.g., `/docs/02-tools/get-meta`) must be provided to obtain the metadata.
