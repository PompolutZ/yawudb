import React from "react";
import useAuthUser from "../../hooks/useAuthUser";
import * as ROUTES from "../../constants/routes";
import { Link } from 'react-router-dom';
import Logo from "./Logo";

function NavigationPanel() {
    const auth = useAuthUser();

    return (
        <div className="w-full flex m-4 pb-4 items-center border-b-2 border-accent border-opacity-25">
            <div className="mr-8">
                <Logo />
            </div>
            <Link className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px" to="/deck/create">Create New Deck</Link>
            <Link className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px" to={ROUTES.BROWSE_ALL_DECKS}>Public decks</Link>
            <Link className="c-accent text-base block mr-8 cursor-pointer hover:font-semibold pt-px" to={ROUTES.CARDS_LIBRARY}>Library</Link>
        </div>
    );
}

export default NavigationPanel;
