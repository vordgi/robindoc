import "./main.scss";
import React from "react";
import { Container } from "../container";

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-main">
            {children}
        </Container>
    );
};
