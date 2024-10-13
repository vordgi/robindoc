import React from "react";
import { dirname, join } from "path";
import parse, { attributesToProps, DOMNode, domToReact, HTMLReactParserOptions, Text } from "html-react-parser";
import { type TokensList, type Token, type Tokens } from "marked";
import { type RobinProps, type Components } from "@src/core/types/content";
import { type BaseProvider } from "@src/core/providers/base";
import { NavContentLink } from "@src/components/blocks/nav-content-link";
import { AnchorHeading } from "@src/components/blocks/anchor-heading";
import { CodeSection } from "@src/components/blocks/code-section";
import { Table, Thead, Tr, Th, Tbody, Td } from "@src/components/ui/table";
import { CodeSpan } from "@src/components/ui/code-span";
import { Img } from "@src/components/ui/img";
import { Block } from "@src/components/ui/block";
import { Blockquote } from "@src/components/ui/blockquote";
import { Paragraph } from "@src/components/ui/paragraph";
import { Strong } from "@src/components/ui/strong";
import { Del } from "@src/components/ui/del";
import { Em } from "@src/components/ui/em";
import { Hr } from "@src/components/ui/hr";
import { Heading } from "@src/components/ui/heading";
import { Tabs } from "@src/components/ui/tabs";
import { ListItem, OrderedList, UnorderedList } from "@src/components/ui/list";
import { TaskListItem, TaskOrderedList, TaskUnorderedList } from "@src/components/ui/task-list";

import { isNewCodeToken, parseCodeLang, parseMarkdown, validateComponentName, type AnchorData } from "./utils";

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
                console.warn(`Unknown component: "${domNode.name}"`);
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
            lowerCaseAttributeNames: false,
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
    headings: AnchorData[];
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
    let codeQueue: { [lang: string]: JSX.Element } = {};
    const insertedCodeKeys: string[] = [];
    const DocumentToken: React.FC<{ token: Token | Token[] }> = ({ token }) => {
        if (!token) return null;

        if (isNewCodeToken(token, codeQueue)) {
            const tabsData = codeQueue;
            codeQueue = {};
            const tabsKey = Object.keys(tabsData).sort().join("-");
            const isInsertedKey = insertedCodeKeys.includes(tabsKey);
            if (!isInsertedKey) insertedCodeKeys.push(tabsKey);

            return (
                <>
                    <Tabs tabsData={tabsData} insertStyles={!isInsertedKey} blockKey={tabsKey} />
                    <DocumentToken token={token} />
                </>
            );
        }

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
                        <AnchorHeading component={Component} id={predefinedData.id}>
                            {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                        </AnchorHeading>
                    );
                } else {
                    return (
                        <Heading component={Component} id={token.depth === 1 ? "main-content" : undefined}>
                            {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                        </Heading>
                    );
                }
            case "table":
                return (
                    <Block>
                        <Table>
                            <Thead>
                                <Tr>
                                    {token.header.map((t: Tokens.Text, index: number) => (
                                        <Th key={t.text + index}>
                                            {t.tokens ? <DocumentToken token={t.tokens} /> : t.text}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {token.rows.map((row: Tokens.Text[], rowIndex: number) => (
                                    <Tr key={rowIndex}>
                                        {row.map((elem, elemIndex) => (
                                            <Td key={elem.text + elemIndex}>
                                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.text}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Block>
                );
            case "link":
                let finalHref: string = token.href;
                const external = /^(https?:\/\/|\/)/.test(token.href);

                if (pages && !external) {
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
                    <NavContentLink link={link} href={finalHref} external={external}>
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                    </NavContentLink>
                );
            case "space":
                return null;
            case "hr":
                return <Hr />;
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
                if (
                    token.tokens?.some((t) => t.type === "html") &&
                    token.tokens?.every((t) => t.type === "html" || t.raw === "\n")
                ) {
                    return <DocumentToken token={{ ...token, type: "html" }} />;
                }

                return <Paragraph>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Paragraph>;
            case "strong":
                return <Strong>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Strong>;
            case "del":
                return <Del>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Del>;
            case "em":
                return <Em>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Em>;
            case "blockquote":
                return <Blockquote>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Blockquote>;
            case "codespan":
                return <CodeSpan>{token.raw.replace(/^`|`$/g, "")}</CodeSpan>;
            case "code":
                const { lang, configuration } = parseCodeLang(token.lang);
                if (configuration.switcher) {
                    const tabKey = typeof configuration.tab === "string" ? configuration.tab : lang;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    codeQueue[tabKey] = <CodeSection lang={lang as any} code={token.text} {...configuration} />;
                    return null;
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return <CodeSection lang={lang as any} code={token.text} {...configuration} />;
            case "escape":
                return token.text;
            case "list":
                const isTaskList = token.items.every((i: Tokens.ListItem) => i.task);
                if (isTaskList) {
                    const ListComponent = token.ordered ? TaskOrderedList : TaskUnorderedList;
                    return (
                        <ListComponent start={token.start}>
                            {token.items.map((elem: Tokens.ListItem, index: number) => (
                                <TaskListItem key={elem.raw + index} defaultChecked={elem.checked}>
                                    {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
                                </TaskListItem>
                            ))}
                        </ListComponent>
                    );
                }

                const ListComponent = token.ordered ? OrderedList : UnorderedList;
                return (
                    <ListComponent start={token.start}>
                        {token.items.map((elem: Tokens.ListItem, index: number) => (
                            <ListItem key={elem.raw + index}>
                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
                            </ListItem>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();
                // console.log("html", token);

                if (text.startsWith("<!---robin") && text.endsWith("-->")) {
                    const selfClosed = text.endsWith("/-->");
                    const componentName = text.match(/<!---robin ([\w]+)/)?.[1];

                    if (!componentName) {
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!validateComponentName(componentName)) {
                        console.warn(
                            `"${componentName}" is using incorrect casing. Use PascalCase for Robin components`,
                        );
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!components || !(componentName in components)) {
                        console.warn(`Unknown component: "${componentName}"`);
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }
                    const propRows = text.split(/\r?\n/).slice(1, -1);
                    const props = propRows.reduce<{ [key: string]: string | true }>((acc, cur) => {
                        const [_match, key, value] = cur.match(/^([\w]+)(?:="(.+)")?$/) || [];

                        if (!_match) {
                            console.warn(`Invalid component attribute: "${cur}"`);
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

                console.warn(`Unknown token ${token.type}`, token);
                return null;
        }
    };

    tokens.push({ type: "text", raw: "" });
    return <DocumentToken token={tokens} />;
};
