import React from "react";

import { Container } from "@src/components/ui/container";

import "./page-container.scss";

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-page-container">
            {children}
        </Container>
    );
};
