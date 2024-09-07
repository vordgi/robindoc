"use client";

import "./search.scss";

import React, { useEffect, useRef, useState } from "react";
import { type Searcher } from "./types";
import { SearchModal } from "./search-modal";

export interface SearchProps {
    link?: React.ElementType;
    searcher: Searcher;
}

export const Search: React.FC<SearchProps> = ({ link, searcher }) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const [system, setSystem] = useState<"none" | "other" | "apple">("none");
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        document.documentElement.classList.add("body-lock");
        setOpened(true);
    };
    const closeHandler = () => {
        document.documentElement.classList.remove("body-lock");
        setOpened(false);
    };
    const toggleHandler = () => {
        if (opened) {
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
                setOpened(true);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setOpened(false);
            }
        };
        window.addEventListener("keydown", keyDown);

        return () => {
            window.removeEventListener("keydown", keyDown);
        };
    }, []);

    useEffect(() => {
        if (navigator.userAgent.includes("Macintosh")) {
            setSystem("apple");
        } else {
            setSystem("other");
        }
    }, []);

    const inputHandler = (text: string) => {
        if (titleRef.current) {
            titleRef.current.innerText = text || "Search...";
        }
    };

    return (
        <>
            <button type="button" className="r-search-btn" onClick={toggleHandler} onKeyDown={keyDownHandler}>
                <span className="r-search-title" ref={titleRef}>
                    Search...
                </span>
                {system !== "none" && (
                    <kbd className="r-search-kbd">
                        {system === "apple" ? (
                            <>
                                <kbd className="r-search-key">⌘</kbd>
                                <kbd className="r-search-key">K</kbd>
                            </>
                        ) : (
                            <>
                                <kbd className="r-search-key">CTRL</kbd>
                                <kbd className="r-search-key">K</kbd>
                            </>
                        )}
                    </kbd>
                )}
            </button>
            <SearchModal
                searcher={searcher}
                closeHandler={closeHandler}
                link={link}
                opened={opened}
                inputHandler={inputHandler}
            />
        </>
    );
};
