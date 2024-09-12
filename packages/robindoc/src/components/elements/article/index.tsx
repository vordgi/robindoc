import "./article.scss";
import React from "react";

import { type Components } from "../../../core/types/content";
import { type BaseProvider } from "../../../core/providers/base";
import { loadContent } from "../../../core/utils/load-content";
import { ContentsProvider } from "../../contexts/contents/provider";
import { Contents, type ContentsProps } from "../../blocks/contents";
import { Breadcrumbs, type BreadcrumbsProps } from "../../blocks/breadcrumbs";
import { Pagination, type PaginationProps } from "../../blocks/pagination";
import { parseMarkdown } from "./utils";
import { Document } from "./document";
import { LastModified } from "../../blocks/last-modified";

export type ContentProps = {
    title: string;
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    provider?: BaseProvider;
    link?: React.ElementType;
    pathname: string;
    pages?: { clientPath: string; origPath: string }[];
    translations?: {
        /** Last modified on */
        lastModifiedOn?: string;
    };
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

export type ArticleProps = Partial<PaginationProps> &
    Partial<BreadcrumbsProps> &
    Omit<ContentsProps, "headings"> &
    ContentProps;

export const Article: React.FC<ArticleProps> = async ({
    components,
    content,
    uri,
    config = {},
    provider,
    hideContents,
    link,
    gitUri: gitUriProp,
    pathname,
    title,
    breadcrumbs,
    prev,
    next,
    pages = [],
    translations,
}) => {
    const {
        lastModifiedOn = "Last modified on",
        editOnService,
        onThisPage,
        next: nextTranslation,
        previous,
    } = translations || {};
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
                gitUri={gitUriProp === null ? null : gitUriProp || gitUri}
                hideContents={hideContents}
                headings={headings}
                translations={{ editOnService, onThisPage }}
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
                {lastModified && <LastModified date={lastModified}>{lastModifiedOn}</LastModified>}
            </div>
            {(prev || next) && (
                <Pagination prev={prev} next={next} link={link} translations={{ next: nextTranslation, previous }} />
            )}
        </ContentsProvider>
    );
};
