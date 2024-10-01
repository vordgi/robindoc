# Main

`Main` is a block responsible for styling the page's content, serving as the container and layout for the documentation elements.

```tsx
import { Main } from "robindoc";

export const Main = ({ children }) => {
  return <Main>{children}</Main>;
};
```

## Usage

`Main` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

The specific usage of the component depends on the chosen framework. For more details on using `Main`, refer to the section [App organization](../../01-getting-started/04-app-organization/README.md).
