import React from "react";
import clsx from "clsx";

import "./code-span.scss";

interface CodeSpanProps {
    className?: string;
}

export const CodeSpan: React.FC<React.PropsWithChildren<CodeSpanProps>> = ({ className, children }) => {
    return <code className={clsx("r-code-span", className)}>{children}</code>;
};
