export type ThemeColors = {
    accent?: {
        "50": string;
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
        "800": string;
        "900": string;
        "950": string;
    };
    link?: {
        base: string;
        "base-hovered": string;
        visited: string;
        "visited-hovered": string;
        active: string;
    };
};

export type Theme = {
    colors?: ThemeColors;
};
