import React from "react";
import clsx from "clsx";

import "./tooltip.scss";

export type TooltipProps = React.PropsWithChildren<{
    className?: string;
    position: keyof typeof positionClassNames;
    visible?: boolean;
}>;

const positionClassNames = {
    "bottom-start": "_bottom-start",
    "bottom-end": "_bottom-end",
};

export const Tooltip: React.FC<TooltipProps> = ({ className, position, children, visible }) => (
    <span className={clsx("r-tooltip", positionClassNames[position], visible && "_visible", className)}>
        {children}
    </span>
);
