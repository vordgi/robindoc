import React from "react";
import clsx from "clsx";

import { OrderedList } from "../../list";

import "./task-ordered-list.scss";

interface TaskOrderedListProps {
    className?: string;
}

export const TaskOrderedList: React.FC<React.PropsWithChildren<TaskOrderedListProps>> = ({ className, children }) => {
    return <OrderedList className={clsx("r-task-ol", className)}>{children}</OrderedList>;
};
