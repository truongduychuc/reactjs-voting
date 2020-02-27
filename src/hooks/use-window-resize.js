import dom from "../_helpers/dom";
import {useEffect, useState} from "react";

export const useWindowResizeListener = () => {
    const [width, setWidth] = useState(dom.getWindowInnerWidth());
    const [height, setHeight] = useState(dom.getWindowInnerHeight);

    function onResize() {
        setWidth(dom.getWindowInnerWidth());
        setHeight(dom.getWindowInnerHeight());
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize)
        };
    }, []);
    return {
        width,
        height
    }
};
