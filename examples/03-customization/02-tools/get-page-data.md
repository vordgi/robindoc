# Get Page Data

`getPageData` is a utility that returns the markdown document and its title (generated for the structure).

## Usage

`getPageData` is obtained as a result of [initializing Robindoc](../../01-getting-started/03-initialization.md).

It can be used, for example, for search functionality. For more details on general search configuration, refer to the [Search](../04-search.md) page. For Next.js-specific setup, refer to the [App Organization](../../01-getting-started/04-app-organization.md) page.

```ts filename="app/api/search/route.ts" switcher tab="TypeScript" clone="js|JavaScript|app/api/search/route.js"
const searchResults = [];
const { raw, title } = await getPageData("/docs/introduction");

if (raw.includes(search)) {
  searchResults.push({ href: "/docs/introduction", raw, title });
}
```

## Arguments

`pathname` - the full path of the current page (f.e., `/docs/introduction`) must be provided to obtain the page data.
