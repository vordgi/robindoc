"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useHeadingIndex } from "@src/components/contexts/contents/use-heading-index";
import { detectGitType } from "@src/core/utils/git-data";

import "./contents.scss";

export interface ContentsProps extends React.PropsWithChildren {
    headings: { id: string; nested: boolean; title: string | JSX.Element }[];
    hideContents?: boolean;
    gitUri?: string | null;
    translations?: {
        /** On this page */
        onThisPage?: string;
        /** Edit on {service} */
        editOnService?: string;
    };
}

export const Contents: React.FC<ContentsProps> = ({ headings, hideContents, gitUri, translations }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const headingIndex = useHeadingIndex();
    const { onThisPage = "On this page", editOnService = "Edit on {service}" } = translations || {};

    useEffect(() => {
        if (dropdownContentRef.current && dropdownRef.current) {
            dropdownRef.current.style.setProperty("--drop-height", dropdownContentRef.current.offsetHeight + "px");
        }
    }, []);

    return (
        <div className="r-contents">
            <div className="r-contents-sticky">
                {headings.length > 0 && !hideContents && (
                    <>
                        <input type="checkbox" className="r-contents-control" id="r-contents" />
                        <div className="r-contents-details">
                            <label className="r-contents-title" htmlFor="r-contents">
                                {onThisPage}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="r-contents-chevron"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </label>
                            <div className="r-contents-list" ref={dropdownRef}>
                                <div className="r-contents-list-content" ref={dropdownContentRef}>
                                    {headings.map((heading, index) => (
                                        <a
                                            href={`#${heading.id}`}
                                            key={heading.id}
                                            className={clsx(
                                                "r-contents-link",
                                                heading.nested && "_nested",
                                                headingIndex !== null && index <= headingIndex && "_passed",
                                                headingIndex === index && "_active",
                                            )}
                                        >
                                            {heading.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {gitUri?.match(/^https?:\/\//) && (
                    <div className="r-contents-actions">
                        <a href={gitUri} target="_blank" rel="noopener noreferrer" className="r-contents-git">
                            {editOnService.replace("{service}", detectGitType(gitUri).name)}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
