import React from "react";
import { CodeBlock, type CodeBlockProps } from "@src/components/ui/code-block";
import { CopyButton } from "@src/components/ui/copy-button";

import "./code-section.scss";

export interface CodeSectionProps extends CodeBlockProps {
    filename?: string;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ filename, code, ...props }) => {
    return (
        <div className="r-code-section">
            {filename && (
                <div className="r-code-section-header">
                    <span>{filename}</span>
                    <CopyButton raw={code} />
                </div>
            )}
            <CodeBlock className="r-code-section-block" code={code} {...props} />
        </div>
    );
};
