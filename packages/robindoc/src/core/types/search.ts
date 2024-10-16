export type SearchItem = { title: string; href: string; description?: string };

export type SearchResults = SearchItem[];

export type Searcher = (search: string, abortController: AbortController) => Promise<SearchItem[]>;
