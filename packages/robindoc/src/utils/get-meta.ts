import { type BaseProvider } from "../providers/base";
import matter from "gray-matter";
import { lexer } from "marked";
import { set } from "dot-prop";
import { loadContent } from "./load-content";

type GetMetaOptions =
    | { uri: string; provider?: BaseProvider; content?: undefined }
    | { uri?: undefined; provider?: undefined; content: string };

export const getMeta = async (opts: GetMetaOptions) => {
    const { uri, provider, content } = opts;
    const { data } = uri ? await loadContent(uri, provider) : { data: content };

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const { content: matterContent, data: matterData } = matter(data);
    const tree = lexer(matterContent);

    const robinData = Object.entries(tree.links).reduce<Record<string, string>>((acc, cur) => {
        const [key, value] = cur;
        const metaKey = key.startsWith("robin.") && key.replace("robin.", "");
        const content = value.title;

        if (content && metaKey) {
            set(acc, metaKey, content);
        }

        return acc;
    }, matterData);

    return robinData;
};
