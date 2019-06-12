import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SET_SCROLL_INDEX } from '../../reducers/library'
import { AddCardSVG, DeckSVG } from '../../atoms/SVGs'
import { withFirebase } from '../../firebase'
import * as ROUTES from '../../constants/routes'
import AccountMenuButton from './AccountMenuButton'

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        zIndex: '42',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    desktopOnly: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
})

class MenuAppBar extends React.Component {
    state = {
        left: false,
        anchorEl: null,
    }

    toggleDrawer = open => () => {
        this.setState({
            left: open,
        })
    }

    handleChange = event => {
        this.setState({ auth: event.target.checked })
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    handleCloseMenuAndNavigateToRoute = route => () => {
        this.handleClose()
        this.props.history.push(route)
    }

    handleNavigateToRoute = route => () => {
        this.props.history.push(route)
    }

    handleSignOut = () => {
        this.handleClose()
        this.props.firebase
            .signOut()
            .then(this.navigateHome)
            .catch(err => console.log(err))
    }

    navigateHome = () => {
        this.props.history.push(ROUTES.HOME)
    }

    navigateBack = () => {
        this.props.history.goBack()
    }

    isEndRoute = () =>
        this.props.currentLocation.startsWith(ROUTES.VIEW_CARD) ||
        this.props.currentLocation.startsWith(ROUTES.VIEW_DECK)

    render() {
        const { classes, history } = this.props

        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    <ListItem
                        button
                        onClick={this.handleNavigateToRoute(
                            ROUTES.CREATE_NEW_DECK
                        )}
                    >
                        <ListItemText primary="Deck Builder" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={this.handleNavigateToRoute(
                            ROUTES.CARDS_LIBRARY
                        )}
                    >
                        <ListItemText
                            primary={
                                <div>
                                    Card Library
                                    <sup style={{ color: 'gray' }}>&alpha;</sup>
                                </div>
                            }
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={this.handleNavigateToRoute(
                            ROUTES.BROWSE_ALL_DECKS
                        )}
                    >
                        <ListItemText primary="Decks" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={this.handleNavigateToRoute(
                            ROUTES.STATISTICS
                        )}
                    >
                        <ListItemText
                            primary={
                                <div>
                                    Statistics
                                    <sup style={{ color: 'gray' }}>&alpha;</sup>
                                </div>
                            }
                        />
                    </ListItem>

                    <Divider />
                    <List component="nav">
                        <ListItem
                            button
                            onClick={this.handleNavigateToRoute(
                                ROUTES.MY_DECKS
                            )}
                        >
                            <ListItemText primary="My Decks" />
                        </ListItem>
                    </List>

                    <Divider />
                    <List component="nav">
                        <ListItem
                            button
                            onClick={this.handleNavigateToRoute(
                                ROUTES.FEEDBACK
                            )}
                        >
                            <ListItemText primary="Feedback" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleNavigateToRoute(ROUTES.ABOUT)}
                        >
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </List>
            </div>
        )

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
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
                        <IconButton
                            className={classes.desktopOnly}
                            onClick={this.navigateToDeckBuilder}
                        >
                            <AddCardSVG
                                style={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        </IconButton>
                        <IconButton
                            className={classes.desktopOnly}
                            onClick={this.navigateToAllDecks}
                        >
                            <DeckSVG
                                style={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        </IconButton>

                        <AccountMenuButton />
                    </Toolbar>
                </AppBar>
                <div>
                    <Drawer
                        open={this.state.left}
                        onClose={this.toggleDrawer(false)}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>
                </div>
            </div>
        )
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth !== null,
        avatar: state.auth !== null ? state.auth.avatar : null,
        currentLocation: state.router.location.pathname,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch({ type: 'CLEAR_USER' }),
        resetScrollIndex: () =>
            dispatch({ type: SET_SCROLL_INDEX, payload: 0 }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(MenuAppBar))))
