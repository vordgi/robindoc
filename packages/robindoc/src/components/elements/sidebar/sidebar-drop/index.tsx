"use client";

import React, { useEffect } from "react";
import { useSidebarStore } from "../../../contexts/sidebar/use-sidebar-store";

export const SidebarDrop: React.FC<React.PropsWithChildren<{ defaultOpen?: boolean; id: string }>> = ({
    children,
    id,
    defaultOpen,
}) => {
    const { add, remove, has } = useSidebarStore();
    const toggleHandler = (e: React.MouseEvent<HTMLDetailsElement>) => {
        if (e.currentTarget.open) {
            remove(id);
        } else {
            add(id);
        }
    };

    useEffect(() => {
        if (defaultOpen) add(id);
    }, [defaultOpen]);

    return (
        <details className="r-sidebar-drop" open={has(id) || defaultOpen} onClick={toggleHandler}>
            {children}
        </details>
    );
};
