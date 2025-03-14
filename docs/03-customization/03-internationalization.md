# Internationalization

Robindoc provides manual configuration options for internationalization and multilingualism.

For example, if your documentation is only in French, you can change the interface text to the desired translations. If you have several languages, transfer the necessary translations and configure the desired routing.

## Interface internationalization

Interface localization occurs through the transfer of terms as props for elements.

This is done precisely in order to maintain maximum productivity while leaving the process completely transparent and stable.

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/page.tsx"
import { Page } from "../robindoc";

const Docs = async () => {
  return (
    <Page
      // ...
      translations={{
        editOnService: "Edit on {service}",
        lastModifiedOn: "Last modified on",
        onThisPage: "On this page",
        next: "Next",
        previous: "Previous",
      }}
    />
  );
};
```

> [!TIP]
> Some UI translations may use dynamic parts. Such values ​​are wrapped in curly braces (f.e. `Edit on {service}`). They will be replaced by the framework automatically.

For a current list of terms, see your editor's tooltips for relevant items. The default values ​​are listed in the js-doc.

> [!NOTE]
> Some terms are visible to the user, some are used to improve accessibility.

## Multi language site

You can also add multilingual functionality to the site. You control all routing manually. This way you can configure different paths or domains rather than following a fixed pattern.

```tsx filename="app/[locale]/layout.tsx" switcher tab="TypeScript"
import { Header } from "robindoc";

type Params = Promise<{ locale: string }>;

const LocaleLayout: React.FC<{
  children: React.ReactNode;
  params: Params;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <>
      <Header
        // ...
        locales={{
          list: [
            { key: "en", title: "English", shortTitle: "EN" },
            { key: "de", title: "Deutch", shortTitle: "DE" },
          ],
          target: locale,
          default: "en",
        }}
      />
      {children}
    </>
  );
};
```

```jsx filename="app/[locale]/layout.jsx" switcher tab="JavaScript"
import { Header } from "robindoc";

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <>
      <Header
        // ...
        locales={{
          list: [
            { key: "en", title: "English", shortTitle: "EN" },
            { key: "de", title: "Deutch", shortTitle: "DE" },
          ],
          target: locale,
          default: "en",
        }}
      />
      {children}
    </>
  );
};
```
