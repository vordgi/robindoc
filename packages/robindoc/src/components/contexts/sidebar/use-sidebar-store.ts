"use client";

import { useCallback, useContext } from "react";
import { SidebarContext } from "./context";

export const useSidebarStore = () => {
    const openedSections = useContext(SidebarContext);

    const add = useCallback((id: string) => {
        if (!openedSections.includes(id)) {
            openedSections.push(id);
        }
    }, []);

    const remove = useCallback((id: string) => {
        if (openedSections.includes(id)) {
            openedSections.splice(openedSections.indexOf(id), 1);
        }
    }, []);

    const has = useCallback((id: string) => {
        return openedSections.includes(id);
    }, []);

    return { add, remove, has };
};
