"use client";

import React, { useEffect, useState } from "react";

import { useNavigate } from "../../../contexts/navigate/use-navigate";

export type SidebarMenuProps = React.PropsWithChildren<{
    translations?: {
        menu?: string;
    };
}>;

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children, translations }) => {
    const { menu = "Menu" } = translations || {};
    const { addListener, removeListener } = useNavigate();
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        document.documentElement.classList.add("body-mobile-lock");
        setOpened(true);
        addListener("closeSidebarMenu", closeHandler);
    };

    const closeHandler = () => {
        document.documentElement.classList.remove("body-mobile-lock");
        setOpened(false);
        removeListener("closeSidebarMenu");
    };

    const toggleHandler = () => {
        if (opened) {
            closeHandler();
        } else {
            openHandler();
        }
    };

    useEffect(
        () => () => {
            closeHandler();
        },
        [],
    );

    return (
        <>
            <span className="r-sidebar-space" />
            <div className={`r-sidebar${opened ? " _opened" : ""}`}>
                <button className="r-sidebar-btn" onClick={toggleHandler}>
                    <svg
                        className="r-sidebar-chevron"
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
                    <span>{menu}</span>
                </button>
                {children}
            </div>
        </>
    );
};