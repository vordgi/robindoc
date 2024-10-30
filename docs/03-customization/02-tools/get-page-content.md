# Get Page Content

`getPageContent` is a utility that returns the markdown document and its title (generated for the structure).

## Usage

`getPageContent` is obtained as a result of [initializing Robindoc](../../01-getting-started/03-initialization.md).

It can be used, for example, for search functionality. For more details on general search configuration, refer to the [Search](../03-search.md) page. For Next.js-specific setup, refer to the [App Organization](../../01-getting-started/04-app-organization.md) page.

```ts filename="app/api/search/route.ts" switcher tab="TypeScript" clone="js|JavaScript|app/api/search/route.js"
const searchResults = [];
const { content, title } = await getPageContent("/docs/introduction");

if (content.includes(search)) {
  searchResults.push({ href: "/docs/introduction", content, title });
}
```

## Arguments

`pathname` - the full path of the current page (e.g., `/docs/introduction`) must be provided to obtain the page data.
