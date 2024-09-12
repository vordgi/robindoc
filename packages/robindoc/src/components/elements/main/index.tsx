import React from "react";

import { Container } from "../../ui/container";

import "./main.scss";

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-main">
            {children}
        </Container>
    );
};
