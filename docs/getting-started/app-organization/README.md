# App Organization

Robindoc can be considered to consist of several parts:

- Documentation Structure ([more about documentation structure](../../structure/README.md));
- Robindoc Initialization ([more about initialization](../initialization.md));
- Page Markup and Configuration ([more about customization](../../customization/README.md));
- Documentation Markdown Files ([more about writing MD](../writing-md.md)).

## Organizing Documentation Files

One of the main advantages of Robindoc is that documentation files can reside in any source—whether they are files outside the current directory or a remote git repository (more about sources on the "[Data Source](../../structure/data-source.md)" page).

Robindoc’s main approach is that you don’t adjust the location of markdown files for Robindoc; instead, Robindoc builds the site from your markdown files. In other words, you place files so that they can be read in GitHub, and Robindoc serves as a convenient interface.

However, when using the automatic mode for generating the structure, the documentation file structure should match the desired structure on the site. In manual mode, you can organize the documentation files as you wish, but it is still recommended to reflect the site’s structure.

## Application Setup and Configuration

After initialization, you will receive Sidebar, Page, getPages, getMeta, and getPageContent. Read more on the [Initialization](../initialization.md) page.

Global elements - [`RobinProvider`](../../customization/elements/robin-provider.md), [`Header`](../../customization/elements/header.md), [`Footer`](../../customization/elements/footer.md), and [`Main`](../../customization/elements/main.md) - should ideally be placed above all pages and reused across all.

```tsx
import { RobinProvider, Header, Footer, Main } from "robindoc";
import "robindoc/lib/styles.css";

export const Layout = ({ children }) => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} />
      <Main>{children}</Main>
      <Footer copyright="© 2024 All rights reserved" />
    </RobinProvider>
  );
};
```

[Sidebar](../../customization/elements/sidebar.md) and [Page](../../customization/elements/page.md) are used for each page.

```tsx
import { Page, Sidebar } from "./robindoc";

export const Page = () => {
  return (
    <>
      <Sidebar pathname="/docs" />
      <Page pathname="/docs" />
    </>
  );
};
```

For more details on using the components, refer to their respective pages.

You will also need to configure metadata insertion on pages, search, and possibly dynamic page generation. The specific markup of Robindoc components and configuration may vary depending on the chosen framework. Here are some ready-made solutions:

- [Organizing a Next.js Application](./next-js.md)
