import { Marked } from "marked";
import { set } from "dot-prop";
import { type Provider } from "../types/content";
import { loadContent } from "./load-content";

type GetMetaOptions =
    | { uri: string; provider?: Provider; content?: undefined }
    | { uri?: undefined; provider?: undefined; content: string };

export const getMeta = async (opts: GetMetaOptions) => {
    const { uri, provider, content } = opts;
    const data = uri ? await loadContent(uri, provider) : content;

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const tree = new Marked({ async: true }).lexer(data);

    const metaData = Object.entries(tree.links).reduce<Record<string, string>>((acc, cur) => {
        const [key, value] = cur;
        const metaKey = key.startsWith("robin.") && key.replace("robin.", "");
        const content = value.title;

        if (content && metaKey) {
            set(acc, metaKey, content);
        }

        return acc;
    }, {});

    return metaData;
};
