import React from "react";

export interface TabsStylesProps {
    tabsKey: string;
    tabs: string[];
}

export const TabsStyles: React.FC<TabsStylesProps> = ({ tabsKey, tabs }) => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
html:not(.r-tabs-global__${tabsKey}) .r-tabs__${tabsKey} .r-tab:not(.r-tab_${tabs[0]}) {display: none}
html:not(.r-tabs-global__${tabsKey}) .r-tabs__${tabsKey} .r-tab-header_${tabs[0]} {background: var(--neutral50);z-index: 2;pointer-events: none;color:var(--neutral950)}
${tabs.map((lang) => `.r-tabs-global__${tabsKey}_${lang} .r-tabs__${tabsKey} .r-tab:not(.r-tab_${lang}) {display: none}`).join("")}
${tabs.map((lang) => `.r-tabs-global__${tabsKey}_${lang} .r-tabs__${tabsKey} .r-tab-header_${lang} {background: var(--neutral50);z-index: 2;pointer-events: none;color:var(--neutral950)}`).join("")}
`,
        }}
    />
);
