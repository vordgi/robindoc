import "./modal.scss";

import React from "react";

import { Backdrop } from "../backdrop";

export interface ModalProps {
    onClose(): void;
    open: boolean;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ open, onClose, children }) => {
    return (
        <>
            <Backdrop open={open} onClose={onClose} />
            <div className={`r-modal${open ? " _visible" : ""}`}>{children}</div>
        </>
    );
};
