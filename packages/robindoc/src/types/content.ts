export interface Provider {
    load(uri: string): Promise<string>;
}

export type RobinProps = {
    [key: string]: string | true;
};
