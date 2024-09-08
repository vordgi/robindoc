import "./keylink-to-navigation.scss";
import React from "react";
import { KeyFocusLink } from "../../components/key-focus-link";

export const KeylinkToNavigation = () => {
    return (
        <KeyFocusLink className="keylink-to-navigation" id="navigation">
            Return to navigation
        </KeyFocusLink>
    );
};
