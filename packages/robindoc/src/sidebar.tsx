import React from "react";
import { SidebarMenu } from "./sidebar-menu";

export type SidebarNavProps = {
    links: { href: string; title: string }[];
};

export const Sidebar: React.FC<SidebarNavProps> = ({ links }) => (
    <SidebarMenu>
        <nav className="r-sidebar-nav">
            <ul className="r-sidebar-list">
                {links.map((link) => (
                    <li key={link.href}>
                        <a href={link.href} className="r-sidebar-link">
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </SidebarMenu>
);
