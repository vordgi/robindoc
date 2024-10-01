# Elements

The documentation layout consists of several elements: `Layout`, `Main`, `KeylinkToContent`, `KeylinkToNavigation`, `Sidebar`, and `Page`.

## Robindoc Blocks

- [`Header`](./header.md) - a universal header. It can be used for both Robindoc documentation pages and the entire site.

- [`Footer`](./footer.md) - a universal footer. It can be used for both Robindoc documentation pages and the entire site.

- [`RobinProvider`](./robin-provider.md) - a general provider for Robindoc documentation. It contains all the necessary contexts, settings, scripts, etc.

- [`Main`](./main.md) is responsible for styling the page content, i.e., the container and layout of documentation elements. `Main` is also an independent component and does not depend on the page. It is assumed you can use it once across the entire project or section.

- [`KeylinkToContent` and `KeylinkToNavigation`](./keylinks.md) are special components designed to improve accessibility.

- [`Sidebar`](./sidebar.md) is responsible for side navigation. It displays all available documentation pages with nesting levels. This component is rendered on each page and depends on the generated structure.

- [`Page`](./page.md) is responsible for the content of the document itself. It handles displaying markdown-based files as HTML. This component is rendered on each page and depends on the generated structure.

## Blocks usage

`Header`, `Footer`, `RobinProvider`, `Main`, `KeylinkToContent`, and `KeylinkToNavigation` are global elements. It is recommended to include them on all documentation pages.

`Page` and `Sidebar` are dynamic elements and should be added to each page.

The specific usage of the elements depends on the chosen framework. For more details on using these elements, refer to the section [App organization](../../01-getting-started/04-app-organization/README.md).
