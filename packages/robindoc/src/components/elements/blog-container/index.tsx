import React from "react";

import { Container } from "@src/components/ui/container";

import "./blog-container.scss";

export const BlogContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-blog-container">
            {children}
        </Container>
    );
};
