import "./article.scss";
import React from "react";

import { type Components } from "../../types/content";
import { type BaseProvider } from "../../providers/base";
import { loadContent } from "../../utils/load-content";
import { ContentsProvider } from "../../contexts/contents/provider";
import { Contents, type ContentsProps } from "../contents";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";
import { Pagination, type PaginationProps } from "../pagination";
import { parseMarkdown } from "./utils";
import { Document } from "./document";
import { LastModified } from "../last-modified";

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
    pages?: { clientPath: string; origPath: string }[];
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
    pages = [],
}) => {
    const { data, provider: targetProvider } =
        content || !uri ? { data: content, provider: null } : await loadContent(uri, provider);

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const { headings, tokens } = parseMarkdown(data);
    const gitUri = uri && targetProvider && (await targetProvider.getGitUri(uri));
    const lastModified = uri && targetProvider && (await targetProvider.getLastModifiedDate(uri));

    return (
        <ContentsProvider>
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
                    tokens={tokens}
                    pages={pages}
                    components={components}
                    config={config}
                    link={link}
                    targetProvider={targetProvider}
                    pathname={pathname}
                    uri={uri}
                />
                {lastModified && <LastModified date={lastModified}>Last modified on</LastModified>}
            </div>
            {(prev || next) && <Pagination prev={prev} next={next} link={link} />}
        </ContentsProvider>
    );
};
