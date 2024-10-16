# RobinProvider

`RobinProvider` is the general provider for Robindoc documentation. It contains all the necessary contexts, settings, scripts, etc. The application **must** be wrapped in this provider!

```tsx filename="app/layout.tsx"
import { RobinProvider } from "robindoc";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <RobinProvider>{/* ... */}</RobinProvider>;
};
```

## Usage

For more details on using `RobinProvider`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
