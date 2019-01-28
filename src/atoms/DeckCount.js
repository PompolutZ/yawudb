import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

class DeckCount extends Component {
    render() {
        const { classes, faction, count } = this.props;
        return (
            <div>
                <Badge classes={{colorPrimary: classes.colorPrimary}} color="primary" className={classes.margin} badgeContent={count}>
                    <img alt={faction} src={`/assets/icons/${faction}-deck.png`} className={classes.img} />
                </Badge>
            </div>
        );
    }
}

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 1.5,
    }, 

    colorPrimary: {
        backgroundColor: 'magenta',
        color: 'white'
    },

    img: {
        width: '3rem',
        height: '3rem'
    }
});

export default withStyles(styles)(DeckCount);