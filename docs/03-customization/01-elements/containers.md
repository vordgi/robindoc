# Containers

`Containers` are blocks responsible for styling the page's content, serving as the layout for the documentation elements.

## PageContainer

A special container designed for custom pages

```tsx filename="/page.tsx"
import { PageContainer } from "robindoc";

const HomePage = () => <PageContainer>{/* ... */}</PageContainer>;
```

## DocsContainer

A special container designed for a documentation. Assumes the use of `[Sidebar](./sidebar.md)`, `[Page](./page.md)` on the page

```tsx filename="/docs/layout.tsx"
import { DocsContainer } from "robindoc";

const DocsLayout = ({ children }) => (
  <DocsContainer>{children}</DocsContainer>;
);
```

## BlogContainer

A special container designed for a blog. It differs in that it does not involve the use of `[Sidebar](./sidebar.md)` on the page

<a href="./sidebar.md">some text</a>

```tsx filename="/blog/layout.tsx"
import { BlogContainer } from "robindoc";

const BlogLayout = ({ children }) => (
  <BlogContainer>{children}</BlogContainer>;
);
```

## Usage

`Main` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

For more details on using `Main`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
