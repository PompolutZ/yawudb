import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SET_SCROLL_INDEX } from "../../reducers/library";
import { AddCardSVG, DeckSVG } from "../../atoms/SVGs";
import { withFirebase } from "../../firebase";
import * as ROUTES from "../../constants/routes";
import AccountMenuButton from "./AccountMenuButton";
import ResponsiveDrawer, { drawerWidth } from "./ResponsiveDrawer";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        //position: 'fixed',
        zIndex: 1000,
        width: "100%",
    },
    grow: {
        flexGrow: 1,
        cursor: "pointer",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },

    desktopOnly: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
});

class MenuAppBar extends React.Component {
    state = {
        left: false,
        anchorEl: null,
    };

    toggleDrawer = (open) => () => {
        this.setState({
            left: open,
        });
    };

    // handleChange = (event) => {
    //     this.setState({ auth: event.target.checked });
    // };

    // handleMenu = (event) => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    // handleCloseMenuAndNavigateToRoute = (route) => () => {
    //     this.handleClose();
    //     this.props.history.push(route);
    // };

    // handleNavigateToRoute = (route) => () => {
    //     this.props.history.push(route);
    // };

    handleSignOut = () => {
        this.handleClose();
        this.props.firebase
            .signOut()
            .then(this.navigateHome)
            .catch((err) => console.log(err));
    };

    navigateHome = () => {
        this.props.history.push(ROUTES.HOME);
    };

    navigateBack = () => {
        this.props.history.goBack();
    };

    isEndRoute = () =>
        this.props.currentLocation.startsWith(ROUTES.VIEW_CARD) ||
        this.props.currentLocation.startsWith(ROUTES.VIEW_DECK);

    render() {
        const { classes } = this.props;

        return (
            <>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        {!this.isEndRoute() && (
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        {this.isEndRoute() && (
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.navigateBack}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            className={classes.grow}
                            onClick={this.navigateHome}
                        >
                            YAWUDB
                        </Typography>

                        <AccountMenuButton />
                    </Toolbar>
                </AppBar>
                            
                <ResponsiveDrawer mobileOpen={this.state.left} handleDrawerToggle={this.toggleDrawer(false)} />
            </>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth !== null,
        avatar: state.auth !== null ? state.auth.avatar : null,
        currentLocation: state.router.location.pathname,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch({ type: "CLEAR_USER" }),
        resetScrollIndex: () =>
            dispatch({ type: SET_SCROLL_INDEX, payload: 0 }),
    };
};

export { drawerWidth } from './ResponsiveDrawer';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(MenuAppBar))));
