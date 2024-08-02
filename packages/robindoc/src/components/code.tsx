import React from "react";
import { createHighlighter, type BuiltinLanguage } from "shiki";
import { githubDynamic } from "../data/code-theme";

interface ShikiProps {
    code: string;
    lang: BuiltinLanguage;
    className?: string;
}

export async function Shiki({ code, lang, className }: ShikiProps) {
    const highlighter = await createHighlighter({ langs: [lang], themes: [] });
    await highlighter.loadTheme(githubDynamic);

    const html = highlighter.codeToHtml(code, {
        lang,
        theme: "github-dynamic",
        structure: "inline",
    });

    return <pre className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
