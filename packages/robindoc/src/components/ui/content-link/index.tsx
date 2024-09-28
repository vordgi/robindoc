import React from "react";
import clsx from "clsx";

import "./content-link.scss";

export interface ContentLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    link?: React.ElementType;
    external?: boolean;
}

export const ContentLink: React.FC<ContentLinkProps> = ({
    link: Link = "a",
    className,
    external,
    children,
    ...props
}) => {
    const additionalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <Link className={clsx("r-content-link", className)} {...additionalProps} {...props}>
            {children}
            {external && (
                <>
                    &nbsp;
                    <span className="r-content-link-external" />
                </>
            )}
        </Link>
    );
};
