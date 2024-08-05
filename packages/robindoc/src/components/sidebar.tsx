import React from "react";
import { SidebarMenu } from "./sidebar-menu";

export type LinkItem = {
    title: string;
    href?: string;
    type?: "row" | "heading";
    items?: LinkItem[] | null;
};

export type SidebarProps = {
    links: LinkItem[];
    link?: React.ElementType;
    pathname?: string;
};

const checkIsTargetSection = (item: LinkItem, pathname?: string) => {
    if (!pathname) return false;
    if (item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "")) return true;
    if (item.items?.find((el) => checkIsTargetSection(el, pathname))) return true;
    return false;
};

const LinkItem: React.FC<{ item: LinkItem; link?: React.ElementType; pathname?: string; depth: number }> = ({
    item,
    link: Link = "a",
    pathname,
    depth,
}) => (
    <li className={`r-sidebar-li r-sidebar-li-d${depth}`}>
        {item.href ? (
            <Link
                href={item.href}
                className={`r-sidebar-link${item.type === "heading" ? " r-sidebar-heading" : ""}${pathname && item.href && pathname === new URL(item.href, "http://r").pathname?.replace(/\/$/, "") ? " _active" : ""}${checkIsTargetSection(item, pathname) ? " _target" : ""}`}
            >
                {item.title}
            </Link>
        ) : (
            <p className={`r-sidebar-p${item.type === "heading" ? " r-sidebar-heading" : ""}`}>{item.title}</p>
        )}
        {item.items && item.items.length > 0 && (
            <details className="r-sidebar-drop" open={checkIsTargetSection(item, pathname)}>
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
                        <LinkItem
                            item={link}
                            link={Link}
                            key={link.href + link.title}
                            depth={depth >= 4 ? 4 : depth + 1}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </details>
        )}
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ links, pathname, link: Link }) => (
    <SidebarMenu>
        <nav className="r-sidebar-nav">
            <ul className="r-sidebar-list">
                {links.map((link) => (
                    <LinkItem
                        pathname={pathname?.replace(/\/$/, "")}
                        item={link}
                        link={Link}
                        key={link.href + link.title}
                        depth={0}
                    />
                ))}
            </ul>
        </nav>
    </SidebarMenu>
);
