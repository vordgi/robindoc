import { type BaseProvider } from "../providers/base";

export type RobinProps = {
    [key: string]: string | true;
};

export type Components = {
    [key: string]: (props: Record<string, string | true | undefined | React.ReactNode>) => JSX.Element;
};

export type DocsTree = { origPath: string; clientPath: string }[];

export type BranchFiles = { docs: DocsTree; structures: string[] };

export type Fetcher<T = Response> = (input: RequestInfo | URL, init?: RequestInit) => Promise<T>;

export type Configuration = {
    sourceUri?: string;
    provider?: BaseProvider;
    basePath?: string;
    gitToken?: string;
    fetcher?: Fetcher | null;
};

export type Crumbs = string[];

export type Page = { title: string; uri: string; configuration: Configuration; crumbs: Crumbs };

export type Pages = { [key: string]: Page };

export type Breadcrumbs = { pathname: string; title: string }[];
