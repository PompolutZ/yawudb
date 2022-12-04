import React, { useState, useContext } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { animated, useSpring, useTransition, config } from "react-spring";
import { ReactComponent as MenuIcon } from "../../svgs/menu.svg";
import Divider from "./Divider";
import { FirebaseContext } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import useMeasure from "react-use-measure";
import { CHAMPIONSHIP_FORMAT } from "@wudb/index";

export default function NavigationPanel() {
    const { pathname } = useLocation();

    return (
        <header className="mx-2 sm:mx-8 flex p-2 items-center relative">
            <div className="mr-8">
                <Link
                    className="text-base block mr-8 cursor-pointer uppercase font-bold hover:text-purple-700"
                    to="/"
                >
                    <Logo className="h-8 filter drop-shadow-md" />
                </Link>
            </div>
            <Menu
                classes={`hidden text-sm lg:flex flex-1 lg:items-center ${
                    new RegExp(/^\/$/).test(pathname)
                        ? "text-white"
                        : "text-gray-900"
                }`}
            >
                <UserMenu />
            </Menu>
            <MobileMenu
                className={`text-2xl stroke-current stroke-2 ml-auto lg:hidden ${
                    new RegExp(/^\/$/).test(pathname)
                        ? "text-white"
                        : "text-gray-900"
                }`}
            />
        </header>
    );
}

function AnimatedLink(props) {
    const [hovering, setHovering] = useState(false);
    const [ref, { width }] = useMeasure();
    const spring = useSpring({
        width: hovering ? width * 0.33 : 0,
        config: {
            duration: 175,
        },
    });
    return (
        <div className={`relative ${props.container}`}>
            <Link {...props}>
                <span
                    ref={ref}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {props.children}
                </span>
            </Link>
            <animated.div
                className="absolute h-[2px] -mb-1 bg-purple-500"
                style={spring}
            ></animated.div>
        </div>
    );
}

function UserMenu() {
    const auth = useAuthUser();
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    return (
        <>
            <AnimatedLink
                className="block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                to={ROUTES.MY_DECKS}
            >
                My Decks
            </AnimatedLink>

            {auth && (
                <>
                    <AnimatedLink
                        className="block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                        to={ROUTES.PROFILE}
                    >
                        Profile
                    </AnimatedLink>
                    <a
                        href="#"
                        className="block lg:ml-auto mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                        onClick={() =>
                            firebase.signOut().then(history.push("/"))
                        }
                    >
                        Sign Out
                    </a>
                </>
            )}
            {!auth && (
                <AnimatedLink
                    className="cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                    container="block mr-8 lg:ml-auto"
                    to={ROUTES.SIGN_IN}
                >
                    Sign In
                </AnimatedLink>
            )}
            <Link
                className="hidden lg:block focus:bg-purple-500 hover:bg-purple-500 btn btn-purple mr-8 cursor-pointer px-4 py-2 font-bold"
                to="/deck/create"
            >
                + New Deck
            </Link>
        </>
    );
}

const MobileMenu = ({ className }) => {
    const [open, setOpen] = useState(false);
    const transition = useTransition(open, {
        from: { opacity: 0.5, transform: "translateY(-10%)" },
        enter: { opacity: 1, transform: "translateY(0)" },
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
                            className="fixed inset-0 bg-gray-100 z-50"
                            style={style}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <Menu
                                classes="flex p-8 flex-col space-y-6 items-end justify-evenly text-xl"
                                showHome
                            >
                                <Divider />

                                <UserMenu />
                            </Menu>
                        </animated.div>
                    )
                );
            })}
        </>
    );
};

const Menu = ({ classes, showHome, children }) => {
    const auth = useAuthUser();

    return (
        <nav className={`${classes}`}>
            {showHome && (
                <Link
                    className="block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                    to="/"
                >
                    Home
                </Link>
            )}
            <Link
                className="block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700 lg:hidden text-purple-900"
                to="/deck/create"
            >
                Create New Deck
            </Link>

            <AnimatedLink
                className="block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                to={ROUTES.BROWSE_ALL_DECKS}
            >
                Public decks
            </AnimatedLink>
            <AnimatedLink
                className="mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                to={`${ROUTES.BOARDS_BASE}/${CHAMPIONSHIP_FORMAT}`}
            >
                Boards
            </AnimatedLink>
            <AnimatedLink
                className="hidden lg:block mr-8 cursor-pointer uppercase font-bold lg:text-xs hover:text-purple-700"
                to={ROUTES.CARDS_LIBRARY}
            >
                Library
            </AnimatedLink>

            {children}
        </nav>
    );
};
