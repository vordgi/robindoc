import { createContext } from "react";

export const RegisterContext = createContext<((ref: HTMLHeadingElement) => void) | null>(null);
export const CurrentSectionContext = createContext<number | null>(null);
