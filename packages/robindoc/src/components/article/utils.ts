import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { lexer, type Token } from "marked";

export type Heading = {
    title: string;
    id: string;
    nested: boolean;
    token: Token;
};

export const parseTree = (content: string) => {
    const { content: matterContent } = matter(content);
    const markedTree = lexer(matterContent.trim());

    const slugger = new GithubSlugger();
    const headings = markedTree.reduce<Heading[]>((acc, token) => {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
            const title = parseTokenText(token);
            acc.push({
                title,
                id: slugger.slug(title),
                token,
                nested: token.depth === 3,
            });
        }
        return acc;
    }, []);

    return { tree: markedTree, headings };
};

export const parseTokenText = (token: Token): string => {
    if (!token) return "";

    if ("tokens" in token) {
        return token.tokens?.map((el) => parseTokenText(el)).join("") || "";
    }

    if ("text" in token) {
        return token.text;
    }

    return "";
};

export const validateComponentName = (name: string) => {
    return /^[A-Z][a-zA-Z0-9]+$/.test(name);
};
