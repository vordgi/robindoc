import React from "react";

import { SidebarMenu } from "./sidebar-menu";
import { NavLink } from "../../blocks/nav-link";
import { SidebarDrop } from "./sidebar-drop";

import "./sidebar.scss";

export type TreeItem = {
    title: string;
    href?: string;
    type?: "row" | "heading";
    items?: TreeItem[] | null;
};

const checkIsTargetSection = (item: TreeItem, pathname?: string) => {
    if (!pathname) return false;
    if (item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "")) return true;
    if (item.items?.find((el) => checkIsTargetSection(el, pathname))) return true;
    return false;
};

type LinkBranchProps = {
    branch: TreeItem;
    link?: React.ElementType;
    pathname?: string;
    depth: number;
    translations?: {
        /** Expand {title} */
        expandTitle?: string;
    };
};

const LinkBranch: React.FC<LinkBranchProps> = ({ branch, link, pathname, depth, translations }) => {
    const { expandTitle = "Expand {title}" } = translations || {};

    return (
        <li className={`r-sidebar-li${branch.items && branch.items.length > 0 ? " _droppable" : ""}`}>
            {branch.href ? (
                <NavLink
                    link={link}
                    href={branch.href}
                    className={`r-sidebar-link${branch.type === "heading" ? " r-sidebar-heading" : ""}${pathname && branch.href && pathname === new URL(branch.href, "http://r").pathname?.replace(/\/$/, "") ? " _active" : ""}${checkIsTargetSection(branch, pathname) ? " _target" : ""}`}
                >
                    {branch.title}
                </NavLink>
            ) : (
                <p className={`r-sidebar-p${branch.type === "heading" ? " r-sidebar-heading" : ""}`}>{branch.title}</p>
            )}
            {branch.items && branch.items.length > 0 && (
                <SidebarDrop defaultOpen={checkIsTargetSection(branch, pathname)} id={branch.href + branch.title}>
                    <summary className="r-sidebar-drop-btn" aria-label={expandTitle.replace("{title}", branch.title)}>
                        <svg
                            className="r-sidebar-drop-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </summary>
                    <ul className="r-sidebar-list r-sidebar-sublist">
                        {branch.items.map((item) => (
                            <LinkBranch
                                branch={item}
                                link={link}
                                key={item.href + item.title}
                                depth={depth >= 4 ? 4 : depth + 1}
                                pathname={pathname}
                                translations={translations}
                            />
                        ))}
                    </ul>
                </SidebarDrop>
            )}
        </li>
    );
};

export type SidebarProps = {
    tree?: TreeItem[] | null;
    link?: React.ElementType;
    pathname?: string;
    translations?: LinkBranchProps["translations"];
};

export const Sidebar: React.FC<SidebarProps> = ({ tree, pathname, link, translations }) => {
    if (!tree?.length) return <div className="r-sidebar" />;

    return (
        <>
            <div className="r-sidebar-top-mock" />
            <SidebarMenu>
                <nav className="r-sidebar-nav" id="navigation">
                    <ul className="r-sidebar-list">
                        {tree.map((item) => (
                            <LinkBranch
                                pathname={pathname?.replace(/\/$/, "")}
                                branch={item}
                                link={link}
                                key={item.href + item.title}
                                depth={0}
                                translations={translations}
                            />
                        ))}
                    </ul>
                </nav>
            </SidebarMenu>
        </>
    );
};
