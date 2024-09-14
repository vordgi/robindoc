import React from "react";

import { Keylink } from "@src/components/ui/keylink";

import "./keylink-to-navigation.scss";

export type KeylinkToNavigationProps = {
    translations?: {
        /** Return to navigation */
        returnToNavigation?: string;
    };
};

export const KeylinkToNavigation: React.FC<KeylinkToNavigationProps> = ({ translations }) => {
    const { returnToNavigation = "Return to navigation" } = translations || {};

    return (
        <Keylink className="keylink-to-navigation" toId="navigation">
            {returnToNavigation}
        </Keylink>
    );
};
