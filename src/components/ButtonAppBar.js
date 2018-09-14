import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router';
import firebase from '../firebase';
import { Avatar } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  wuPrimaryColor: {
      backgroundColor: '#3B9979'
  },
  list: {
    width: 250,
  },
  
  addNewDeckBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

class ButtonAppBar extends Component {
    state = {
        left: false,
        userAvatarUrl: null,
        anchorEl: null
      };

      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };    
      
      handleSignOut = history => {
        firebase.auth().signOut();
        history.push('/');
        this.setState({ anchorEl: null, userAvatarUrl: null });
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
    
    toggleDrawer = (open) => () => {
        this.setState({
          left: open,
        });
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
    
        const LoginButton = () => {
          if(!userAvatarUrl) {
            return <Button color="inherit" onClick={() => history.push('/login')}>Login</Button> 
          }
          
          return (
            <div>
              <IconButton aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
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
                  <MenuItem onClick={() => this.handleSignOut(history)}>Sign out</MenuItem>
                </Menu>
            </div>
          );
        };

      return (
        <div className={classes.root}>
          <AppBar position="static" color="primary" classes={{colorPrimary: classes.wuPrimaryColor}}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Yet Another WUdb
              </Typography>
              <Button className={classes.addNewDeckBtn} color="inherit" onClick={() => history.push('/newdeck')}>
                Create New Deck
              </Button>
              <LoginButton />    
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

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));