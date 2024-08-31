"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { NavigateContext, NavigateListener, NavigateContextType } from "../../contexts/navigate-context";

export const NavigateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const listenersRef = useRef<NavigateListener[]>([]);

    const addListener: NavigateContextType["addListener"] = useCallback((key, listener) => {
        const prevKeyListener = listenersRef.current.findIndex((el) => el.key === key);
        if (prevKeyListener !== -1) {
            listenersRef.current.splice(prevKeyListener, 1);
        }
        listenersRef.current.push({ key, listener });
    }, []);

    const removeListener: NavigateContextType["removeListener"] = useCallback((key) => {
        const prevKeyListener = listenersRef.current.findIndex((el) => el.key === key);
        if (prevKeyListener !== -1) {
            listenersRef.current.splice(prevKeyListener, 1);
        }
    }, []);

    useEffect(() => {
        const popStateHandler = () => {
            listenersRef.current.forEach((el) => el.listener());
        };
        window.addEventListener("popstate", popStateHandler);

        return () => {
            window.removeEventListener("popstate", popStateHandler);
        };
    }, []);

    return (
        <NavigateContext.Provider value={{ listeners: listenersRef.current, addListener, removeListener }}>
            {children}
        </NavigateContext.Provider>
    );
};
