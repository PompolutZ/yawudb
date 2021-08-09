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

export default function NavigationPanel() {
    const { pathname } = useLocation();

    return (
        <header className="mx-2 sm:mx-8 flex p-2 items-center relative">
            <div className="mr-8">
                <Link
                    className="text-base block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to="/"
                >
                    <Logo className="h-8 lg:h-12 filter drop-shadow-md" />
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
        width: hovering ? width * 0.8 : 0,
        config: config.stiff,
    });
    return (
        <div
            ref={ref}
            className="relative"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Link {...props}>{props.children}</Link>
            <animated.div
                className="absolute h-1 -mb-1 bg-purple-500"
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
                className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                to={ROUTES.MY_DECKS}
            >
                My Decks
            </AnimatedLink>
            {/* <Link
                className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                to={ROUTES.MY_DECKS}
            >
                My Decks
            </Link> */}
            {auth && (
                <>
                    <AnimatedLink
                        className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                        to={ROUTES.PROFILE}
                    >
                        Profile
                    </AnimatedLink>
                    <a
                        href="#"
                        className="block mt-4 lg:mt-0 lg:ml-auto mr-8 cursor-pointer hover:font-semibold pt-px"
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
                    className="block mr-8 lg:ml-auto cursor-pointer hover:font-semibold pt-px"
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

const Menu = ({ classes, showHome, children }) => {
    const auth = useAuthUser();

    return (
        <nav className={`${classes}`}>
            {showHome && (
                <Link
                    className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                    to="/"
                >
                    Home
                </Link>
            )}
            <Link
                className="block mr-8 cursor-pointer hover:font-semibold pt-px lg:hidden text-purple-900"
                to="/deck/create"
            >
                Create New Deck
            </Link>

            <AnimatedLink
                className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                to={ROUTES.BROWSE_ALL_DECKS}
            >
                Public decks
            </AnimatedLink>
            <AnimatedLink
                className="block mr-8 cursor-pointer hover:font-semibold pt-px"
                to={ROUTES.CARDS_LIBRARY}
            >
                Library
            </AnimatedLink>

            {children}
        </nav>
    );
};
