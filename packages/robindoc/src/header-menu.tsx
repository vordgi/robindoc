"use client";
import React, { useState } from "react";

export const HeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
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
        <div className={`r-header-menu${opened ? " _opened" : ""}`}>
            <div className="r-header-responsive">{children}</div>
            <button type="button" className="r-header-burger" onClick={toggleHandler} aria-label="Menu">
                <span className="r-burger-line _top" />
                <span className="r-burger-line _bottom" />
            </button>
        </div>
    );
};
