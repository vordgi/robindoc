# Get Static Params

`getStaticParams` allows you to retrieve a list of all pages for the current structure (including those automatically generated).

## Usage

`getStaticParams` is obtained as a result of [initializing Robindoc](../../01-getting-started/03-initialization.md).

For more details on using the utility in your application, refer to the [App Organization](../../01-getting-started/04-app-organization.md) page.

You can obtain an array of objects with the list of segments for each page using the following method:

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/[[...segments]]/page.jsx"
import { getStaticParams } from "./robindoc";

export const generateStaticParams = async () => {
  const staticParams = await getStaticParams();
  return staticParams;
};
```

## Arguments

In some cases, you might want to retrieve a specific section of the documentation, such as `/docs` or `/blog`. To get a filtered list of pages, simply pass the desired `prefix` as an argument.

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/[[...segments]]/page.jsx"
const staticParams = await getStaticParams("/docs");
```

Also in some situations you may need a different key for the parameter (the default and recommended is `segments`). In such situations, pass the name of the dynamic parameter as the second argument (`segmentsParamKey`):

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/[[...segments]]/page.jsx"
const staticParams = await getStaticParams("/docs", "path");
```
