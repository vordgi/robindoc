import "./keylink-to-content.scss";
import React from "react";
import { KeyFocusLink } from "../../components/key-focus-link";

export const KeylinkToContent = () => {
    return (
        <KeyFocusLink className="keylink-to-content" id="main-content">
            Skip to main content
        </KeyFocusLink>
    );
};
