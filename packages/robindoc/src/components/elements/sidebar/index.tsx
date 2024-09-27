import React from "react";
import clsx from "clsx";

import { type TreeItem } from "./types";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarDrop } from "./sidebar-drop";
import { SidebarLink } from "./sidebar-link";
import { checkIsTargetSection } from "./tools";

import "./sidebar.scss";

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
        <li
            className={clsx(
                "r-sidebar-li",
                branch.type === "heading" && "r-sidebar-heading",
                branch.items && branch.items.length > 0 && "_droppable",
            )}
        >
            {branch.href ? (
                <SidebarLink link={link} branch={branch} pathname={pathname} />
            ) : (
                <p className={clsx("r-sidebar-p", branch.type === "heading" && "r-sidebar-heading")}>{branch.title}</p>
            )}
            {branch.items && branch.items.length > 0 && (
                <SidebarDrop
                    defaultOpen={checkIsTargetSection(branch, pathname)}
                    id={branch.href + branch.title}
                    label={expandTitle.replace("{title}", branch.title)}
                >
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
