"use client";

import React from "react";
import clsx from "clsx";
import { saveTab } from "@src/core/utils/tabs-store";

export interface TabsHeaderProps {
    tabs: { name: string; id: string }[];
    tabsTypeId: string;
    type?: "code";
}

const typeClassNames = {
    code: "r-tab-header-code",
};

export const TabsHeader: React.FC<TabsHeaderProps> = ({ tabs, tabsTypeId, type }) => {
    const changeTabHandler = (tab: string) => {
        const classNames = Array.from(document.documentElement.classList);
        classNames.forEach((className) => {
            if (className.startsWith(`r-tabs-global__${tabsTypeId}`)) {
                document.documentElement.classList.remove(className);
            }
        });
        document.documentElement.classList.add(`r-tabs-global__${tabsTypeId}`, `r-tabs-global__${tabsTypeId}_${tab}`);
        saveTab(tabsTypeId, tab);
    };

    return (
        <div className="r-tabs-header">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={clsx(`r-tab-header r-tab-header_${tab.id}`, type && typeClassNames[type])}
                    onClick={() => changeTabHandler(tab.id)}
                >
                    {tab.name}
                </div>
            ))}
        </div>
    );
};
