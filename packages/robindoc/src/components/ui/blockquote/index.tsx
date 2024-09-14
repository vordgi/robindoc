import React from "react";
import clsx from "clsx";

import "./blockquote.scss";

interface BlockquoteProps {
    className?: string;
}

export const Blockquote: React.FC<React.PropsWithChildren<BlockquoteProps>> = ({ className, children }) => {
    return <blockquote className={clsx("r-blockquote", className)}>{children}</blockquote>;
};
