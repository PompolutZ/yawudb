import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router';

const styles = {
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

};

class ButtonAppBar extends Component {
    state = {
        left: false,
      };
    
    toggleDrawer = (open) => () => {
        this.setState({
          left: open,
        });
      };
    
    render() {
        const { classes, history } = this.props;
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
            <AppBar position="static" color="primary" classes={{colorPrimary: classes.wuPrimaryColor}}>
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Yet Another WUdb
                </Typography>
                <Button color="inherit">Login</Button>
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