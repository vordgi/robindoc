# Keylinks

`Keylinks` are special blocks designed to improve accessibility for users. These elements are essential for enhancing the site's keyboard navigation experience.

## KeylinkToContent

A special element that appears at the very start of the page when the user presses the tab key for the first time. When clicked, it moves the focus to the main content of the page — the documentation itself.

This element should be inserted at the very beginning of the page, i.e., the first element in the body.

```tsx filename="app/layout.tsx" switcher tab="TypeScript"
import { Header, KeylinkToContent } from "robindoc";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>
      <KeylinkToContent />
      <Header logo={<Logo />} />
      {/* ... */}
    </body>
  </html>
);

export default RootLayout;
```

```jsx filename="app/layout.jsx" switcher tab="JavaScript"
import { Header, KeylinkToContent } from "robindoc";

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <KeylinkToContent />
      <Header logo={<Logo />} />
      {/* ... */}
    </body>
  </html>
);

export default RootLayout;
```

> [!NOTE]
> If you use this separately from the `Page` component, assign the page content element the attribute `id="main-content"`.

### Props

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## KeylinkToNavigation

A special element that appears at the very end of the page when navigating using the tab key. When clicked, it moves the focus to the documentation's navigation.

This element should be inserted at the very end of the page, i.e., the last element in the body.

> [!NOTE]
> `KeylinkToNavigation` should be added at the page level in case there are pages without navigation.

```tsx filename="app/docs/layout.tsx" switcher tab="TypeScript"
import { DocsContainer, KeylinkToNavigation } from "robindoc";

import { Sidebar } from "./robindoc";

const DocsLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <DocsContainer>
    <Sidebar />
    {children}
    <KeylinkToNavigation />
  </DocsContainer>
);

export default DocsLayout;
```

```jsx filename="app/docs/layout.jsx" switcher tab="JavaScript"
import { DocsContainer, KeylinkToNavigation } from "robindoc";

import { Sidebar } from "./robindoc";

const DocsLayout = ({ children }) => (
  <DocsContainer>
    <Sidebar />
    {children}
    <KeylinkToNavigation />
  </DocsContainer>
);

export default DocsLayout;
```

> [!NOTE]
> It should be used together with the `Sidebar` component. If you use your own navigation component, assign it the attribute `id="navigation"`.

### Props

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.
