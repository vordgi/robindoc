import "./sidebar.scss";
import React from "react";
import { SidebarMenu } from "./sidebar-menu";
import { NavLink } from "../nav-link";
import { SidebarDrop } from "./sidebar-drop";

export type TreeItem = {
    title: string;
    href?: string;
    type?: "row" | "heading";
    items?: TreeItem[] | null;
};

export type SidebarProps = {
    tree?: TreeItem[] | null;
    link?: React.ElementType;
    pathname?: string;
};

const checkIsTargetSection = (item: TreeItem, pathname?: string) => {
    if (!pathname) return false;
    if (item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "")) return true;
    if (item.items?.find((el) => checkIsTargetSection(el, pathname))) return true;
    return false;
};

const LinkBranch: React.FC<{ item: TreeItem; link?: React.ElementType; pathname?: string; depth: number }> = ({
    item,
    link: Link,
    pathname,
    depth,
}) => (
    <li className={`r-sidebar-li${item.items && item.items.length > 0 ? " _droppable" : ""}`}>
        {item.href ? (
            <NavLink
                link={Link}
                href={item.href}
                className={`r-sidebar-link${item.type === "heading" ? " r-sidebar-heading" : ""}${pathname && item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "") ? " _active" : ""}${checkIsTargetSection(item, pathname) ? " _target" : ""}`}
            >
                {item.title}
            </NavLink>
        ) : (
            <p className={`r-sidebar-p${item.type === "heading" ? " r-sidebar-heading" : ""}`}>{item.title}</p>
        )}
        {item.items && item.items.length > 0 && (
            <SidebarDrop defaultOpen={checkIsTargetSection(item, pathname)} id={item.href + item.title}>
                <summary className="r-sidebar-drop-btn">
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
                    {item.items.map((link) => (
                        <LinkBranch
                            item={link}
                            link={Link}
                            key={link.href + link.title}
                            depth={depth >= 4 ? 4 : depth + 1}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </SidebarDrop>
        )}
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ tree, pathname, link }) => {
    if (!tree?.length) return <div className="r-sidebar" />;

    return (
        <SidebarMenu>
            <nav className="r-sidebar-nav">
                <ul className="r-sidebar-list">
                    {tree.map((item) => (
                        <LinkBranch
                            pathname={pathname?.replace(/\/$/, "")}
                            item={item}
                            link={link}
                            key={item.href + item.title}
                            depth={0}
                        />
                    ))}
                </ul>
            </nav>
        </SidebarMenu>
    );
};
