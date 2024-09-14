import React from "react";
import clsx from "clsx";

interface StrongProps {
    className?: string;
}

export const Strong: React.FC<React.PropsWithChildren<StrongProps>> = ({ className, children }) => {
    return <strong className={clsx("r-strong", className)}>{children}</strong>;
};
