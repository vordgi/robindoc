import React from "react";
import clsx from "clsx";

import "./kbd-container.scss";

export interface KbdContainerProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export const KbdContainer: React.FC<KbdContainerProps> = ({ className, ...props }) => (
    <kbd className={clsx("r-kbd-container", className)} {...props} />
);
