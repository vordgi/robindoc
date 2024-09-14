import React from "react";
import clsx from "clsx";

import "./keylink.scss";

export type KeylinkProps = React.PropsWithChildren<{ toId: string; className?: string }>;

export const Keylink: React.FC<KeylinkProps> = ({ toId, className, children }) => {
    return (
        <a href={`#${toId}`} className={clsx("r-keylink", className)}>
            {children}
        </a>
    );
};
