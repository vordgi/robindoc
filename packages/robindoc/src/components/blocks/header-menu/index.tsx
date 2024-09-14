"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "@src/components/contexts/navigate/use-navigate";

import "./header-menu.scss";

export type HeaderMenuProps = React.PropsWithChildren<{
    translations?: {
        /** Menu */
        menu?: string;
    };
}>;

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ children, translations }) => {
    const { menu = "Menu" } = translations || {};
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
        <div className={clsx("r-header-menu", opened && "_opened")}>
            <div className="r-header-responsive">{children}</div>
            <button type="button" className="r-header-burger" onClick={toggleHandler} aria-label={menu}>
                <span className="r-burger-line _top" />
                <span className="r-burger-line _bottom" />
            </button>
        </div>
    );
};
