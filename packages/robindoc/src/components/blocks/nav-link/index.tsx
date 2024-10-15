"use client";

import React, { forwardRef } from "react";
import Link, { LinkProps } from "next/link";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & React.PropsWithChildren<LinkProps>;

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ onClick, ...props }, ref) => {
    const { listeners } = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        [...listeners].forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <Link ref={ref} onClick={clickHandler} {...props} />;
});
