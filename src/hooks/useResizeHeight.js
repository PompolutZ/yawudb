import { useState } from "react";
import useMeasure from "react-use-measure";


export function useResizeHeight(config) {
    const [open, setOpen] = useState(config.open);
    const [ref, { height }] = useMeasure();

    const toggle = () => setOpen((prev) => !prev);

    return [ref, open, toggle, height];
}