# RobinProvider

`RobinProvider` is the general provider for Robindoc documentation. It contains all the necessary contexts, settings, scripts, etc. The application **must** be wrapped in this provider!

```tsx
import { RobinProvider } from "robindoc";

export const Layout = ({ children }) => {
  return <RobinProvider>{/* ... */}</RobinProvider>;
};
```

## Usage

The specific usage of the element depends on the chosen framework. For more details on using `RobinProvider`, refer to the section [App organization](../../getting-started/app-organization/README.md).
