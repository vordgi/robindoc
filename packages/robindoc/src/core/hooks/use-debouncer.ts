import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncer = <T extends any[]>(callback: (abortController: AbortController, ...args: T) => unknown) => {
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const handler = async (...args: T) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortControllerRef.current && !abortControllerRef.current.signal.aborted)
            abortControllerRef.current.abort();

        debounceRef.current = setTimeout(() => {
            abortControllerRef.current = new AbortController();

            callback(abortControllerRef.current, ...args);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    return { handler };
};
