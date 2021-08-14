import React from "react";
import { animated, useSpring } from "react-spring";
import IconButton from "./IconButton";

export function ExpandCollapseButton(props) {
    const spin = useSpring({
        transformOrigin: "center",
        transform: props.open ? "rotate(180deg)" : "rotate(0deg)",
    });

    return (
        <IconButton {...props}>
            <animated.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={spin}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </animated.svg>
        </IconButton>
    );
}
