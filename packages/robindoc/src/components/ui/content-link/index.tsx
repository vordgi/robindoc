import React from "react";
import clsx from "clsx";

import "./content-link.scss";

interface ContentLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    link?: React.ElementType;
}

export const ContentLink: React.FC<ContentLinkProps> = ({ link: Link = "a", className, ...props }) => {
    return <Link className={clsx("r-content-link", className)} {...props} />;
};
