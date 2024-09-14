import React from "react";
import clsx from "clsx";

import "./ordered-list.scss";

interface OrderedListProps {
    className?: string;
}

export const OrderedList: React.FC<React.PropsWithChildren<OrderedListProps>> = ({ className, children }) => {
    return <ol className={clsx("r-ol", className)}>{children}</ol>;
};
