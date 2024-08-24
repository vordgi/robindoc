import React from "react";
import { Main } from "../../components/main";
import { Sidebar, type SidebarProps } from "../../components/sidebar";
import { Article, type ArticleProps } from "../../components/article";

export type DocumentProps = ArticleProps & SidebarProps;

export const Document: React.FC<DocumentProps> = ({ link, pathname, links, ...articleProps }) => {
    return (
        <Main>
            <Sidebar links={links} link={link} pathname={pathname} />
            <Article link={link} pathname={pathname} {...articleProps} />
        </Main>
    );
};
