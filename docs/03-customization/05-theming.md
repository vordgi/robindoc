# Theming

Robindoc also provides color customization options. Themes are based on CSS variables.

The main and highly recommended way to change theme colors is to pass them to `RobinProvider`.

```tsx filename="app/layout.tsx" switcher tab="TypeScript"
import { RobinProvider } from "robindoc";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <RobinProvider
        theme={{
          colors: {
            primary: {
              50: "#f0f9ff",
              100: "#cffafe",
              200: "#a5f3fc",
              300: "#67e8f9",
              400: "#22d3ee",
              500: "#06b6d4",
              600: "#0891b2",
              700: "#0e7490",
              800: "#155e75",
              900: "#164e63",
              950: "#083344",
            },
          },
        }}
      >
        {/* ... */}
      </RobinProvider>
    </body>
  </html>
);

export default RootLayout;
```

```jsx filename="app/layout.jsx" switcher tab="JavaScript"
import { RobinProvider } from "robindoc";

const RootLayout = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <RobinProvider
        theme={{
          colors: {
            primary: {
              50: "#f0f9ff",
              100: "#cffafe",
              200: "#a5f3fc",
              300: "#67e8f9",
              400: "#22d3ee",
              500: "#06b6d4",
              600: "#0891b2",
              700: "#0e7490",
              800: "#155e75",
              900: "#164e63",
              950: "#083344",
            },
          },
        }}
      >
        {/* ... */}
      </RobinProvider>
    </body>
  </html>
);

export default RootLayout;
```

The provider will create a style tag with all the overwritten variables.

<Note>
If you change the CSS variables manually - Robindoc does not guarantee that they will work in future releases, although those passed to the `RobinProvider` will be supported for a while!
</Note>

You can pass hex, rgb, css variables or any other color format.

```ts filename="robin-theme.ts" switcher tab="TypeScript"
import { type Theme } from "robindoc/lib/core/types/theme";

export const robinTheme: Theme = {
  colors: {
    primary: {
      50: "var(--cl-cyan-50)",
      100: "var(--cl-cyan-100)",
      200: "var(--cl-cyan-200)",
      300: "var(--cl-cyan-300)",
      400: "var(--cl-cyan-400)",
      500: "var(--cl-cyan-500)",
      600: "var(--cl-cyan-600)",
      700: "var(--cl-cyan-700)",
      800: "var(--cl-cyan-800)",
      900: "var(--cl-cyan-900)",
      950: "var(--cl-cyan-950)",
    },
  },
};
```

```js filename="robin-theme.js" switcher tab="JavaScript"
/** @type {import('robindoc/lib/core/types/theme').Theme} */
export const robinTheme = {
  colors: {
    primary: {
      50: "var(--cl-cyan-50)",
      100: "var(--cl-cyan-100)",
      200: "var(--cl-cyan-200)",
      300: "var(--cl-cyan-300)",
      400: "var(--cl-cyan-400)",
      500: "var(--cl-cyan-500)",
      600: "var(--cl-cyan-600)",
      700: "var(--cl-cyan-700)",
      800: "var(--cl-cyan-800)",
      900: "var(--cl-cyan-900)",
      950: "var(--cl-cyan-950)",
    },
  },
};
```

<Note>
Don't forget to check accessibility after changing the theme (_for example, through the `LightHouse` accessibility check_).
</Note>
