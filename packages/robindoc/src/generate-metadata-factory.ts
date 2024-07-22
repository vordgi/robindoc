import { Marked } from "marked";
import { set } from "dot-prop";

export const generateMetadataFactory = (content: string) => {
    const generateMetadata = () => {
        const tree = new Marked({ async: true }).lexer(content);

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
