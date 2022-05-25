import {useState} from "react";

export const useMobile = (func, number) => {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 900px)").matches)

    const mediaHandler = (e) => {
        setIsMobile(e.matches)
        if (func !== undefined) func()
    };

    window.matchMedia(`(max-width: ${number}px)`).addEventListener('change', mediaHandler);

    return isMobile
}