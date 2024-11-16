import { type Token } from "marked";

export const parseTokenText = (token: Token): string => {
    if (!token) return "";

    if ("tokens" in token) {
        return token.tokens?.map((el) => parseTokenText(el)).join("") || "";
    }

    if ("text" in token) {
        return token.text;
    }

    if ("raw" in token) {
        return token.raw;
    }

    return "";
};
