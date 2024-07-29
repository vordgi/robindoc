"use client";

import React, { useEffect, useRef, useState } from "react";

const SearchModal: React.FC<{ closeHandler(): void }> = ({ closeHandler }) => {
    const [results, setResults] = useState<{ title: string; href: string; match: string }[] | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const value = e.currentTarget.value;

        if (!value) {
            setResults(null);
            return;
        }

        debounceRef.current = setTimeout(() => {
            if (abortControllerRef.current) abortControllerRef.current.abort();

            abortControllerRef.current = new AbortController();
            fetch(`/api/search?s=${value}`, { signal: abortControllerRef.current.signal })
                .then((response) => response.json())
                .then((data) => {
                    setResults(data);
                })
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        throw error;
                    }
                })
                .finally(() => {
                    abortControllerRef.current = null;
                });
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    });

    return (
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
                        onChange={searchHandler}
                    />
                    <kbd className="r-search-kbd r-search-popup-kbd" onClick={closeHandler}>
                        <kbd className="r-search-key">ESC</kbd>
                    </kbd>
                </div>
                {results && (
                    <ul className="r-search-results">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className="r-search-item">
                                        <p className="r-search-item-title">{item.title}</p>
                                        <p className="r-search-item-desc">{item.match}</p>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Nothing found</p>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};

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
            {opened && <SearchModal closeHandler={closeHandler} />}
        </>
    );
};
