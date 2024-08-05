import React from "react";
import { Main } from "../components/main";
import { Sidebar, type SidebarProps } from "../components/sidebar";
import { Article, type ArticleProps } from "../components/article";

export type DocumentProps = ArticleProps &
    Omit<SidebarProps, "links"> & {
        links?: SidebarProps["links"] | null;
    };

export const Document: React.FC<DocumentProps> = ({ link, pathname, links, ...articleProps }) => {
    return (
        <Main>
            {links && links.length > 0 && <Sidebar links={links} link={link} pathname={pathname} />}
            <Article link={link} {...articleProps} />
        </Main>
    );
};
