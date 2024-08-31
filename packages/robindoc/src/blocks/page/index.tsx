import React from "react";
import { Main } from "../../components/main";
import { Sidebar, type SidebarProps } from "../../components/sidebar";
import { Article, type ArticleProps } from "../../components/article";

export type PageProps = ArticleProps & SidebarProps;

export const Page: React.FC<PageProps> = ({ link, pathname, tree, ...articleProps }) => {
    return (
        <Main>
            <Sidebar tree={tree} link={link} pathname={pathname} />
            <Article link={link} pathname={pathname} {...articleProps} />
        </Main>
    );
};
