import React from "react";
import clsx from "clsx";

import "./ordered-list.scss";

export interface OrderedListProps {
    className?: string;
    start?: number;
}

export const OrderedList: React.FC<React.PropsWithChildren<OrderedListProps>> = ({ className, start, children }) => {
    return (
        <ol className={clsx("r-ol", className)} start={start}>
            {children}
        </ol>
    );
};
