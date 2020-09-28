import React, { useState, useContext } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { animated, useTransition } from "react-spring";
import { ReactComponent as MenuIcon } from "../../svgs/menu.svg";
import Divider from "./Divider";
import { FirebaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";

export default function NavigationPanel() {
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
            <Menu classes="hidden lg:flex text-sm flex-1">
                <UserMenu />
            </Menu>
            <MobileMenu className="text-gray-900 text-2xl stroke-current stroke-2 ml-auto lg:hidden" />
        </header>
    );
}

function UserMenu() {
    const auth = useAuthUser();
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    return (
        <>
            <Link
                className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
                to={ROUTES.MY_DECKS}
            >
                My Decks
            </Link>

            {auth && (
                <>
                    <Link
                        className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
                        to={ROUTES.PROFILE}
                    >
                        Profile
                    </Link>
                    <a
                        className="text-accent block mt-4 lg:mt-0 lg:ml-auto mr-8 cursor-pointer hover:font-semibold pt-px"
                        onClick={() =>
                            firebase.signOut().then(history.push("/"))
                        }
                    >
                        Sign Out
                    </a>
                </>
            )}
            {!auth && (
                <Link
                    className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to={ROUTES.SIGN_IN}
                >
                    Sign In
                </Link>
            )}
        </>
    );
}

const MobileMenu = ({ className }) => {
    const [open, setOpen] = useState(false);
    const transition = useTransition(open, {
        from: { opacity: 0, transform: "translate3d(0,-100%,0)" },
        enter: { opacity: 1, transform: "translate3d(0,0,0)" },
        leave: { opacity: 0, transform: "translate3d(0,-100%,0)" },
    });

    return (
        <>
            <MenuIcon
                className={className}
                onClick={() => setOpen((prev) => !prev)}
            />
            {transition((style, item) => {
                return (
                    item && (
                        <animated.div
                            className="fixed inset-0 bg-gray-100 z-10"
                            style={style}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <Menu
                                classes="flex p-8 flex-col items-end justify-evenly text-xl"
                                showHome
                            >
                                <Divider className="my-8" />

                                <UserMenu />
                            </Menu>
                        </animated.div>
                    )
                );
            })}
        </>
    );
};

const Menu = ({ classes, showHome, children }) => (
    <nav className={`${classes}`}>
        {showHome && (
            <Link
                className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
                to="/"
            >
                Home
            </Link>
        )}
        <Link
            className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
            to="/deck/create"
        >
            Create New Deck
        </Link>
        <Link
            className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
            to={ROUTES.BROWSE_ALL_DECKS}
        >
            Public decks
        </Link>
        <Link
            className="text-gray-900 block mr-8 cursor-pointer hover:font-semibold pt-px"
            to={ROUTES.CARDS_LIBRARY}
        >
            Library
        </Link>

        {children}
    </nav>
);
