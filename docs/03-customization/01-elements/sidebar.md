# Sidebar

`Sidebar` is a block responsible for side navigation. It displays all available documentation pages with nesting levels.

```tsx filename="/docs/layout.tsx"
import { Sidebar } from "./robindoc";

const DocsLayout = ({ children }: Readonly<{ children?: JSX.Element }>) => {
  return (
    <DocsContainer>
      <Sidebar />
      {children}
    </DocsContainer>
  );
};
```

## Props

All customization in Robindoc happens through the structure and props of the components.

`translations` [`{ [key: string]: string }`] - translations for the current block. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## Usage

`Sidebar` is independent component and you can use it once across the entire section.

For more details on `Sidebar` usage, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
