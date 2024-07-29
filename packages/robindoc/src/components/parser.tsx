import React from "react";
import GithubSlugger from "github-slugger";
import { Marked, type Token, type Tokens } from "marked";
import { type Provider } from "../types/content";
import { loadContent } from "../utils/load-content";
import { AnchorProvider } from "./anchor-provider";
import { Heading } from "./heading";
import { Contents } from "./contents";

type ParserProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components?: { [key: string]: (props: { [key: string]: string | true | undefined }) => JSX.Element };
    config?: {
        publicAssetsFolder?: string;
    };
    provider?: Provider;
    hideContents?: boolean;
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

export const Parser: React.FC<ParserProps> = async ({
    components,
    content,
    uri,
    config = {},
    provider,
    hideContents,
}) => {
    const { publicAssetsFolder } = config;
    const data = uri ? await loadContent(uri, provider) : content;

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const tree = new Marked({ async: true }).lexer(data);

    const slugger = new GithubSlugger();
    const headings = tree.reduce<{ title: string; id: string; nested: boolean; token: Token }[]>((acc, token) => {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
            acc.push({ title: token.text, id: slugger.slug(token.text), token, nested: token.depth === 3 });
        }
        return acc;
    }, []);

    const publicAssetsFolderClean = publicAssetsFolder?.replace(/^(\.*\/)*|\/$/g, "");
    const publicAssetsRule = publicAssetsFolder && new RegExp(`^(.*/)*${publicAssetsFolderClean}/`, "g");
    let isRobin = false;
    const TokenParser: React.FC<{ token: Token | Token[] }> = ({ token }) => {
        if (!token) return null;

        if (isRobin) {
            if (!Array.isArray(token) && token.type === "html" && token.raw.trim() === "<!---/robin-->") {
                isRobin = false;
            }
            return null;
        }

        if (Array.isArray(token))
            return token.map((t, index) => <TokenParser token={t} key={(t as Tokens.Text).raw || index} />);

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
                    <table className="r-table">
                        <thead className="r-thead">
                            <tr className="r-tr">
                                {token.header.map((t: Tokens.Text) => (
                                    <th key={t.raw} className="r-th">
                                        <TokenParser token={t} />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="r-tbody">
                            {token.rows.map((r: Tokens.Text[], index: number) => (
                                <tr key={index} className="r-tr">
                                    {r.map((i) => (
                                        <td key={i.raw} className="r-td">
                                            <TokenParser token={i} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case "link":
                return (
                    <a href={token.href} className="r-a">
                        {token.tokens ? <TokenParser token={token.tokens} /> : token.raw}
                    </a>
                );
            case "space":
                return <br />;
            case "hr":
                return <hr className="r-hr" />;
            case "image":
                const src = publicAssetsRule ? token.href.replace(publicAssetsRule, `/`) : token.href;
                return <img src={src} className="r-img" alt={token.title || ""} />;
            case "paragraph":
                return <p className="r-p">{token.tokens ? <TokenParser token={token.tokens} /> : token.raw}</p>;
            case "strong":
                return (
                    <strong className="r-strong">
                        {token.tokens ? <TokenParser token={token.tokens} /> : token.raw}
                    </strong>
                );
            case "del":
                return <del className="r-del">{token.tokens ? <TokenParser token={token.tokens} /> : token.raw}</del>;
            case "em":
                return <em className="r-em">{token.tokens ? <TokenParser token={token.tokens} /> : token.raw}</em>;
            case "codespan":
                return <code className="r-code">{token.raw.replace(/^`|`$/g, "")}</code>;
            case "code":
                return <pre className="r-pre">{token.text}</pre>;
            case "escape":
                return token.text;
            case "blockquote":
                return (
                    <blockquote className="r-blockquote">
                        {token.tokens ? <TokenParser token={token.tokens} /> : token.raw}
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
                                            {i.tokens ? <TokenParser token={i.tokens} /> : i.raw}
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
                                {i.tokens ? <TokenParser token={i.tokens} /> : i.raw}
                            </li>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();

                if (text.startsWith("<!---robin") && text.endsWith("-->")) {
                    const componentName = text.match(/<!---robin ([\w]+)/)?.[1];

                    if (!text.endsWith("/-->")) isRobin = true;

                    if (!componentName) return null;

                    if (!components || !(componentName in components)) {
                        console.log(`Unknown component: ${componentName}`);
                        return null;
                    }
                    const propRows = text.split(/\r?\n/).slice(1, -1);
                    const props = propRows.reduce<{ [key: string]: string | true }>((acc, cur) => {
                        const [_match, key, value] = cur.match(/^([\w]+)(?:="([^"]+)")?$/) || [];

                        if (!_match) {
                            console.log(`Invalid component attribute: "${cur}"`);
                            return acc;
                        }

                        acc[key] = value ?? true;
                        return acc;
                    }, {});
                    const Component = components[componentName as keyof typeof components];

                    return <Component {...props} />;
                }

                return null;
            case "text":
                if ("tokens" in token) {
                    return <TokenParser token={token.tokens || []} />;
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
            {!hideContents && (
                <Contents headings={headings.map((el) => ({ id: el.id, nested: el.nested, title: el.title }))} />
            )}
            <div className="r-content">
                <TokenParser token={tree} />
            </div>
        </AnchorProvider>
    );
};
