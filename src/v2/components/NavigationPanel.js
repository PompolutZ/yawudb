import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const MenuIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={className}
        >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    );
};

function NavigationPanel() {
    const auth = useAuthUser();

    return (
        <header className="w-full flex p-4 items-center border-b-2 border-accent border-opacity-25">
            <div className="mr-8">
                <Logo />
            </div>
            <nav className="hidden sm:flex">
                <Link
                    className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to="/deck/create"
                >
                    Create New Deck
                </Link>
                <Link
                    className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to={ROUTES.BROWSE_ALL_DECKS}
                >
                    Public decks
                </Link>
                <Link
                    className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to={ROUTES.CARDS_LIBRARY}
                >
                    Library
                </Link>
            </nav>
            <div className="p-2 border border-accent rounded ml-auto sm:hidden">
                <MenuIcon className="text-accent stroke-current" />
            </div>
        </header>
    );
}

export default NavigationPanel;
