"use client";

import React, { useContext } from "react";
import { NavigateContext } from "../../contexts/navigate-context";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    link?: React.ElementType;
}

export const NavLink: React.FC<NavLinkProps> = ({ link: Link = "a", onClick, ...props }) => {
    const navigateListeners = useContext(NavigateContext);

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const listenersClone = [...navigateListeners.listeners];
        listenersClone.forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <Link onClick={clickHandler} {...props} />;
};
