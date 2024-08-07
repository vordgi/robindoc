export interface Provider {
    type: "local" | "remote";
    load(uri: string): Promise<string>;
}

export type RobinProps = {
    [key: string]: string | true;
};

export type Components = {
    [key: string]: (props: Record<string, string | true | undefined | React.ReactNode>) => JSX.Element;
};
