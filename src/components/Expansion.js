import React, { PureComponent } from 'react';
import { setsIndex, setsNames } from '../data/index';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },

    small: {
        width: '1rem',
        height: '1rem',
    },

    medium: {
        width: '2rem',
        height: '2rem',
    },

    large: {
        width: '3rem',
        height: '3rem',
    }
});

class Expansion extends PureComponent {
    render() {
        const { classes, set } = this.props;
        return (
            <div className={classes.root}>
                <img className={classes.large} src={`/assets/icons/${setsIndex[set]}-icon.png`} alt={`${setsNames[set]}`} />
                {/* <Typography></Typography> */}
            </div>
        );
    }
}

export default withStyles(styles)(Expansion);