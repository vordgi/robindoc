"use client";

import React, { forwardRef } from "react";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    link?: React.ElementType;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ link: Link = "a", onClick, ...props }, ref) => {
    const { listeners } = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        [...listeners].forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <Link ref={ref} onClick={clickHandler} {...props} />;
});
