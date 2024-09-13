"use client";

import "./search.scss";

import React, { useEffect, useRef, useState } from "react";

import { SearchModal, type SearchModalProps } from "./search-modal";
import { useSystemType } from "../../../core/hooks/use-system-type";
import { KbdContainer, KbdKey } from "../../ui/kbd";

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
    const [modalOpened, setModalOpened] = useState(false);
    const system = useSystemType();

    const openHandler = () => {
        document.documentElement.classList.add("body-lock");
        setModalOpened(true);
    };
    const closeHandler = () => {
        document.documentElement.classList.remove("body-lock");
        setModalOpened(false);
    };
    const toggleHandler = () => {
        if (modalOpened) {
            closeHandler();
        } else {
            openHandler();
        }
    };
    const keyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key.length === 1 && e.code !== "Space") {
            openHandler();
        }
    };

    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setModalOpened(true);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setModalOpened(false);
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
            <button type="button" className="r-search-btn" onClick={toggleHandler} onKeyDown={keyDownHandler}>
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
                open={modalOpened}
                translations={modalTranslations}
                searcher={searcher}
                link={link}
                onClose={closeHandler}
                onInput={inputHandler}
            />
        </>
    );
};
