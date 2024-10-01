# Customization

Page layout consists of [special blocks](./01-elements/README.md). For additional customization, you may use [special utilities](./02-tools/README.md).

All styles are collected separately and are included once for the entire application from `robindoc/lib/styles.css`:

```tsx
import { RobinProvider, Header, Footer, Main } from "robindoc";
import { Page, Sidebar } from "./robindoc";
import "robindoc/lib/styles.css";

export const Documentation = () => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} />
      <Main>
        <Sidebar pathname="/docs" />
        <Page pathname="/docs" />
      </Main>
      <Footer copyright="© 2024 All rights reserved" />
    </RobinProvider>
  );
};
```

Framework-based logic configuration - link component, search API route, and the current page path - is up to you. For more details, read the [App Organization](../01-getting-started/04-app-organization/README.md) page.

Robindoc works entirely on React.js (and only on it). The choice of framework (next.js/remix/react router, etc.) is entirely up to you. At the same time, Robindoc does not require any modifications to the bundler. The framework is fully built on the capabilities of RSC, allowing you to build documentation as a static site or generate pages dynamically.

As a result, Robindoc does not affect other pages of the service. Essentially, these are just regular components that build large blocks based on markdown files and instructions. Conversely, you can easily integrate Robindoc into any site that supports RSC.

Despite the bundler-free generation, Robindoc supports markup (both through jsx/html inside md/mdx files and through special Robin components). For more details, read the [Writing MD](../01-getting-started/02-writing-md.md) page.
