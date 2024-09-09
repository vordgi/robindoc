"use client";

import "./contents.scss";
import React from "react";
import { useHeadingIndex } from "../../contexts/contents/use-heading-index";
import { detectGitType } from "../../utils/git-data";

export interface ContentsProps extends React.PropsWithChildren {
    headings: { id: string; nested: boolean; title: string | JSX.Element }[];
    hideContents?: boolean;
    editOnGitUri?: string | null;
}

export const Contents: React.FC<ContentsProps> = ({ headings, hideContents, editOnGitUri }) => {
    const headingIndex = useHeadingIndex();

    return (
        <div className="r-contents">
            <div className="r-contents-sticky">
                {headings.length > 0 && !hideContents && (
                    <>
                        <input type="checkbox" className="r-contents-control" id="r-contents" />
                        <div className="r-contents-details">
                            <label className="r-contents-title" htmlFor="r-contents">
                                On this page
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
                            <div className="r-contents-list">
                                {headings.map((heading, index) => (
                                    <a
                                        href={`#${heading.id}`}
                                        key={heading.id}
                                        className={`r-contents-link${heading.nested ? " _nested" : ""}${headingIndex !== null && index <= headingIndex ? " _passed" : ""}${headingIndex === index ? " _active" : ""}`}
                                    >
                                        {heading.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {editOnGitUri?.match(/^https?:\/\//) && (
                    <div className="r-contents-actions">
                        <a href={editOnGitUri} target="_blank" rel="noopener noreferrer" className="r-contents-git">
                            Edit on {detectGitType(editOnGitUri).name}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
