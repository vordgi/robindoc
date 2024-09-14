"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { type Searcher, type SearchItem } from "@src/core/types/search";
import { createBaseSearcher } from "@src/core/utils/create-base-searcher";
import { NavLink } from "@src/components/blocks/nav-link";
import { useDebouncer } from "@src/core/hooks/use-debouncer";
import { KbdContainer, KbdKey } from "@src/components/ui/kbd";
import { Modal } from "@src/components/ui/modal";

export interface SearchModalProps {
    onClose(): void;
    link?: React.ElementType;
    open: boolean;
    onInput(text: string): void;
    searcher: Searcher | string;
    translations?: {
        /** Type something... */
        typeSomething?: string;
        /** Nothing found */
        nothingFound?: string;
    };
}

export const SearchModal: React.FC<SearchModalProps> = ({ translations, link, searcher, open, onClose, onInput }) => {
    const { typeSomething = "Type something...", nothingFound = "Nothing found" } = translations || {};
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [results, setResults] = useState<SearchItem[] | null>(null);
    const targetSearcher = useMemo(
        () => (typeof searcher === "string" ? createBaseSearcher(searcher) : searcher),
        [searcher],
    );

    const { handler } = useDebouncer(async (abortController, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onInput(value);
        let newResults = null;
        if (value) {
            newResults = await targetSearcher(value, abortController);
        }
        setResults(newResults);
    });

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <div className="r-search-popup-header">
                <input
                    type="text"
                    name="search"
                    placeholder={typeSomething}
                    className="r-search-input"
                    onChange={handler}
                    ref={inputRef}
                />
                <KbdContainer className="r-search-kbd r-search-popup-kbd" onClick={onClose}>
                    <KbdKey>ESC</KbdKey>
                </KbdContainer>
            </div>
            {results && (
                <ul className="r-search-results">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <li key={item.href}>
                                <NavLink link={link} href={item.href} onClick={onClose} className="r-search-item">
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
        </Modal>
    );
};
