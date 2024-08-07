import React from "react";
import GithubSlugger from "github-slugger";
import { Marked, type Token, type Tokens } from "marked";
import { type RobinProps, type Provider, Components } from "../types/content";
import { loadContent } from "../utils/load-content";
import { AnchorProvider } from "./anchor-provider";
import { Heading } from "./heading";
import { Contents, type ContentsProps } from "./contents";
import { Shiki } from "./code";
import path from "path";
import { readFile } from "fs/promises";

export type ArticleProps = {
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    provider?: Provider;
    hideContents?: boolean;
    link?: React.ElementType;
    editOnGitUri?: ContentsProps["editOnGitUri"];
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

const extensionsMap = {
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".ico": "image/vnd.microsoft.icon",
};

export const Article: React.FC<ArticleProps> = async ({
    components,
    content,
    uri,
    config = {},
    provider,
    hideContents,
    link: Link = "a",
    editOnGitUri,
}) => {
    const { publicDirs } = config;
    const { data, type } = uri ? await loadContent(uri, provider) : { data: content, type: "local" };

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const markedTree = new Marked({ async: true }).lexer(data);

    const slugger = new GithubSlugger();
    const headings = markedTree.reduce<{ title: string; id: string; nested: boolean; token: Token }[]>((acc, token) => {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
            acc.push({ title: token.text, id: slugger.slug(token.text), token, nested: token.depth === 3 });
        }
        return acc;
    }, []);

    const publicDirsRule = publicDirs && new RegExp(`^(${publicDirs?.join("|")})(\/|$)`);
    let robin: null | { props: RobinProps; childTokens: Token[]; componentName: string } = null;
    const ArticleToken: React.FC<{ token: Token | Token[] }> = async ({ token }) => {
        if (!token) return null;

        if (robin) {
            if (!Array.isArray(token) && token.type === "html" && token.raw.trim() === "<!---/robin-->") {
                const { componentName, childTokens, props } = robin;
                const RobinComponent = components![componentName];
                robin = null;
                return (
                    <RobinComponent {...props}>
                        <ArticleToken token={childTokens} />
                    </RobinComponent>
                );
            } else {
                if (Array.isArray(token)) {
                    robin.childTokens.push(...token);
                } else {
                    robin.childTokens.push(token);
                }
                return null;
            }
        }

        if (Array.isArray(token))
            return token.map((t, index) => <ArticleToken token={t} key={(t as Tokens.Text).raw || index} />);

        switch (token.type) {
            case "heading":
                const Component = `h${token.depth}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
                const predefinedData = headings.find((heading) => heading.token === token);
                if (predefinedData?.id) {
                    return (
                        <Heading id={predefinedData?.id} component={Component}>
                            {token.text}
                        </Heading>
                    );
                } else {
                    return <Component className={`r-h${token.depth}`}>{token.text}</Component>;
                }
            case "table":
                return (
                    <div className="r-box">
                        <table className="r-table">
                            <thead className="r-thead">
                                <tr className="r-tr">
                                    {token.header.map((t: Tokens.Text) => (
                                        <th key={t.raw} className="r-th">
                                            {t.tokens ? <ArticleToken token={t.tokens} /> : t.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="r-tbody">
                                {token.rows.map((r: Tokens.Text[], index: number) => (
                                    <tr key={index} className="r-tr">
                                        {r.map((i) => (
                                            <td key={i.raw} className="r-td">
                                                {i.tokens ? <ArticleToken token={i.tokens} /> : i.text}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "link":
                return (
                    <Link href={token.href} className="r-a">
                        {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                    </Link>
                );
            case "space":
                return <br />;
            case "hr":
                return <hr className="r-hr" />;
            case "image":
                let src = token.href;

                if (type === "local") {
                    const assetPath = path.posix.join(
                        process.cwd(),
                        uri?.replace(/^\//, "./") || "",
                        token.href.replace(/^\//, "./"),
                    );
                    const relativePath = path.posix.relative(process.cwd(), assetPath);
                    const { dir, ext } = path.parse(relativePath);
                    const publicDirMatch = publicDirsRule && dir.match(publicDirsRule);

                    if (publicDirMatch) {
                        src = `${relativePath.replace(publicDirMatch[1], "")}`;
                    } else if (ext in extensionsMap) {
                        const base64Image = await readFile(relativePath, "base64");
                        src = `data:${extensionsMap[ext as keyof typeof extensionsMap]};base64,${base64Image}`;
                    }
                }

                return <img src={src} className="r-img" alt={token.title || ""} />;
            case "paragraph":
                return <p className="r-p">{token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}</p>;
            case "strong":
                return (
                    <strong className="r-strong">
                        {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                    </strong>
                );
            case "del":
                return <del className="r-del">{token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}</del>;
            case "em":
                return <em className="r-em">{token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}</em>;
            case "codespan":
                return <code className="r-code">{token.raw.replace(/^`|`$/g, "")}</code>;
            case "code":
                return <Shiki lang={token.lang} code={token.text} className="r-pre" />;
            case "escape":
                return token.text;
            case "blockquote":
                return (
                    <blockquote className="r-blockquote">
                        {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                    </blockquote>
                );
            case "list":
                const ListComponent = token.ordered ? "ol" : "ul";
                const isTaskList = token.items.every((i: Tokens.ListItem) => i.task);
                if (isTaskList) {
                    return (
                        <ListComponent className={`r-${ListComponent} r-task-${ListComponent}`}>
                            {token.items.map((i: Tokens.ListItem) => (
                                <li key={i.raw} className="r-li r-task-li">
                                    <label className="r-label r-task-label">
                                        <input type="checkbox" defaultChecked={i.checked} className="r-checkbox" />
                                        <span className="r-label-text">
                                            {i.tokens ? <ArticleToken token={i.tokens} /> : i.raw}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ListComponent>
                    );
                }
                return (
                    <ListComponent className={`r-${ListComponent}`}>
                        {token.items.map((i: Tokens.ListItem) => (
                            <li key={i.raw} className="r-li">
                                {i.tokens ? <ArticleToken token={i.tokens} /> : i.raw}
                            </li>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();

                if (text.startsWith("<!---robin") && text.endsWith("-->")) {
                    const componentName = text.match(/<!---robin ([\w]+)/)?.[1];

                    if (!componentName) return null;

                    if (!components || !(componentName in components)) {
                        console.log(`Unknown component: ${componentName}`);
                        return null;
                    }
                    const propRows = text.split(/\r?\n/).slice(1, -1);
                    const props = propRows.reduce<{ [key: string]: string | true }>((acc, cur) => {
                        const [_match, key, value] = cur.match(/^([\w]+)(?:="(.+)")?$/) || [];

                        if (!_match) {
                            console.log(`Invalid component attribute: "${cur}"`);
                            return acc;
                        }

                        acc[key] = value ?? true;
                        return acc;
                    }, {});

                    if (text.endsWith("/-->")) {
                        const Component = components[componentName as keyof typeof components];
                        return <Component {...props} />;
                    } else {
                        robin = { props, componentName, childTokens: [] };
                    }
                }

                return null;
            case "text":
                if ("tokens" in token) {
                    return <ArticleToken token={token.tokens || []} />;
                }
                return token.raw;
            default:
                if (!token.type && "raw" in token) return token.raw;

                console.log(`Unknown token ${token.type}`, token);
                return null;
        }
    };

    return (
        <AnchorProvider>
            <Contents
                editOnGitUri={editOnGitUri === null ? null : editOnGitUri || uri}
                hideContents={hideContents}
                headings={headings.map((el) => ({ id: el.id, nested: el.nested, title: el.title }))}
            />
            <div className="r-content">
                <ArticleToken token={markedTree} />
            </div>
        </AnchorProvider>
    );
};
