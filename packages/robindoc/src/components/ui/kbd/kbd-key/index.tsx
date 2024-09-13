import React from "react";

import "./kbd-key.scss";

export interface KbdKeyProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export const KbdKey: React.FC<KbdKeyProps> = ({ className, ...props }) => (
    <kbd className={`r-kbd-key${className ? ` ${className}` : ""}`} {...props} />
);
