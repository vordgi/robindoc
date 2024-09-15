"use client";

import React, { useState } from "react";
import clsx from "clsx";

import "./copy-button.scss";

interface CopyButtonProps {
    raw: string;
    translations?: {
        /** Copy */
        copy?: string;
    };
}

export const CopyButton: React.FC<CopyButtonProps> = ({ translations, raw }) => {
    const { copy = "Copy" } = translations || {};
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);
    const clickHandler = () => {
        if (copyTimeout) clearTimeout(copyTimeout);
        setCopyTimeout(
            setTimeout(() => {
                setCopyTimeout(null);
            }, 1000),
        );
        navigator.clipboard.writeText(raw);
    };

    return (
        <button tabIndex={-1} onClick={clickHandler} className={clsx("copy-button", copyTimeout && "_active")}>
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <title>{copy}</title>
                {copyTimeout ? (
                    <path d="M20 6 9 17l-5-5" key="path" />
                ) : (
                    <>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    </>
                )}
            </svg>
        </button>
    );
};
