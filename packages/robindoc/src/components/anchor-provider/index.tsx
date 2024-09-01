"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CurrentSectionContext, RegisterContext } from "../../contexts/anchor-context";

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
        } else {
            const headingIndex = anchors.current.findLastIndex((el) => el.offsetTop < window.scrollY + 100);
            if (
                window.scrollY + 100 > document.body.scrollHeight - window.innerHeight &&
                headingIndex < anchors.current.length - 2
            ) {
                setActiveIndex(anchors.current.length - 2);
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
        <CurrentSectionContext.Provider value={activeIndex}>
            <RegisterContext.Provider value={register}>{children}</RegisterContext.Provider>
        </CurrentSectionContext.Provider>
    );
};
