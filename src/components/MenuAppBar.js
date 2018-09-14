import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Drawer, List, ListItem, ListItemText, Button, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  wuPrimaryColor: {
    backgroundColor: '#3B9979'
  },

};

class MenuAppBar extends React.Component {
  state = {
    left: false,
    userAvatarUrl: null,
    anchorEl: null,
  };

  toggleDrawer = (open) => () => {
        this.setState({
        left: open,
        });
    };

    componentDidMount() {
        this.cancelInterval = setInterval(() => {
        const user = firebase.auth().currentUser;
        
        if(user) {
            this.setState(({userAvatarUrl: user.photoURL}))
            clearInterval(this.cancelInterval);
        }
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.cancelInterval);
    }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, history } = this.props;
    const { userAvatarUrl, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
        <div className={classes.list}>
          <List component="nav">
            <ListItem button onClick={() => history.push('/newdeck')}>
                <ListItemText primary="Deck Builder" />
            </ListItem>
            <ListItem button onClick={() => history.push('/decks')}>
                <ListItemText primary="Decks" />
            </ListItem>
          </List>
        </div>
      );

    return (
      <div className={classes.root}>
        <AppBar position="static" classes={{colorPrimary: classes.wuPrimaryColor}}>
          <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
                Yet Another WUdb
            </Typography>
            {userAvatarUrl && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar src={userAvatarUrl} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
            {
                !userAvatarUrl && (
                    <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
                )
            }
          </Toolbar>
        </AppBar>
        <div>
              <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
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
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MenuAppBar));