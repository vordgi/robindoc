# Header

`Header` is a universal header. It can be used both for Robindoc documentation pages and the entire site.

```tsx
import { RobinProvider, Header } from "robindoc";

export const Layout = ({ children }) => {
  return (
    <RobinProvider>
      <Header logo={<Logo />} />
      {/* ... */}
    </RobinProvider>
  );
};
```

## Props

All customization in Robindoc happens through the structure and props of the components.

`logo` [`React.ReactElement`] - the logo to be used in the site’s header;

`git` [`string | { uri: string; logo: React.ElementType }`] - the git address of your documentation. Robindoc automatically supports GitHub and GitLab out of the box. If you need an alternative source, you can pass the logo of that source by providing a value through an object;

`links` [`{ title: string; href: string }[]`] - a list of links to pages on your site unrelated to the documentation section. This could include blog, showcases, about, etc.;

`link` [`React.ElementType`] - the link component of the framework or router being used. If this component is not provided, the default `<a>` tag will be used everywhere;

`searcher` - the route for search functionality or a client-side async callback. If this field is not provided, search functionality will not be available. Read more on the "[Search](../search.md)" page;

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_;

`locales` - a list of options for the locale switcher dropdown. This is currently under development;

`versions` - a list of options for the version switcher dropdown. This is currently under development.

## Usage

`Header` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

The specific usage of the component depends on the chosen framework. For more details on using `Header`, refer to the section [App organization](../../getting-started/app-organization/README.md).
