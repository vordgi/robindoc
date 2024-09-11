import "./keylink-to-content.scss";
import React from "react";
import { Keylink } from "../../ui/keylink";

export const KeylinkToContent: React.FC = () => {
    return (
        <Keylink className="keylink-to-content" id="main-content">
            Skip to main content
        </Keylink>
    );
};
