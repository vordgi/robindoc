import { type Fetcher, type FileTree } from "../types/content";

export abstract class BaseProvider {
    abstract type: "local" | "remote";

    abstract rootUri: string;

    abstract treePromise: Promise<FileTree> | FileTree;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(rootUri: string, fetcher: Fetcher, token?: string) {}

    abstract load(uri: string): Promise<string>;

    abstract getFileSrc(uri: string, href: string, publicDirs?: string[]): Promise<string>;
}
