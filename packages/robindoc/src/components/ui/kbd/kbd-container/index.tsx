import React from "react";

import "./kbd-container.scss";

export interface KbdContainerProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export const KbdContainer: React.FC<KbdContainerProps> = ({ className, ...props }) => (
    <kbd className={`r-kbd-container${className ? ` ${className}` : ""}`} {...props} />
);
