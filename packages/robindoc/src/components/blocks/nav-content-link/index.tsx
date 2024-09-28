"use client";

import React from "react";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";
import { ContentLink, type ContentLinkProps } from "@src/components/ui/content-link";

interface NavContentLinkProps extends ContentLinkProps {
    link?: React.ElementType;
}

export const NavContentLink: React.FC<NavContentLinkProps> = ({ onClick, ...props }) => {
    const { listeners } = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        [...listeners].forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <ContentLink onClick={clickHandler} {...props} />;
};
