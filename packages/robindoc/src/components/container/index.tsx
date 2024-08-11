import "./container.scss";
import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => (
    <div className={`r-container${className ? ` ${className}` : ""}`} {...props}>
        {children}
    </div>
);
