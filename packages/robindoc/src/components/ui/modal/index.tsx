import React from "react";
import clsx from "clsx";

import { Backdrop } from "../backdrop";

import "./modal.scss";

export interface ModalProps {
    onClose(): void;
    open: boolean;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ open, onClose, children }) => {
    return (
        <>
            <Backdrop open={open} onClose={onClose} />
            <div className={clsx("r-modal", open && "_visible")}>{children}</div>
        </>
    );
};
