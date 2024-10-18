"use client";

import React, { forwardRef } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";
import { ExternalMark } from "@src/components/ui/external-mark";
import { checkIsLinkExternal } from "@src/core/utils/path-tools";

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.PropsWithChildren<LinkProps> & {
        activeClassName?: string;
        targetClassName?: string;
    };

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ onClick, className, href, targetClassName, activeClassName, children, ...props }, ref) => {
        const { listeners } = useNavigate();
        const pathname = usePathname();

        const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
            [...listeners].forEach((el) => el.listener());
            if (onClick) onClick(e);
        };
        const isLinkExternal = checkIsLinkExternal(href);
        const additionalProps = isLinkExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

        return (
            <Link
                href={href}
                className={clsx(
                    pathname.startsWith(href) && targetClassName,
                    pathname === href && activeClassName,
                    className,
                )}
                ref={ref}
                onClick={clickHandler}
                {...additionalProps}
                {...props}
            >
                {children}
                {isLinkExternal && <ExternalMark />}
            </Link>
        );
    },
);
