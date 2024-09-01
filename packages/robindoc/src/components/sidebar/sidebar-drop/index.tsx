"use client";

import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../../../contexts/sidebar-context";

export const SidebarDrop: React.FC<React.PropsWithChildren<{ defaultOpen?: boolean; id: string }>> = ({
    children,
    id,
    defaultOpen,
}) => {
    const { openedSections } = useContext(SidebarContext);

    const closeHandler = () => {
        if (openedSections.includes(id)) {
            openedSections.splice(openedSections.indexOf(id), 1);
        }
    };
    const openHandler = () => {
        if (!openedSections.includes(id)) {
            openedSections.push(id);
        }
    };
    const toggle = (e: React.MouseEvent<HTMLDetailsElement>) => {
        if (e.currentTarget.open) {
            closeHandler();
        } else {
            openHandler();
        }
    };

    useEffect(() => {
        if (defaultOpen) openHandler();
    }, [defaultOpen]);

    return (
        <details className="r-sidebar-drop" open={openedSections.includes(id) || defaultOpen} onClick={toggle}>
            {children}
        </details>
    );
};
