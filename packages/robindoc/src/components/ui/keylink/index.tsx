import "./keylink.scss";
import React from "react";

export type KeylinkProps = React.PropsWithChildren<{ id: string; className?: string }>;

export const Keylink: React.FC<KeylinkProps> = ({ id, className, children }) => {
    return (
        <a href={`#${id}`} className={`keylink${className ? ` ${className}` : ""}`}>
            {children}
        </a>
    );
};
