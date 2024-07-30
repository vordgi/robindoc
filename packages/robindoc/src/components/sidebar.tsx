import React from "react";
import { SidebarMenu } from "./sidebar-menu";

export type SidebarNavProps = {
    links: { href: string; title: string }[];
    link?: React.ElementType;
};

export const Sidebar: React.FC<SidebarNavProps> = ({ links, link: Link = "a" }) => (
    <SidebarMenu>
        <nav className="r-sidebar-nav">
            <ul className="r-sidebar-list">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="r-sidebar-link">
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </SidebarMenu>
);
