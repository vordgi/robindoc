export abstract class BaseProvider {
    abstract type: "local" | "remote";

    abstract rootUri: string;

    abstract treePromise: Promise<string[]>;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(rootUri: string) {}

    abstract load(uri: string): Promise<string>;
}
