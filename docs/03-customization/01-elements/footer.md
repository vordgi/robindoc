# Footer

`Footer` is a universal footer. It can be used both for Robindoc documentation pages as well as the entire site.

```tsx filename="layout.tsx"
import { RobinProvider, Footer } from "robindoc";

export const Layout = ({ children }) => {
  return (
    <RobinProvider>
      {/* ... */}
      <Footer copyright="© 2024 All rights reserved" />
    </RobinProvider>
  );
};
```

## Props

All customization in Robindoc happens through the structure and props of the components.

`hidePoweredBy` [`boolean`] - hides the "Powered By Robindoc" label. However, I would appreciate it if you keep this flag enabled. It helps the service grow and improve;

`copyright` [`string`] - the copyright text (usually in the form of "© 2024 All rights reserved");

`translations` [`{ [key: string]: string }`] - translations for the current component. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## Usage

`Footer` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

For more details on using `Footer`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
