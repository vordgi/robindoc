"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { type Searcher, type SearchItem } from "../types";
import { NavLink } from "../../nav-link";

export interface SearchModalProps {
    closeHandler(): void;
    link?: React.ElementType;
    opened: boolean;
    inputHandler(text: string): void;
    searcher: Searcher | string;
    translations?: {
        /** Type something... */
        typeSomething?: string;
        /** Nothing found */
        nothingFound?: string;
    };
}

const createBaseSearcher =
    (searchUri: string): Searcher =>
    (search: string, abortController: AbortController) => {
        const qs = new URLSearchParams([["s", search]]);
        return fetch(`${searchUri}?${qs.toString()}`, { signal: abortController.signal })
            .then((response) => response.json())
            .catch((error) => {
                if (error.name !== "AbortError") {
                    throw error;
                }
            });
    };

export const SearchModal: React.FC<SearchModalProps> = ({
    closeHandler,
    link,
    opened,
    inputHandler,
    searcher,
    translations,
}) => {
    const { typeSomething = "Type something...", nothingFound = "Nothing found" } = translations || {};
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [results, setResults] = useState<SearchItem[] | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const targetSearcher = useMemo(
        () => (typeof searcher === "string" ? createBaseSearcher(searcher) : searcher),
        [searcher],
    );

    const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const value = e.currentTarget.value;
        inputHandler(value);

        if (!value) {
            setResults(null);
            return;
        }

        debounceRef.current = setTimeout(() => {
            if (abortControllerRef.current) abortControllerRef.current.abort();

            abortControllerRef.current = new AbortController();

            targetSearcher(value, abortControllerRef.current)
                .then(setResults)
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

    useEffect(() => {
        if (opened) inputRef.current?.focus();
    }, [opened]);

    return (
        <>
            <div onClick={closeHandler} className={`r-search-backdrop${opened ? " _visible" : ""}`} />
            <div className={`r-search-popup${opened ? " _visible" : ""}`}>
                <div className="r-search-popup-header">
                    <input
                        type="text"
                        name="search"
                        placeholder={typeSomething}
                        className="r-search-input"
                        autoFocus={opened}
                        onChange={searchHandler}
                        ref={inputRef}
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
                                    <NavLink
                                        link={link}
                                        href={item.href}
                                        onClick={closeHandler}
                                        className="r-search-item"
                                    >
                                        <p className="r-search-item-title">{item.title}</p>
                                        {item.description && <p className="r-search-item-desc">{item.description}</p>}
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            <p>{nothingFound}</p>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};
