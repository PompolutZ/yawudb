import React from 'react';
import ExpansionIcon from './ExpansionIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap'
    }
});

const SetsList = ({ classes, sets }) => (
    <div className={classes.root}>
        {
            sets && sets.map(s => <ExpansionIcon key={s} set={s} />)
        }
    </div>
);

export default withStyles(styles)(SetsList);

