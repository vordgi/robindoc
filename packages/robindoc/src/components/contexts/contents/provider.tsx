"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CurrentHeadingContext, HeadingsContext } from "./context";

export const ContentsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const headings = useRef<HTMLHeadingElement[]>([]);

    const updateTargetSection = useCallback(() => {
        if (window.scrollY + 20 > document.body.scrollHeight - window.innerHeight) {
            setActiveIndex(headings.current.length - 1);
        } else {
            const headingIndex = headings.current.findLastIndex((el) => el.offsetTop < window.scrollY + 100);
            if (
                window.scrollY + 100 > document.body.scrollHeight - window.innerHeight &&
                headingIndex < headings.current.length - 2
            ) {
                setActiveIndex(headings.current.length - 2);
            } else {
                setActiveIndex(headingIndex);
            }
        }
    }, []);

    useEffect(() => {
        let scheduledAnimationFrame = false;
        const scrollHandler = () => {
            if (!scheduledAnimationFrame && window.innerWidth > 1080) {
                scheduledAnimationFrame = true;
                setTimeout(() => {
                    updateTargetSection();
                    scheduledAnimationFrame = false;
                }, 100);
            }
        };

        updateTargetSection();
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <HeadingsContext.Provider value={headings.current}>
            <CurrentHeadingContext.Provider value={activeIndex}>{children}</CurrentHeadingContext.Provider>
        </HeadingsContext.Provider>
    );
};
