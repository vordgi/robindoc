"use client";

import React, { useContext, useEffect } from "react";
import { SidebarContext } from "../../../contexts/sidebar-context";

export const SidebarDrop: React.FC<React.PropsWithChildren<{ defaultOpen?: boolean; key: string }>> = ({
    children,
    key,
    defaultOpen,
}) => {
    const { openedSections } = useContext(SidebarContext);

    const closeHandler = () => {
        if (openedSections.includes(key)) {
            openedSections.splice(openedSections.indexOf(key), 1);
        }
    };
    const openHandler = () => {
        if (!openedSections.includes(key)) {
            openedSections.push(key);
        }
    };
    const toggle = (e: React.MouseEvent<HTMLDetailsElement>) => {
        console.log("toggle");

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
        <details className="r-sidebar-drop" open={openedSections.includes(key) || defaultOpen} onClick={toggle}>
            {children}
        </details>
    );
};
