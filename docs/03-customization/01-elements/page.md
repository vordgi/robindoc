# Page

`Page` is a block responsible for the content of the document itself. It handles displaying markdown-based files as HTML.

```tsx
import { Page, Sidebar } from "./robindoc";

export const Page = ({ children }) => {
  return (
    <>
      <Sidebar /* ... */ />
      <Page
        pathname="/docs/example"
        components={{
          Example: ({ children }) => <span>{children}</span>,
        }}
      />
    </>
  );
};
```

## Props

All customization in Robindoc happens through the structure and props of the components.

### Base Props

`link` [`React.ElementType`] - the link component of the framework or router being used. If this component is not provided, the default `<a>` tag will be used everywhere;

`pathname` [`string`] - the path of the current page. It should be specified completely, including the `basePath`;

`config` - the configuration for the Robindoc parser;

`config.publicDirs` [`string[]`] - an array of the project's public directories. Addresses of all images from markdown files located in this folder will be converted to absolute paths (for example, with the value `[public]`, an image address like `./public/image.png` will become `/image.png`);

`components` - an object of allowable JSX or Robin components. Read more on the page [Writing MD](../../01-getting-started/02-writing-md.md);

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

### Overwriting Props

`hideContents` [`boolean`] - hide the contents section for the documentation page. By default, it is shown only if the page contains H2 or H3 headers;

`breadcrumbs` [`{ pathname: string; title: string }[]`] - overwrite automatically determined `breadcrumbs`. By default, they are displayed starting from the second nesting level;

`editOnGitUri` - overwrite the automatically determined git URI for the page. By default, it determines the file path if the source is a remote git repository;

`next` [`{ pathname: string; title: string }`] - overwrite the automatically determined next page in the documentation. By default, the next page in the structure is set;

`prev` [`{ pathname: string; title: string }`] - overwrite the automatically determined previous page in the documentation. By default, the previous page in the structure is set.

## Usage

`Page` is rendered on every page and depends on the generated structure.

The specific usage of the component depends on the chosen framework. For more details on using `Page`, refer to the section [App organization](../../01-getting-started/04-app-organization/README.md).
