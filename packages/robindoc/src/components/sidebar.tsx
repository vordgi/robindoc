import React from "react";
import { SidebarMenu } from "./sidebar-menu";

type LinkItem = {
    title: string;
    icon?: React.ElementType;
    href?: string;
    type?: "row" | "heading";
    items?: LinkItem[];
};

export type SidebarProps = {
    links: LinkItem[];
    link?: React.ElementType;
};

const LinkItem: React.FC<{ item: LinkItem; link?: React.ElementType; depth: number }> = ({
    item,
    link: Link = "a",
    depth,
}) => (
    <li className={`r-sidebar-li r-sidebar-li-d${depth}`}>
        {item.href ? (
            <Link href={item.href} className={`r-sidebar-link${item.type === "heading" ? " r-sidebar-heading" : ""}`}>
                {item.title}
            </Link>
        ) : (
            <p className={`r-sidebar-p${item.type === "heading" ? " r-sidebar-heading" : ""}`}>{item.title}</p>
        )}
        {item.items && (
            <details className="r-sidebar-drop">
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
                        />
                    ))}
                </ul>
            </details>
        )}
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ links, link: Link }) => (
    <SidebarMenu>
        <nav className="r-sidebar-nav">
            <ul className="r-sidebar-list">
                {links.map((link) => (
                    <LinkItem item={link} link={Link} key={link.href + link.title} depth={0} />
                ))}
            </ul>
        </nav>
    </SidebarMenu>
);
