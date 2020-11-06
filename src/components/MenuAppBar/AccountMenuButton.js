import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
//import firebase from '../firebase/firebase';
import { FirebaseContext } from "../../firebase";
import * as ROUTES from "../../constants/routes";
import useAuthUser from "../../hooks/useAuthUser";

function AccountMenuButton({ history }) {
    const firebase = React.useContext(FirebaseContext);
    const authUser = useAuthUser();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseMenuAndNavigateToRoute = (route) => () => {
        handleClose();
        history.push(route);
    };

    const navigateHome = () => {
        history.push(ROUTES.HOME);
    };

    const handleSignOut = () => {
        handleClose();
        firebase
            .signOut()
            .then(navigateHome)
            .catch((err) => console.error(err));
    };

    return (
        <React.Fragment>
            {!!authUser && (
                <React.Fragment>
                    <IconButton
                        aria-owns={open ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar src={authUser.avatar} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={handleCloseMenuAndNavigateToRoute(
                                ROUTES.PROFILE
                            )}
                        >
                            Profile
                        </MenuItem>
                        {/* <MenuItem
                            onClick={handleCloseMenuAndNavigateToRoute(
                                ROUTES.MY_DECKS
                            )}
                        >
                            My decks
                        </MenuItem> */}
                        <Divider />
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
            {authUser === null && (
                <React.Fragment>
                    <IconButton
                        aria-owns={open ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={handleCloseMenuAndNavigateToRoute(
                                ROUTES.SIGN_IN
                            )}
                        >
                            Sign in
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withRouter(AccountMenuButton);
