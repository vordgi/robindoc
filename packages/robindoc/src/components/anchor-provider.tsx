"use client";

import React, { createContext, useCallback, useEffect, useRef, useState } from "react";

export const RegisterContext = createContext<((ref: HTMLHeadingElement) => void) | null>(null);
export const CurrentSectionContext = createContext<number | null>(null);

export const AnchorProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const anchors = useRef<HTMLHeadingElement[]>([]);

    const register = useCallback((ref: HTMLHeadingElement) => {
        if (ref?.id && !anchors.current.find((el) => el.id === ref.id)) {
            anchors.current.push(ref);
        }
    }, []);
    const updateTargetSection = useCallback(() => {
        if (window.scrollY + 20 > document.body.scrollHeight - window.innerHeight) {
            setActiveIndex(anchors.current.length - 1);
        } else if (window.scrollY + 100 > document.body.scrollHeight - window.innerHeight) {
            setActiveIndex(anchors.current.length - 2);
        } else {
            const headingIndex = anchors.current.findLastIndex((el) => el.offsetTop < window.scrollY + 100);
            setActiveIndex(headingIndex);
        }
    }, []);

    const effected = useRef(false);
    useEffect(() => {
        if (effected.current) {
            updateTargetSection();

            let scheduledAnimationFrame = false;
            window.addEventListener("scroll", () => {
                if (!scheduledAnimationFrame && window.innerWidth > 1080) {
                    scheduledAnimationFrame = true;
                    setTimeout(() => {
                        updateTargetSection();
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
