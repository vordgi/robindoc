import React from "react";
import parse, { attributesToProps, DOMNode, domToReact, HTMLReactParserOptions, Text } from "html-react-parser";
import { type TokensList, type Token, type Tokens } from "marked";

import { type RobinProps, type Components } from "../../types/content";
import { type BaseProvider } from "../../providers/base";
import { parseMarkdown, validateComponentName, type Heading as HeadingType } from "./utils";
import { Heading } from "../heading";
import { Shiki } from "../code";
import { Img } from "./elements";
import { NavLink } from "../nav-link";
import { dirname, join } from "path";

interface DocumentJSXProps extends Omit<ContentProps, "tokens" | "headings"> {
    raw: string;
}

export const DocumentJSX: React.FC<DocumentJSXProps> = ({ raw, components, ...baseProps }) => {
    const parseOptions: HTMLReactParserOptions = {
        replace(domNode) {
            if (domNode instanceof Text && domNode.data) {
                const { headings, tokens } = parseMarkdown(domNode.data);

                return <Document headings={headings} tokens={tokens} components={components} subtree {...baseProps} />;
            }

            if (!("name" in domNode)) return <></>;

            if (!validateComponentName(domNode.name)) return domNode;

            if (!components || !(domNode.name in components)) {
                console.log(`Unknown component: "${domNode.name}"`);
                return <></>;
            }

            const props = "attribs" in domNode ? attributesToProps(domNode.attribs) : {};
            const Component = components[domNode.name];
            const children = "children" in domNode ? domNode.children : null;

            return (
                <Component {...props}>{children ? domToReact(children as DOMNode[], parseOptions) : null}</Component>
            );
        },
        htmlparser2: {
            lowerCaseTags: false,
        },
    };
    return parse(raw, parseOptions);
};

export type ContentProps = {
    pathname: string;
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    uri?: string;
    targetProvider?: BaseProvider | null;
    tokens: TokensList;
    headings: HeadingType[];
    subtree?: boolean;
    link?: React.ElementType;
    pages?: { clientPath: string; origPath: string }[];
};

export const Document: React.FC<ContentProps> = ({
    pathname,
    components,
    uri,
    targetProvider,
    tokens,
    headings,
    config = {},
    subtree,
    link,
    pages,
}) => {
    const { publicDirs } = config;

    let robin:
        | null
        | { props: RobinProps; childTokens: Token[]; componentName: string; type: "base" }
        | { type: "dummy" } = null;
    const DocumentToken: React.FC<{ token: Token | Token[] }> = ({ token }) => {
        if (!token) return null;

        if (robin) {
            if (!Array.isArray(token) && token.type === "html" && token.raw.trim() === "<!---/robin-->") {
                if (robin.type === "dummy") {
                    robin = null;
                    return null;
                }

                const { componentName, childTokens, props } = robin;
                const RobinComponent = components![componentName];
                robin = null;
                return (
                    <RobinComponent {...props}>
                        <DocumentToken token={childTokens} />
                    </RobinComponent>
                );
            } else {
                if (robin.type === "dummy") return null;

                if (Array.isArray(token)) {
                    robin.childTokens.push(...token);
                } else {
                    robin.childTokens.push(token);
                }
                return null;
            }
        }

        if (Array.isArray(token))
            return token.map((t, index) => <DocumentToken token={t} key={(t as Tokens.Text).raw || index} />);

        switch (token.type) {
            case "heading":
                const Component = `h${token.depth}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
                const predefinedData = headings.find((heading) => heading.token === token);
                if (predefinedData?.id) {
                    return (
                        <Heading id={predefinedData.id} component={Component}>
                            {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                        </Heading>
                    );
                } else {
                    return (
                        <Component id={token.depth === 1 ? "main-content" : undefined} className={`r-h${token.depth}`}>
                            {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
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
                                            {t.tokens ? <DocumentToken token={t.tokens} /> : t.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="r-tbody">
                                {token.rows.map((row: Tokens.Text[], rowIndex: number) => (
                                    <tr key={rowIndex} className="r-tr">
                                        {row.map((elem, elemIndex) => (
                                            <td key={elem.text + elemIndex} className="r-td">
                                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.text}
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
                let finalHref: string = token.href;

                if (pages && !/^(https?:\/\/|\/)/.test(token.href)) {
                    const currentPageData = pages.find((item) => item.clientPath === pathname);

                    if (currentPageData) {
                        const linkOrigPath = join(dirname(currentPageData.origPath), token.href).replace(/\\/g, "/");
                        const linkData = pages.find((item) => item.origPath === linkOrigPath);

                        if (linkData) {
                            finalHref = linkData?.clientPath;
                        }
                    }
                }

                return (
                    <NavLink link={link} href={finalHref} className="r-a" {...additionalProps}>
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                    </NavLink>
                );
            case "space":
                return null;
            case "hr":
                return <hr className="r-hr" />;
            case "image":
                return (
                    <Img
                        src={token.href}
                        publicDirs={publicDirs}
                        provider={targetProvider}
                        uri={uri}
                        alt={token.title || ""}
                    />
                );
            case "paragraph":
                if (subtree) return token.tokens ? <DocumentToken token={token.tokens} /> : token.raw;

                return <p className="r-p">{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</p>;
            case "strong":
                return (
                    <strong className="r-strong">
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                    </strong>
                );
            case "del":
                return <del className="r-del">{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</del>;
            case "em":
                return <em className="r-em">{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</em>;
            case "codespan":
                return <code className="r-code">{token.raw.replace(/^`|`$/g, "")}</code>;
            case "code":
                return <Shiki lang={token.lang} code={token.text} className="r-pre" />;
            case "escape":
                return token.text;
            case "blockquote":
                return (
                    <blockquote className="r-blockquote">
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
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
                                            {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
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
                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
                            </li>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();

                if (text.startsWith("<!---robin") && text.endsWith("-->")) {
                    const selfClosed = text.endsWith("/-->");
                    const componentName = text.match(/<!---robin ([\w]+)/)?.[1];

                    if (!componentName) {
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!validateComponentName(componentName)) {
                        console.log(
                            `"${componentName}" is using incorrect casing. Use PascalCase for Robin components`,
                        );
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!components || !(componentName in components)) {
                        console.log(`Unknown component: "${componentName}"`);
                        if (!selfClosed) robin = { type: "dummy" };
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

                    if (selfClosed) {
                        const Component = components[componentName as keyof typeof components];
                        return <Component {...props} />;
                    }

                    robin = { props, componentName, childTokens: [], type: "base" };
                    return null;
                }

                return (
                    <DocumentJSX
                        raw={token.raw}
                        components={components}
                        config={config}
                        link={link}
                        targetProvider={targetProvider}
                        pathname={pathname}
                        uri={uri}
                    />
                );
            case "text":
                if ("tokens" in token) {
                    return <DocumentToken token={token.tokens || []} />;
                }
                return token.raw;
            default:
                if (!token.type && "raw" in token) return token.raw;

                console.log(`Unknown token ${token.type}`, token);
                return null;
        }
    };

    return <DocumentToken token={tokens} />;
};
