import React from "react";
import clsx from "clsx";

import { OrderedList, type OrderedListProps } from "../../list";

import "./task-ordered-list.scss";

export const TaskOrderedList: React.FC<React.PropsWithChildren<OrderedListProps>> = ({
    className,
    start,
    children,
}) => {
    return (
        <OrderedList className={clsx("r-task-ol", className)} start={start}>
            {children}
        </OrderedList>
    );
};
