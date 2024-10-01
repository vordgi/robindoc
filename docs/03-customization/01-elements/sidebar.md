# Sidebar

`Sidebar` is a block responsible for side navigation. It displays all available documentation pages with nesting levels.

```tsx
import { Page, Sidebar } from "./robindoc";

export const Page = ({ children }) => {
  return (
    <>
      <Sidebar pathname="/docs/example" />
      <Page /* ... */ />
    </>
  );
};
```

## Props

All customization in Robindoc happens through the structure and props of the components.

`link` [`React.ElementType`] - the link component of the framework or router being used. If this component is not provided, the default `<a>` tag will be used.

`pathname` [`string`] - the path of the current page. It should be specified completely, including the `basePath`.

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## Usage

`Sidebar` is rendered on every page and depends on the generated structure.

The specific usage of the element depends on the chosen framework. For more details on using `Sidebar`, refer to the section [App organization](../../01-getting-started/04-app-organization/README.md).
