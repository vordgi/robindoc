import React from "react";
import clsx from "clsx";

import "./kbd-key.scss";

export interface KbdKeyProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export const KbdKey: React.FC<KbdKeyProps> = ({ className, ...props }) => (
    <kbd className={clsx("r-kbd-key", className)} {...props} />
);
