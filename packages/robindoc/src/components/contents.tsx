"use client";

import React, { useContext, useState, useMemo } from "react";
import { CurrentSectionContext } from "./anchor-provider";
import { detectGitType } from "../utils/git-data";

export interface ContentsProps extends React.PropsWithChildren {
    headings: { id: string; nested: boolean; title: string }[];
    editOnGitUri?: string | { uri: string; text?: string } | null;
}

export const Contents: React.FC<ContentsProps> = ({ headings, editOnGitUri }) => {
    const [opened, setOpened] = useState(false);
    const currentSection = useContext(CurrentSectionContext);
    const gitUri = useMemo(() => {
        if (!editOnGitUri) return null;

        const uri = typeof editOnGitUri === "string" ? editOnGitUri : editOnGitUri.uri;
        let text: string;
        if (typeof editOnGitUri === "string" || !editOnGitUri.text) {
            text = `Edit on ${detectGitType(uri)}`;
        } else {
            text = editOnGitUri.text;
        }
        return { uri, text };
    }, [editOnGitUri]);

    const toggleHandler = () => {
        if (window.innerWidth < 1080) {
            setOpened(!opened);
        }
    };

    return (
        <div className="r-contents">
            <div className={`r-contents-sticky${opened ? " _opened" : ""}`}>
                {headings.length > 0 && (
                    <>
                        <div className="r-contents-title" onClick={toggleHandler}>
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
                        </div>
                        <div className="r-contents-list">
                            {headings.map((heading, index) => (
                                <a
                                    href={`#${heading.id}`}
                                    key={heading.id}
                                    className={`r-contents-link${heading.nested ? " _nested" : ""}${currentSection !== null && index <= currentSection ? " _passed" : ""}${currentSection === index ? " _active" : ""}`}
                                >
                                    {heading.title}
                                </a>
                            ))}
                        </div>
                    </>
                )}
                {gitUri && (
                    <div className="r-contents-actions">
                        <a href={gitUri.uri} target="_blank" rel="noopener noreferrer" className="r-contents-git">
                            {gitUri.text}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
