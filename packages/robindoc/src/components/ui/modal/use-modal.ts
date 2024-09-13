import { useCallback, useEffect, useState } from "react";

export const useModal = () => {
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        document.documentElement.classList.add("body-lock");
        setOpened(true);
    };
    const closeHandler = () => {
        document.documentElement.classList.remove("body-lock");
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
