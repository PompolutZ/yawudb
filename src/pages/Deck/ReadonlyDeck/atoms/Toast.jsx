import React, { useEffect, useState } from "react";
import { animated as a, useSpring } from "react-spring";

export function Toast({ show, className, children, onTimeout }) {
    const [visible, setVisible] = useState(show);
    const spring = useSpring({ opacity: visible ? 1 : 0, translateY: visible ? -10 : 0 });

    useEffect(() => {
        setVisible(show);
        const toastTimeout = setTimeout(() => {
            setVisible(false);
            onTimeout();
        }, 3000);

        return () => clearTimeout(toastTimeout);
    }, [show]);
    return (
        <div className={`${visible ? 'fixed visible w-full' : 'hidden'} bottom-0 flex justify-center items-end `}>
            <a.div
                className={`${className}`}
                style={spring}
            >
                {children}
            </a.div>
        </div>
    );
}
