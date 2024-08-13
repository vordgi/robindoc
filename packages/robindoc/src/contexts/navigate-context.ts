import { createContext } from "react";

type Listener = () => void;

export type NavigateListener = {
    key: string;
    listener: () => void;
};

export type NavigateContextType = {
    listeners: NavigateListener[];
    addListener: (key: string, listener: Listener) => void;
    removeListener: (key: string) => void;
};

export const NavigateContext = createContext<NavigateContextType>({
    listeners: [],
    addListener: () => {},
    removeListener: () => {},
});
