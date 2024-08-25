import "./article.scss";
import React from "react";

import { type Components } from "../../types/content";
import { type BaseProvider } from "../../providers/base";
import { loadContent } from "../../utils/load-content";
import { AnchorProvider } from "../anchor-provider";
import { Contents, type ContentsProps } from "../contents";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";
import { Pagination, type PaginationProps } from "../pagination";
import { parseTree } from "./utils";
import { Document } from "./document";

export type ContentProps = {
    title: string;
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    provider?: BaseProvider;
    hideContents?: boolean;
    link?: React.ElementType;
    editOnGitUri?: ContentsProps["editOnGitUri"];
    pathname: string;
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

export type ArticleProps = Partial<PaginationProps> & Partial<BreadcrumbsProps> & ContentProps;

export const Article: React.FC<ArticleProps> = async ({
    components,
    content,
    uri,
    config = {},
    provider,
    hideContents,
    link,
    editOnGitUri,
    pathname,
    title,
    breadcrumbs,
    prev,
    next,
}) => {
    const { data, provider: targetProvider } =
        content || !uri ? { data: content, provider: null } : await loadContent(uri, provider);

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const { headings, tree } = parseTree(data);
    const gitUri = uri && (await targetProvider?.getGitUri?.(uri));
    console.log(gitUri);

    return (
        <AnchorProvider>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <Breadcrumbs breadcrumbs={breadcrumbs} title={title} link={link} />
            )}
            <Contents
                editOnGitUri={editOnGitUri === null ? null : editOnGitUri || gitUri}
                hideContents={hideContents}
                headings={headings}
            />
            <div className="r-article">
                <Document
                    headings={headings}
                    tree={tree}
                    components={components}
                    config={config}
                    link={link}
                    targetProvider={targetProvider}
                    pathname={pathname}
                    uri={uri}
                />
            </div>
            {(prev || next) && <Pagination prev={prev} next={next} link={link} />}
        </AnchorProvider>
    );
};
