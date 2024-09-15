import React from "react";
import { CodeBlock, type CodeBlockProps } from "@src/components/ui/code-block";

import "./code-section.scss";

export interface CodeSectionProps extends CodeBlockProps {
    filename?: string;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ filename, ...props }) => {
    return (
        <div className="r-code-section">
            {filename && <span className="r-code-section-filename">{filename}</span>}
            <CodeBlock className="r-code-section-block" {...props} />
        </div>
    );
};
