# Search

You can configure search in two ways: by providing the path to the search API route or by supplying a callback with custom search logic.

## API Route

To use an API route for search, pass the path to the search endpoint in the `searcher` prop of the [`Header`](./01-elements/header.md) component. The search API should return an array of results with the following keys:

- `title` - the title of the page (e.g., `Introduction`, `Search`);
- `href` - the link to the page (e.g., `/docs/introduction`, `/docs/03-search`);
- `description` - an optional additional field with search results related to the page content.

Here’s an example of how to configure the `Header` component with a search API route:

```tsx filename="app/layout.tsx"
import { RobinProvider, Header } from "robindoc";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} searcher="/api/search" />
      {/* ... */}
    </RobinProvider>
  );
};
```

## Client-Side Callback

If you prefer to handle search logic entirely on the client side, you can provide an asynchronous callback function to the `searcher` prop. This function will be called with the search query and an `AbortController` and should return an array of search results.

Here’s an example callback function:

```ts filename="utils/searcher.ts"
const searcher = async (
  search: string,
  abortController: AbortController
): { href: string; content: string; title: string }[] => {
  const results = await advancedSearcher(pagesData, search, abortController);
  return results;
};
```

## API Route Example

If you use an API route, the server should handle the search requests. The following code demonstrates a simple search implementation using the `match-sorter` library and the utilities `getPages` and `getPageContent`:

```ts filename="app/api/search/route.ts"
import { matchSorter } from "match-sorter";
import { getPages, getPageContent } from "../docs/robindoc";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("s");

  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=UTF-8");

  if (!search) return new Response(JSON.stringify([]), { headers });

  const pages = await getPages();
  const docs: { href: string; content: string; title: string }[] = [];

  for await (const page of pages) {
    const { content, title } = await getPageContent(page);
    docs.push({ href: page, content, title });
  }

  const matchResults = matchSorter(docs, search, {
    keys: ["content", "title"],
  });
  const searchResults = matchResults
    .slice(0, 5)
    .map((item) => ({ title: item.title, href: item.href }));

  return new Response(JSON.stringify(searchResults), { headers });
};
```

For more information about configuring search, refer to the page on [App Organization](../01-getting-started/04-app-organization.md).
