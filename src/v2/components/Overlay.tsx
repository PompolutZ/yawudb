import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

interface OverlayProps {
    children: React.ReactNode;
    visible: boolean;
}

const SCREEN_WIDTH = window.screen.width;

export const Overlay = ({ children, visible }: OverlayProps) => {
    const [springs, api] = useSpring(() => ({
        from: {
            x: -SCREEN_WIDTH,
        },
    }));
    const hostRef = useRef(document.createElement("div"));

    useEffect(() => {
        if (visible) {
            modalRoot?.appendChild(hostRef.current);
            api.start({
                from: {
                    x: -SCREEN_WIDTH,
                },

                to: {
                    x: 0,
                },
            });
        }

        if (!visible && modalRoot?.hasChildNodes()) {
            const [animationFinished] = api.start({
                from: {
                    x: 0,
                },

                to: {
                    x: -SCREEN_WIDTH,
                },
            });

            animationFinished.then(() =>
                modalRoot?.removeChild(hostRef.current)
            );
        }
    }, [visible]);

    if (hostRef.current) {
        return createPortal(
            <div className="fixed inset-0 z-10 grid grid-cols-1 lg:grid-cols-3">
                <animated.div
                    style={{ ...springs }}
                    className="bg-white drop-shadow-md flex overflow-auto"
                >
                    {children}
                </animated.div>
            </div>,
            hostRef.current
        );
    }

    return null;
};
