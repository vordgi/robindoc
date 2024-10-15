# Keylinks

Keylinks are special blocks designed to improve accessibility for users. These elements are essential for enhancing the site's keyboard navigation experience.

## KeylinkToContent

A special element that appears at the very start of the page when the user presses the tab key for the first time. When clicked, it moves the focus to the main content of the page — the documentation itself.

This element should be inserted at the very beginning of the page, i.e., the first element in the body.

```tsx
import { Header, KeylinkToContent } from "robindoc";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <KeylinkToContent />
        <Header logo={<Logo />} />
        {/* ... */}
      </body>
    </html>
  );
}
```

<Note>
If you use this separately from the `Page` component, assign the page content element the attribute `id="main-content"`.
</Note>

### Props

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## KeylinkToNavigation

A special element that appears at the very end of the page when navigating using the tab key. When clicked, it moves the focus to the documentation's navigation.

This element should be inserted at the very end of the page, i.e., the last element in the body.

<Note>
`KeylinkToNavigation` should be added at the page level in case there are pages without navigation.
</Note>

```tsx filename="/docs/layout.tsx"
import type { Metadata } from "next";
import { Main, KeylinkToNavigation } from "robindoc";

import { Sidebar } from "./robindoc";

const DocsLayout = ({ children }: Readonly<{ children?: JSX.Element }>) => {
  return (
    <Main>
      <Sidebar />
      {children}
      <KeylinkToNavigation />
    </Main>
  );
};

export default DocsLayout;
```

<Note>
It should be used together with the `Sidebar` component. If you use your own navigation component, assign it the attribute `id="navigation"`.
</Note>

### Props

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.
