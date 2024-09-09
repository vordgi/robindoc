"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "../../contexts/navigate/use-navigate";
import "./header-menu.scss";

export const HeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { addListener, removeListener } = useNavigate();
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

    useEffect(
        () => () => {
            closeHandler();
        },
        [],
    );

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
