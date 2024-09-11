import "./keylink-to-navigation.scss";
import React from "react";
import { Keylink } from "../../ui/keylink";

export const KeylinkToNavigation: React.FC = () => {
    return (
        <Keylink className="keylink-to-navigation" id="navigation">
            Return to navigation
        </Keylink>
    );
};
