import React from "react";
import clsx from "clsx";

import "./th.scss";

interface ThProps {
    className?: string;
}

export const Th: React.FC<React.PropsWithChildren<ThProps>> = ({ className, children }) => {
    return <th className={clsx("r-th", className)}>{children}</th>;
};
