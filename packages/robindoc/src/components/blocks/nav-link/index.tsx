"use client";

import React from "react";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    link?: React.ElementType;
}

export const NavLink: React.FC<NavLinkProps> = ({ link: Link = "a", onClick, ...props }) => {
    const { listeners } = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        listeners.forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <Link onClick={clickHandler} {...props} />;
};
