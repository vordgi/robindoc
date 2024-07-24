"use client";

import React, { createContext, useCallback, useEffect, useRef, useState } from "react";

export const RegisterContext = createContext<((ref: HTMLHeadingElement) => void) | null>(null);
export const CurrentSectionContext = createContext<number | null>(null);

export const AnchorProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const anchors = useRef<HTMLHeadingElement[]>([]);

    const register = useCallback((ref: HTMLHeadingElement) => {
        if (!anchors.current.find((el) => el.id === ref.id)) {
            anchors.current.push(ref);
        }
    }, []);
    const findTargetSection = useCallback(() => {
        const headingIndex = anchors.current.findLastIndex((el) => el.offsetTop < window.scrollY + 200);
        setActiveIndex(headingIndex);
    }, []);

    const effected = useRef(false);
    useEffect(() => {
        if (effected.current) {
            findTargetSection();

            let scheduledAnimationFrame = false;
            window.addEventListener("scroll", () => {
                if (!scheduledAnimationFrame) {
                    scheduledAnimationFrame = true;
                    setTimeout(() => {
                        findTargetSection();
                        scheduledAnimationFrame = false;
                    }, 100);
                }
            });
        }
        return () => {
            effected.current = true;
        };
    }, []);

    return (
        <CurrentSectionContext.Provider value={activeIndex}>
            <RegisterContext.Provider value={register}>{children}</RegisterContext.Provider>
        </CurrentSectionContext.Provider>
    );
};
