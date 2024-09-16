---
title: Introduction
description: Robindoc is a framework for automatically creating documentation websites based on markdown files, built on React.js Server Components
---

# Robindoc

<!---robin-->

Read the documentation in a convenient interface at [robindoc.com/docs](https://robindoc.com/docs)

<!---/robin-->

Robindoc is a framework for automatically creating documentation websites based on markdown files, built on React.js Server Components.

```tsx
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

The main goal of Robindoc is to create a system where you can fully reuse the existing markdown documentation within your projects.

No additional configuration is needed, while preserving the accessibility and clarity of the original documentation.

## Advantages

- Works on React.js Server Components (RSC). The framework choice is up to you. More details in the section "[App Organization](./docs/getting-started/app-organization/README.md)";
- Requires no configuration of the project, bundler, or markdown documents. More details in the section "[Customization](./docs/customization/README.md)";
- Supports loading content from various sources, including GitHub. More details in the section "[Data Source](./docs/structure/data-source.md)";
- Supports fully automatic documentation generation, as well as custom generation. More details in the section "[Structure](./docs/structure/README.md)";
- Supports JSX/HTML and special Robin components for all sources. More details in the section "[Writing MD](./docs/getting-started/writing-md.md)";
- Optimized for metrics and accessibility.

## Additional

Please consider giving a star if you like it, it shows that the package is useful and helps me continue work on this and other packages.

Feel free to create issues with requests, ideas, difficulties, etc. All of them will definitely be considered and thought over.

## License

[MIT](https://github.com/vordgi/robindoc/blob/main/LICENSE)
