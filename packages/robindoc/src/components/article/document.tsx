import React from "react";
import parse, { attributesToProps, DOMNode, domToReact, HTMLReactParserOptions, Text } from "html-react-parser";
import { type TokensList, type Token, type Tokens } from "marked";

import { type RobinProps, type Components } from "../../types/content";
import { type BaseProvider } from "../../providers/base";
import { Heading } from "../heading";
import { Shiki } from "../code";
import { NavLink } from "../nav-link";
import { Img } from "./elements";
import { Heading as HeadingType, parseTree } from "./utils";

interface DocumentJSXProps extends Omit<ContentProps, "tree" | "headings"> {
    raw: string;
}

export const DocumentJSX: React.FC<DocumentJSXProps> = ({ raw, components, ...baseProps }) => {
    const parseOptions: HTMLReactParserOptions = {
        replace(domNode) {
            if (domNode instanceof Text && domNode.data) {
                const { headings, tree } = parseTree(domNode.data);

                return <Document headings={headings} tree={tree} components={components} subtree {...baseProps} />;
            }

            if (!("name" in domNode)) return;

            const props = "attribs" in domNode ? attributesToProps(domNode.attribs) : {};
            if (components && domNode.name in components) {
                const Component = components[domNode.name];
                const children = "children" in domNode ? domNode.children : null;

                return (
                    <Component {...props}>
                        {children ? domToReact(children as DOMNode[], parseOptions) : null}
                    </Component>
                );
            }

            return domNode;
        },
        htmlparser2: {
            lowerCaseTags: false,
        },
    };
    return parse(raw, parseOptions);
};

export type ContentProps = {
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    uri?: string;
    targetProvider?: BaseProvider | null;
    tree: TokensList;
    headings: HeadingType[];
    subtree?: boolean;
    link?: React.ElementType;
};

export const Document: React.FC<ContentProps> = ({
    components,
    uri,
    targetProvider,
    tree,
    headings,
    config = {},
    subtree,
    link,
}) => {
    const { publicDirs } = config;

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
                            {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                        </Heading>
                    );
                } else {
                    return (
                        <Component className={`r-h${token.depth}`}>
                            {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                        </Component>
                    );
                }
            case "table":
                return (
                    <div className="r-box">
                        <table className="r-table">
                            <thead className="r-thead">
                                <tr className="r-tr">
                                    {token.header.map((t: Tokens.Text, index: number) => (
                                        <th key={t.text + index} className="r-th">
                                            {t.tokens ? <ArticleToken token={t.tokens} /> : t.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="r-tbody">
                                {token.rows.map((row: Tokens.Text[], rowIndex: number) => (
                                    <tr key={rowIndex} className="r-tr">
                                        {row.map((elem, elemIndex) => (
                                            <td key={elem.text + elemIndex} className="r-td">
                                                {elem.tokens ? <ArticleToken token={elem.tokens} /> : elem.text}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "link":
                const additionalProps = token.href.match(/^https?:\/\//)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {};

                return (
                    <NavLink link={link} href={token.href} className="r-a" {...additionalProps}>
                        {token.tokens ? <ArticleToken token={token.tokens} /> : token.raw}
                    </NavLink>
                );
            case "space":
                return <br />;
            case "hr":
                return <hr className="r-hr" />;
            case "image":
                return (
                    <Img
                        src={token.href}
                        publicDirs={publicDirs}
                        provider={targetProvider}
                        uri={uri}
                        className="r-img"
                        alt={token.title || ""}
                    />
                );
            case "paragraph":
                if (subtree) return token.tokens ? <ArticleToken token={token.tokens} /> : token.raw;

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
                            {token.items.map((elem: Tokens.ListItem, index: number) => (
                                <li key={elem.raw + index} className="r-li r-task-li">
                                    <label className="r-label r-task-label">
                                        <input type="checkbox" defaultChecked={elem.checked} className="r-checkbox" />
                                        <span className="r-label-text">
                                            {elem.tokens ? <ArticleToken token={elem.tokens} /> : elem.raw}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ListComponent>
                    );
                }
                return (
                    <ListComponent className={`r-${ListComponent}`}>
                        {token.items.map((elem: Tokens.ListItem, index: number) => (
                            <li key={elem.raw + index} className="r-li">
                                {elem.tokens ? <ArticleToken token={elem.tokens} /> : elem.raw}
                            </li>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();
                console.log(text);

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
                    }

                    robin = { props, componentName, childTokens: [] };
                    return null;
                }

                return (
                    <DocumentJSX
                        raw={token.raw}
                        components={components}
                        config={config}
                        link={link}
                        targetProvider={targetProvider}
                        uri={uri}
                    />
                );
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

    return <ArticleToken token={tree} />;
};
