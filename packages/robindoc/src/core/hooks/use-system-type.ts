import { useEffect, useState } from "react";

export type SystemType = null | "other" | "apple";

export const useSystemType = () => {
    const [system, setSystem] = useState<SystemType>(null);

    useEffect(() => {
        if (navigator.userAgent.includes("Macintosh")) {
            setSystem("apple");
        } else {
            setSystem("other");
        }
    }, []);

    return system;
};
