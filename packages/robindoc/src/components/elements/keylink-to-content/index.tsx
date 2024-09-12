import React from "react";

import { Keylink } from "../../ui/keylink";

import "./keylink-to-content.scss";

export type KeylinkToContentProps = {
    translations?: {
        /** Skip to main content */
        skipToMainContent?: string;
    };
};

export const KeylinkToContent: React.FC<KeylinkToContentProps> = ({ translations }) => {
    const { skipToMainContent = "Skip to main content" } = translations || {};

    return (
        <Keylink className="keylink-to-content" toId="main-content">
            {skipToMainContent}
        </Keylink>
    );
};
