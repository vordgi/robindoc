import React from "react";

import { type Theme } from "@src/core/types/theme";
import { NavigateProvider } from "@src/components/contexts/navigate/provider";
import { ThemeStyles } from "@src/components/blocks/theme-styles";
import { ThemeDetector } from "@src/components/blocks/theme-detector";
import { NoJs } from "@src/components/blocks/no-js";

interface RobinProviderProps {
    theme?: Theme;
}

export const RobinProvider: React.FC<React.PropsWithChildren<RobinProviderProps>> = ({ children, theme }) => (
    <>
        {theme && <ThemeStyles theme={theme} />}
        <ThemeDetector />
        <NavigateProvider>{children}</NavigateProvider>
        <NoJs />
    </>
);
