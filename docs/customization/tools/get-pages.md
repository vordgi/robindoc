# Get Pages

`getPages` allows you to retrieve a list of all pages for the current structure (including those automatically generated).

## Usage

`getPages` is obtained as a result of [initializing Robindoc](../../getting-started/initialization.md).

The specific usage depends on the chosen framework and needs. For more details on using the utility in your application, refer to the [App Organization](../../getting-started/app-organization/README.md) page.

You can obtain an array of objects with the list of segments for each page using the following method:

```tsx
import { getPages } from "./robindoc";

export const getPageSegments = async () => {
  const pages = await getPages(); // ['/introduction', '/usage', ...]
  return pages.map((page) => ({ segments: page.split("/").slice(1) }));
};
```

## Arguments

In some cases, you might want to retrieve a specific section of the documentation, such as `/docs` or `/blog`. To get a filtered list of pages, simply pass the desired prefix as an argument.

```tsx
const pages = await getPages("/docs");
```