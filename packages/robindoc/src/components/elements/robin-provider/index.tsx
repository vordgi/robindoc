import React from "react";

import { NavigateProvider } from "@src/components/contexts/navigate/provider";
import { SidebarProvider } from "@src/components/contexts/sidebar/provider";

const clientLogic = () => {
    const userTheme = localStorage.getItem("theme");
    if (userTheme && ["light", "dark"].includes(userTheme)) {
        document.documentElement.classList.add(`theme-\${userTheme}`);
    } else {
        document.documentElement.classList.add(`theme-system`);
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("theme-dark");
        } else {
            document.documentElement.classList.add("theme-light");
        }
    }

    const store = localStorage.getItem("r-tabs");
    const items = store?.split(";").filter((item) => item && /[\w-]+=[\w]+/.test(item)) || [];
    const classNames = Array.from(document.documentElement.classList);
    classNames.forEach((className) => {
        if (className.startsWith(`r-tabs-global`)) {
            document.documentElement.classList.remove(className);
        }
    });
    items.forEach((item) => {
        const [tabsKey, tab] = item.split("=");
        document.documentElement.classList.add(`r-tabs-global__${tabsKey}`, `r-tabs-global__${tabsKey}_${tab}`);
    });
};

export const RobinProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <script
                id="detect-theme"
                dangerouslySetInnerHTML={{
                    __html: `(${clientLogic})()`,
                }}
            />
            <SidebarProvider>
                <NavigateProvider>{children}</NavigateProvider>
            </SidebarProvider>
        </>
    );
};
