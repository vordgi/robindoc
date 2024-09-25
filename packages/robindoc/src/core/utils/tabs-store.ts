export const saveTab = (tabsKey: string, tab: string) => {
    const store = localStorage.getItem("r-tabs");
    const items = store?.split(";").filter((item) => item && !item.startsWith(`${tabsKey}=`)) || [];
    items.push(`${tabsKey}=${tab}`);
    localStorage.setItem("r-tabs", items.join(";"));
};

export const clearTabs = () => {
    localStorage.removeItem("r-tabs");
};

export const getTab = (tabsKey: string) => {
    const store = localStorage.getItem("r-tabs");
    const tab = store?.split(";").find((item) => item && item.startsWith(`${tabsKey}=`));
    return tab?.substring(tabsKey.length) || null;
};

export const getTabs = () => {
    const store = localStorage.getItem("r-tabs");
    const items = store?.split(";").filter((item) => item && /[\w-]+=[\w]+/.test(item)) || [];
    return items.map((item) => item.split("="));
};
