"use client";

import "./search.scss";

import React, { useEffect, useRef } from "react";

import { SearchModal, type SearchModalProps } from "./search-modal";
import { useSystemType } from "../../../core/hooks/use-system-type";
import { KbdContainer, KbdKey } from "../../ui/kbd";
import { useModal } from "../../ui/modal/use-modal";

export interface SearchProps {
    link?: React.ElementType;
    searcher: SearchModalProps["searcher"];
    translations?: {
        /** Search... */
        search?: string;
    } & SearchModalProps["translations"];
}

export const Search: React.FC<SearchProps> = ({ link, searcher, translations }) => {
    const { search = "Search...", ...modalTranslations } = translations || {};
    const titleRef = useRef<HTMLSpanElement>(null);
    const { opened, closeHandler, openHandler } = useModal();
    const system = useSystemType();

    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key.length === 1 && e.code !== "Space") {
            openHandler();
        }
    };

    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openHandler();
            }
        };
        window.addEventListener("keydown", keyDown);

        return () => {
            window.removeEventListener("keydown", keyDown);
        };
    }, []);

    const inputHandler = (text: string) => {
        if (titleRef.current) {
            titleRef.current.innerText = text || search;
        }
    };

    return (
        <>
            <button type="button" className="r-search-btn" onClick={openHandler} onKeyDown={keyDownHandler}>
                <span className="r-search-title" ref={titleRef}>
                    {search}
                </span>
                {system && (
                    <KbdContainer className="r-search-kbd">
                        <KbdKey>{system === "apple" ? "⌘" : "CTRL"}</KbdKey>
                        <KbdKey>K</KbdKey>
                    </KbdContainer>
                )}
            </button>
            <SearchModal
                open={opened}
                translations={modalTranslations}
                searcher={searcher}
                link={link}
                onClose={closeHandler}
                onInput={inputHandler}
            />
        </>
    );
};
