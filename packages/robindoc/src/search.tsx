"use client";

import React, { useEffect, useState } from "react";

export const Search = () => {
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

    return (
        <>
            <button type="button" className="r-search-btn" onClick={toggleHandler}>
                Search...
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
            {opened && (
                <>
                    <div onClick={closeHandler} className="r-search-backdrop" />
                    <div className="r-search-popup">
                        <div className="r-search-popup-header">
                            <input
                                type="text"
                                name="search"
                                placeholder="Type something..."
                                className="r-search-input"
                                autoFocus
                            />
                            <kbd className="r-search-kbd r-search-popup-kbd" onClick={closeHandler}>
                                <kbd className="r-search-key">ESC</kbd>
                            </kbd>
                        </div>
                        <div className="r-search-popup-content"></div>
                    </div>
                </>
            )}
        </>
    );
};
