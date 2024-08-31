"use client";

import React, { useContext, useEffect, useState } from "react";
import { NavigateContext } from "../../contexts/navigate-context";
import "./header-menu.scss";

export const HeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { addListener, removeListener } = useContext(NavigateContext);
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        document.documentElement.classList.add("body-mobile-lock");
        setOpened(true);
        addListener("closeHeaderMenu", closeHandler);
    };

    const closeHandler = () => {
        document.documentElement.classList.remove("body-mobile-lock");
        setOpened(false);
        removeListener("closeHeaderMenu");
    };

    const toggleHandler = () => {
        if (opened) {
            closeHandler();
        } else {
            openHandler();
        }
    };

    useEffect(() => () => {
        removeListener("closeHeaderMenu");
    });

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
