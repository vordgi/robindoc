import "./key-focus-link.scss";
import React from "react";

export type KeyFocusLink = React.PropsWithChildren<{ id: string; className?: string }>;

export const KeyFocusLink: React.FC<KeyFocusLink> = ({ id, className, children }) => {
    return (
        <a href={`#${id}`} className={`key-focus-link${className ? ` ${className}` : ""}`}>
            {children}
        </a>
    );
};
