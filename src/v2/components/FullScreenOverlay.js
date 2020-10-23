import React, { useState, useEffect } from "react";
import { animated, useTransition } from "react-spring";
import { ReactComponent as CloseIcon } from "../../svgs/x.svg";

const FullScreenOverlay = ({
    icon: Icon,
    children,
    hasCloseButton,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const transition = useTransition(open, {
        from: { opacity: 0.5, transform: "translateY(-10%)" },
        enter: { opacity: 1, transform: "translateY(0)" },
    });

    useEffect(() => {
        if(!open) return; 
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'visible';
        }
    }, [open])

    return (
        <>
            <div onClick={() => setOpen((prev) => !prev)}>
                <Icon />
            </div>

            {transition((style, item, t) => {
                return (
                    item && (
                        <animated.div
                            className="fixed inset-0 bg-gray-100 z-50 flex flex-col"
                            style={style}
                        >
                            {hasCloseButton && (
                                <CloseIcon
                                    className="text-gray-900 stroke-current mt-4 mr-4 ml-auto cursor-pointer hover:text-gray-700"
                                    onClick={() => setOpen((prev) => !prev)}
                                />
                            )}

                            <div className="overflow-auto">
                                {children}
                            </div>
                        </animated.div>
                    )
                );
            })}
        </>
    );
};

export default FullScreenOverlay;
