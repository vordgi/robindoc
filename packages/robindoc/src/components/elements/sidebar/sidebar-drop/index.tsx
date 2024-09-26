"use client";

import React, { useEffect, useRef } from "react";
import { useSidebarStore } from "@src/components/contexts/sidebar/use-sidebar-store";

export interface SidebarDropProps {
    defaultOpen?: boolean;
    label: string;
    id: string;
}

export const SidebarDrop: React.FC<React.PropsWithChildren<SidebarDropProps>> = ({
    children,
    id,
    defaultOpen,
    label,
}) => {
    const { add, remove, has } = useSidebarStore();
    const dropdownRef = useRef<HTMLUListElement>(null);

    const toggleHandler = (e: React.MouseEvent<HTMLDetailsElement>) => {
        if (e.currentTarget.open) {
            e.currentTarget.style.removeProperty("--drop-height");
            remove(id);
        } else {
            if (dropdownRef.current?.offsetHeight) {
                e.currentTarget.style.setProperty("--drop-height", dropdownRef.current.offsetHeight.toString() + "px");
            }
            add(id);
        }
    };

    useEffect(() => {
        if (defaultOpen) add(id);
    }, [defaultOpen]);

    return (
        <details className="r-sidebar-drop" open={has(id) || defaultOpen} onClick={toggleHandler}>
            <summary className="r-sidebar-drop-btn" aria-label={label}>
                <svg
                    className="r-sidebar-drop-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </summary>
            <ul className="r-sidebar-list r-sidebar-sublist" ref={dropdownRef}>
                {children}
            </ul>
        </details>
    );
};
