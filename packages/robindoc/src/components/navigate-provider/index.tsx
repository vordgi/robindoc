"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { NavigateContext, NavigateListener, NavigateContextType } from "../../contexts/navigate-context";

export const NavigateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const readyRef = useRef(false);
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
        if (readyRef.current) {
            window.addEventListener("popstate", () => {
                listenersRef.current.forEach((el) => el.listener());
            });
        }

        return () => {
            readyRef.current = true;
        };
    }, []);

    return (
        <NavigateContext.Provider value={{ listeners: listenersRef.current, addListener, removeListener }}>
            {children}
        </NavigateContext.Provider>
    );
};
