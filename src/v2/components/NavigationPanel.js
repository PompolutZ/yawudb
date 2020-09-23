import React, { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { animated, useTransition } from "react-spring";

const MenuIcon = ({ className }) => {
    const [open, setOpen] = useState(false);
    const transition = useTransition(open, {
        from: { opacity: 0, transform: 'translate3d(0,-100%,0)'},
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-100%,0)' },
    });

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={className}
                onClick={() => setOpen((prev) => !prev)}
            >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            {
                transition((style, item) => {
                    return (
                        item && 
                        <animated.div
                            className="fixed inset-0 w-screen h-48 bg-red-900"
                            style={style}
                            onClick={() => setOpen(prev => !prev)}
                        ></animated.div>
                    );
                })
            }
        </>
    );
};

const Menu = ({ open }) => {};

function NavigationPanel() {
    const auth = useAuthUser();
    return (
        <header className="mx-2 sm:mx-4 flex p-2 items-center border-b-2 border-accent border-opacity-25">
            <div className="mr-8">
                <Link
                    className="text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to="/"
                >
                    <Logo />
                </Link>
            </div>
            <nav className="hidden md:flex">
                <Link
                    className="text-gray-900 text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to="/deck/create"
                >
                    Create New Deck
                </Link>
                <Link
                    className="text-gray-900 text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to={ROUTES.BROWSE_ALL_DECKS}
                >
                    Public decks
                </Link>
                <Link
                    className="text-gray-900 text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to={ROUTES.CARDS_LIBRARY}
                >
                    Library
                </Link>
            </nav>
            <MenuIcon className="text-gray-900 stroke-current stroke-2 ml-auto md:hidden" />
        </header>
    );
}

export default NavigationPanel;
