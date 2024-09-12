import "./keylink.scss";
import React from "react";

export type KeylinkProps = React.PropsWithChildren<{ toId: string; className?: string }>;

export const Keylink: React.FC<KeylinkProps> = ({ toId, className, children }) => {
    return (
        <a href={`#${toId}`} className={`keylink${className ? ` ${className}` : ""}`}>
            {children}
        </a>
    );
};
