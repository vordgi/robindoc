"use client";

import React, { useState } from "react";

export const SidebarMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [opened, setOpened] = useState(false);
    const openHandler = () => {
        document.documentElement.classList.add("body-mobile-lock");
        setOpened(true);
    };
    const closeHandler = () => {
        document.documentElement.classList.remove("body-mobile-lock");
        setOpened(false);
    };
    const toggleHandler = () => {
        if (opened) {
            closeHandler();
        } else {
            openHandler();
        }
    };

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
                    <span>Menu</span>
                </button>
                {children}
            </div>
        </>
    );
};