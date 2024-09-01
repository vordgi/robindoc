"use client";

import React, { useContext } from "react";
import { RegisterContext } from "../../contexts/anchor-context";

interface HeadingProps extends React.PropsWithChildren {
    id: string;
    component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({ component: Component, id, children }) => {
    const register = useContext(RegisterContext);
    return (
        <Component id={id} className={`r-${Component}`} ref={register}>
            {children}
        </Component>
    );
};
