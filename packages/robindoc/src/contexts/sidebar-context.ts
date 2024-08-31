import { createContext } from "react";

export type SidebarContextType = {
    openedSections: string[];
};

export const SidebarContext = createContext<SidebarContextType>({
    openedSections: [],
});
