import React from "react";
import { TabsHeader, type TabsHeaderProps } from "./tabs-header";
import { TabsStyles } from "./tabs-styles";

import "./tabs.scss";

export interface TabsProps {
    insertStyles?: boolean;
    tabsData: { [tabKey: string]: JSX.Element };
    blockKey?: string;
    type?: TabsHeaderProps["type"];
}

export const Tabs: React.FC<TabsProps> = ({ insertStyles, tabsData, blockKey, type }) => {
    const tabs = Object.keys(tabsData);

    if (tabs.length === 1) {
        return tabsData[tabs[0]];
    }

    const tabsKey = blockKey || tabs.sort().join("-");

    return (
        <div className={`r-tabs r-tabs__${tabsKey}`}>
            {insertStyles && <TabsStyles tabs={tabs} tabsKey={tabsKey} />}
            <TabsHeader tabs={tabs} tabsKey={tabsKey} type={type} />
            <div className={`r-tab-list r-tab-list__${tabsKey}`}>
                {tabs.map((tabKey) => (
                    <div key={tabKey} className={`r-tab r-tab_${tabKey}`}>
                        {tabsData[tabKey]}
                    </div>
                ))}
            </div>
        </div>
    );
};
