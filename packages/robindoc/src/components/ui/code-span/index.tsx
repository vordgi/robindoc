import React from "react";
import clsx from "clsx";

import "./code-span.scss";

interface CodeSpanProps {
    code: string;
    className?: string;
}

export const CodeSpan: React.FC<CodeSpanProps> = ({ className, code }) => {
    return <code className={clsx("r-code-span", className)} dangerouslySetInnerHTML={{ __html: code }} />;
};
