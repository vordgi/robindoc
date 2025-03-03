# RobinProvider

`RobinProvider` is the general provider for Robindoc documentation. It contains all the necessary contexts, settings, scripts, etc. The application **must** be wrapped in this provider!

```tsx filename="app/layout.tsx" switcher tab="TypeScript"
import { RobinProvider } from "robindoc";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RobinProvider>{/* ... */}</RobinProvider>;
);

export default Layout;
```

```jsx filename="app/layout.jsx" switcher tab="JavaScript"
import { RobinProvider } from "robindoc";

const Layout = ({ children }) => (
  <RobinProvider>{/* ... */}</RobinProvider>;
);

export default Layout;
```

## Usage

For more details on using `RobinProvider`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
