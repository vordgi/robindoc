"use client";

import React, { useRef } from "react";
import { SidebarContext } from "./context";

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const store = useRef<string[]>([]);

    return <SidebarContext.Provider value={store.current}>{children}</SidebarContext.Provider>;
};
