import { useCallback, useEffect, useState } from "react";

export const useModal = () => {
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        setOpened(true);
    };
    const closeHandler = () => {
        setOpened(false);
    };

    const closeOnEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            closeHandler();
        }
    }, []);

    useEffect(() => {
        if (opened) {
            window.addEventListener("keydown", closeOnEscape);
        } else {
            window.removeEventListener("keydown", closeOnEscape);
        }

        return () => {
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [opened]);

    return { opened, openHandler, closeHandler };
};
