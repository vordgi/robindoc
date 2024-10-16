# Containers

`Containers` are blocks responsible for styling the page's content, serving as the layout for the documentation elements.

## PageContainer

Специальный контейнер предназначенный для ваших страниц

```tsx filename="/page.tsx"
import { PageContainer } from "robindoc";

const HomePage = () => <PageContainer>{/* ... */}</PageContainer>;
```

## DocsContainer

Специальный контейнер предназначенный для документации. Предполагает использование `[Sidebar](./sidebar.md)`, `[Page](./page.md)` на странице

```tsx filename="/docs/layout.tsx"
import { DocsContainer } from "robindoc";

const DocsLayout = ({ children }) => (
  <DocsContainer>{children}</DocsContainer>;
);
```

## BlogContainer

Специальный контейнер предназначенный под блог. Отличается тем, что не предполагает использования `[Sidebar](./sidebar.md)` на странице

```tsx filename="/blog/layout.tsx"
import { BlogContainer } from "robindoc";

const BlogLayout = ({ children }) => (
  <BlogContainer>{children}</BlogContainer>;
);
```

## Usage

`Main` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

For more details on using `Main`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
