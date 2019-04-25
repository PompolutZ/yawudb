import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        margin: '1rem',
        border: '1px solid gray',
        borderRadius: '.5rem',
        backgroundColor: '#3B9979',
    },

    text: {
        margin: '1rem',
        color: 'white'
    }
})

function CardRule({ classes, rule }) {
    return (
        <div className={classes.root}>
            <Typography className={classes.text}>{rule}</Typography>
        </div>
    )
}

export default withStyles(styles)(CardRule);