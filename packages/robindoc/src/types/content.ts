export interface Provider {
    load(uri: string): Promise<string>;
}
