import { Marked } from "marked";
import { set } from "dot-prop";
import { readFile } from "fs/promises";

type GenerateMetadataFactoryOpts = { content: string; uri?: undefined } | { uri: string; content?: undefined };

export const generateMetadataFactory = (opts: GenerateMetadataFactoryOpts) => {
    const { content, uri } = opts;

    const generateMetadata = async () => {
        const data = uri ? await readFile(uri, "utf-8") : content;

        if (!data) {
            throw new Error("Robindoc: Please provide content or valid uri");
        }

        const tree = new Marked({ async: true }).lexer(data);

        const metaData = Object.entries(tree.links).reduce<Record<string, string>>((acc, cur) => {
            const [key, value] = cur;
            const metaKey = key.startsWith("meta.") && key.replace("meta.", "");
            const content = value.title;

            if (content && metaKey) {
                set(acc, metaKey, content);
            }

            return acc;
        }, {});

        return metaData;
    };
    return { generateMetadata };
};
