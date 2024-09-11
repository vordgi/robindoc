import { type BaseProvider } from "../providers/base";

export type RobinProps = {
    [key: string]: string | true;
};

export type Components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (props: Record<string, any>) => JSX.Element | React.ReactNode;
};

export type DocsTree = { origPath: string; clientPath: string }[];

export type BranchFiles = { docs: DocsTree; structures: string[] };

export type Fetcher<T = Response> = (input: RequestInfo | URL, init?: RequestInit) => Promise<T>;

export type Configuration = {
    sourceRoot?: string;
    gitToken?: string;
    provider?: BaseProvider;
    basePath?: string;
    fetcher?: Fetcher;
};

export type Crumbs = string[];

export type Page = {
    title: string;
    uri: string;
    configuration: Configuration;
    crumbs: Crumbs;
    origPath: string;
};

export type Pages = { [key: string]: Page };

export type Breadcrumbs = { pathname: string; title: string }[];
