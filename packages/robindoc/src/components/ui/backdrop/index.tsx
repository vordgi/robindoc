"use client";

import "./backdrop.scss";

import React from "react";

export interface BackdropProps {
    onClose(): void;
    open: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({ open, onClose }) => {
    return <div onClick={onClose} className={`r-backdrop${open ? " _visible" : ""}`} />;
};
