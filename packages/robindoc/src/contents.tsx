"use client";

import React, { useContext } from "react";
import { CurrentSectionContext } from "./anchor-provider";

interface ContentsProps extends React.PropsWithChildren {
    headings: { id: string; nested: boolean; title: string }[];
}

export const Contents: React.FC<ContentsProps> = ({ headings }) => {
    const currentSection = useContext(CurrentSectionContext);
    return (
        <div className="r-contents">
            <div className="r-contents-sticky">
                <div className="r-contents-title">On this page</div>
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
        </div>
    );
};
