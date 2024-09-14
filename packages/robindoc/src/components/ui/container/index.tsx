import React from "react";
import clsx from "clsx";

import "./container.scss";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    component?: React.ElementType;
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    component: Component = "div",
    children,
    className,
    ...props
}) => (
    <Component className={clsx("r-container", className)} {...props}>
        {children}
    </Component>
);
