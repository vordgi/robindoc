"use client";

import React from "react";
import clsx from "clsx";
import { saveTab } from "@src/core/utils/tabs-store";

export interface TabsHeaderProps {
    tabs: string[];
    tabsKey: string;
    type?: "code";
}

const typeClassNames = {
    code: "r-tab-header-code",
};

export const TabsHeader: React.FC<TabsHeaderProps> = ({ tabs, tabsKey, type }) => {
    const changeTabHandler = (tab: string) => {
        const classNames = Array.from(document.documentElement.classList);
        classNames.forEach((className) => {
            if (className.startsWith(`r-tabs-global__${tabsKey}`)) {
                document.documentElement.classList.remove(className);
            }
        });
        document.documentElement.classList.add(`r-tabs-global__${tabsKey}`, `r-tabs-global__${tabsKey}_${tab}`);
        saveTab(tabsKey, tab);
    };

    return (
        <div className="r-tabs-header">
            {tabs.map((tab) => (
                <div
                    key={tab}
                    className={clsx(`r-tab-header r-tab-header_${tab}`, type && typeClassNames[type])}
                    onClick={() => changeTabHandler(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};
