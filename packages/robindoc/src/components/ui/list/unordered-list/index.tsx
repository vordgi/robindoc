import React from "react";
import clsx from "clsx";

import "./unordered-list.scss";

interface UnorderedListProps {
    className?: string;
}

export const UnorderedList: React.FC<React.PropsWithChildren<UnorderedListProps>> = ({ className, children }) => {
    return <ul className={clsx("r-ul", className)}>{children}</ul>;
};
