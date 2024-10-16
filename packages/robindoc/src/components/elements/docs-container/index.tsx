import React from "react";

import { Container } from "@src/components/ui/container";

import "./docs-container.scss";

export const DocsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-docs-container">
            {children}
        </Container>
    );
};
