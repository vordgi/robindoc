# Elements

The documentation layout consists of several elements: `Layout`, `Containers`, `KeylinkToContent`, `KeylinkToNavigation`, `Sidebar`, and `Page`.

## Robindoc Blocks

- [`Header`](./header.md) - a universal header. It can be used for both Robindoc documentation pages and the entire site.

- [`Footer`](./footer.md) - a universal footer. It can be used for both Robindoc documentation pages and the entire site.

- [`RobinProvider`](./robin-provider.md) - a general provider for Robindoc documentation. It contains all the necessary contexts, settings, scripts, etc.

- [`Containers`](./containers.md) are responsible for styling the page content, i.e., the layout of documentation elements. `Containers` are also an independent components and do not depend on the page. It is assumed you can use it once across the entire project or section.

- [`KeylinkToContent` and `KeylinkToNavigation`](./keylinks.md) are special components designed to improve accessibility.

- [`Sidebar`](./sidebar.md) is responsible for side navigation. It displays all available documentation pages with nesting levels. This component is rendered on each page and depends on the generated structure. Sidebar is independent component and you can use it once across the entire section.

- [`Page`](./page.md) is responsible for the content of the document itself. It handles displaying markdown-based files as HTML. This component is rendered on each page and depends on the generated structure.

## Blocks usage

`Header`, `Footer`, `RobinProvider`, `Containers`, `KeylinkToContent`, `KeylinkToNavigation` and `Sidebar` are global elements. It is recommended to include them under all documentation pages.

`Page` is dynamic elements and should be added to each page.

For more details on using these elements, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
