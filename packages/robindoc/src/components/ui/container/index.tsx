import "./container.scss";
import React from "react";

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
    <Component className={`r-container${className ? ` ${className}` : ""}`} {...props}>
        {children}
    </Component>
);
