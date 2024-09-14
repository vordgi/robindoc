"use client";

import React from "react";
import clsx from "clsx";

import "./backdrop.scss";

export interface BackdropProps {
    onClose(): void;
    open: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({ open, onClose }) => {
    return <div onClick={onClose} className={clsx("r-backdrop", open && "_visible")} />;
};
