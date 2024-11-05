import React from "react";

import { type Theme } from "@src/core/types/theme";

export interface ThemeStylesProps {
    theme: Theme;
}

export const ThemeStyles: React.FC<ThemeStylesProps> = ({ theme }) => {
    const { colors = {} } = theme;

    const colorsStyles = Object.entries(colors).reduce<string[]>((acc, [type, variants]) => {
        Object.entries(variants).forEach(([key, color]) => {
            acc.push(`--${type}-${key}:${color};`);
        });
        return acc;
    }, []);

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `:root{${colorsStyles.join("")}}`,
            }}
        />
    );
};
