# Get Metadata

`getMetadata` generates a metadata object for the current structure (_including those automatically generated during initialization_).

## Metadata Generation

To collect metadata, Robindoc supports front-matter:

```markdown filename="README.md"
---
title: "Get Metadata | Robindoc"
description: "Robindoc AAAAAA"
---
```

If you do not provide a front-matter title, the first-level heading of the page will be used as the title.

## Usage

`getMetadata` is obtained as a result of [initializing Robindoc](../../01-getting-started/03-initialization.md).

For more details on using the utility in your application, refer to the section [App Organization](../../01-getting-started/04-app-organization.md).

You can get the metadata object for a specific page using the following method:

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { getMetadata } from "./robindoc";

export const generateMetadata = async ({
  params,
}: {
  params: { path?: string[] };
}) => {
  const pathname = "/docs/" + (params.path?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { getMetadata } from "./robindoc";

export const generateMetadata = async ({ params }) => {
  const { path } = await params;
  const pathname = "/docs/" + (path?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};
```

## Arguments

`pathname` - the full path of the current page (f.e., `/docs/02-tools/get-metadata`) must be provided to obtain the metadata.
