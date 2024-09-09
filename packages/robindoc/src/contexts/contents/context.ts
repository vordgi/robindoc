"use client";

import { createContext } from "react";

export const HeadingsContext = createContext<HTMLHeadingElement[]>([]);
export const CurrentHeadingContext = createContext<number | null>(null);
