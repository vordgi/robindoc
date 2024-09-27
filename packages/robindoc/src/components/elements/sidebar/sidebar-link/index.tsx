"use client";

import React from "react";
import clsx from "clsx";

import { type TreeItem } from "../types";
import { checkIsTargetPathname, checkIsTargetSection } from "../tools";
import { NavLink } from "@src/components/blocks/nav-link";

type SidebarLinkProps = {
    branch: TreeItem;
    link?: React.ElementType;
    pathname?: string;
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({ link, branch, pathname }) => {
    const isTarget = checkIsTargetSection(branch, pathname);
    return (
        <NavLink
            link={link}
            href={branch.href}
            className={clsx(
                "r-sidebar-link",
                checkIsTargetPathname(branch.href, pathname) && "_active",
                isTarget && "_target",
            )}
            ref={(node) => {
                if (isTarget) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (node as any)?.parentElement?.scrollIntoViewIfNeeded();
                }
            }}
        >
            {branch.title}
        </NavLink>
    );
};