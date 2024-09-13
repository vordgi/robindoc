import { type Searcher } from "../types/search";

export const createBaseSearcher =
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
