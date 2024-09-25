"use client";

import React from "react";
import { saveTab } from "@src/core/utils/tabs-store";

export const TabsHeader: React.FC<{ tabs: string[]; tabsKey: string }> = ({ tabs, tabsKey }) => {
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
                <div key={tab} className={`r-tab-header r-tab-header_${tab}`} onClick={() => changeTabHandler(tab)}>
                    {tab}
                </div>
            ))}
        </div>
    );
};
