import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { lexer, type Token } from "marked";
import { dirname, join } from "path";
import { PagesType } from "./types";

export type AnchorData = {
    title: string;
    id: string;
    nested: boolean;
    token: Token;
};

export const parseTokenText = (token: Token): string => {
    if (!token) return "";

    if ("tokens" in token) {
        return token.tokens?.map((el) => parseTokenText(el)).join("") || "";
    }

    if ("raw" in token) {
        return token.raw;
    }

    return "";
};

export const parseMarkdown = (content: string) => {
    const { content: matterContent } = matter(content);
    const tokens = lexer(matterContent.trim());

    const slugger = new GithubSlugger();
    const headings = tokens.reduce<AnchorData[]>((acc, token) => {
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

    return { tokens, headings };
};

export const formatId = (raw: string) => {
    return raw.toLowerCase().replace(/\W/g, "_").replace(/_+/g, "_");
};

export const validateComponentName = (name: string) => {
    return /^[A-Z][a-zA-Z0-9]+$/.test(name);
};

export const parseCodeLang = (raw: string) => {
    let configuration: { [key: string]: string | boolean } = {};
    let lang: string = raw;

    const match = raw.match(/[a-z]+=("[^"]+"|'[^']+'|[^ ]+)|[a-z]+/g);
    if (Array.isArray(match)) {
        const [language, ...modifiers] = match as string[];
        lang = language;
        configuration = modifiers.reduce<{ [key: string]: string | boolean }>((acc, cur) => {
            const [key, ...value] = cur.split("=");
            if (value) {
                acc[key] = value.length === 0 ? true : value.join("=").replace(/(^["']|['"]$)/g, "");
            } else {
                acc[key] = true;
            }
            return acc;
        }, {});
    }
    return { lang, configuration };
};

export const isNewCodeToken = (
    token: Token | Token[],
    codeQueue: { [lang: string]: { element: JSX.Element; tabName: string } },
) => {
    if (Array.isArray(token) || !Object.keys(codeQueue).length) return false;

    if (token.type === "code") {
        const { lang, configuration } = parseCodeLang(token.lang);
        const tabKey = typeof configuration.tab === "string" ? formatId(configuration.tab) : lang;
        if (codeQueue[tabKey] || !configuration.switcher) return true;
    }

    if (token.type !== "space" && token.type !== "code") return true;

    return false;
};

export const formatLinkHref = (href: string, pathname: string, pages?: PagesType) => {
    let finalHref: string = href;
    const external = /^(https?:\/\/|\/)/.test(href);

    if (pages && !external) {
        const currentPageData = pages.find((item) => item.clientPath === pathname);

        if (currentPageData) {
            const linkOrigPath = join(dirname(currentPageData.origPath), href).replace(/\\/g, "/");
            const linkData = pages.find((item) => item.origPath === linkOrigPath);

            if (linkData) {
                finalHref = linkData?.clientPath;
            }
        }
    }
    return { href: finalHref, external };
};
