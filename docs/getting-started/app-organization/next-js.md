# Application Organization for Next.js

Currently, Robindoc works only with the App Router. Once RSC is available for the Pages Router, Robindoc will automatically support it as well.

You can initialize Robindoc on any subpath of your site, as long as you specify the [`basePath`](../../structure/configuration.md) in the project initialization and pass the correct path in the Robindoc components.

## Page Setup

Next.js supports dynamic pages, so it is recommended to set up one dynamic segment for all documentation pages.

```tsx filename="app/docs/[[...path]]/page.tsx"
import { Page, Sidebar, getMeta, getPages } from "./robindoc";

export const Page: React.FC<{ params: { path?: string[] } }> = ({ params }) => {
  const pathname = "/docs/" + (params.path?.join("/") || "");

  return (
    <>
      <Sidebar pathname={pathname} />
      <Page pathname={pathname} />
    </>
  );
};
```

For more details about the props, refer to the [`Sidebar`](../../customization/elements/sidebar.md) and [`Page`](../../customization/elements/page.md) block pages.

You should also set up metadata generation and static parameters generation (if you want to use SSG, which is highly recommended):

```tsx
import { Page, Sidebar, getMeta, getPages } from "./robindoc";

// ...

export const generateMetadata = async ({
  params,
}: {
  params: { path?: string[] };
}) => {
  const pathname = "/docs/" + (params.path?.join("/") || "");
  const meta = await getMeta(pathname);

  return meta;
};

export const generateStaticParams = async () => {
  const pages = await getPages("/docs/");
  return pages.map((page) => ({ path: page.split("/").slice(2) }));
};
```

## Robindoc Setup

It is recommended to place the Robindoc initialization near this route.

```tsx filename="app/docs/robindoc.ts"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPages, getMeta, getPageContent } =
  initializeRobindoc({
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
    },
    items: "auto",
  });
```

## Layout Setup

The Next.js Layout should be placed one level up so that it remains static for all pages.

```tsx filename="app/docs/layout.tsx"
import { RobinProvider, Header, Footer, Main } from "robindoc";
import Link from "next/link";
import Logo from "./logo";
import "robindoc/lib/styles.css";

export const Layout = ({ children }) => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} link={Link} />
      <Main>{children}</Main>
      <Footer copyright="© 2024 All rights reserved" />
    </RobinProvider>
  );
};
```

For more details on configuring elements, refer to the [`RobinProvider`](../../customization/elements/robin-provider.md), [`Header`](../../customization/elements/header.md), [`Footer`](../../customization/elements/footer.md), and [`Main`](../../customization/elements/main.md) block pages.

## Search Setup

If you want to enable search, you can create your own API route and pass the path to it in your Header.

```ts filename="app/api/search/route.ts"
export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("s");

  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=UTF-8");

  if (!search) return new Response(JSON.stringify([]), { headers });

  const searchResults = await advancedSearcher(search);

  return new Response(JSON.stringify(searchResults), { headers });
};
```

```tsx filename="app/docs/layout.tsx"
import { Layout } from "robindoc";

export const Layout = ({ children }) => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} searcher="/api/search" />
      <Main>{children}</Main>
      <Footer copyright="© 2024 All rights reserved" />
    </RobinProvider>
  );
};
```

For more details on search configuration, refer to the [Search](../../customization/search.md) page.
