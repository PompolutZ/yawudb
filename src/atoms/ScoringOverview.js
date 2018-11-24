import React, { PureComponent } from 'react';
import ObjectiveScoreTypeIcon from '../components/ObjectiveScoreTypeIcon';
import Typography from '@material-ui/core/Typography';
import SheduleIcon from '@material-ui/icons/Schedule';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import StarsIcon from '@material-ui/icons/Stars';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    text: {
        fontSize: '.7rem',
    },

    icon: {
        width: '.7rem', 
        height: '.7rem', 
        margin: '0 0 0 0',
    },

    totalScore: {
        width: '1rem',
        height: '1rem',
        margin: 'auto',
    }
});

class ScoringOverview extends PureComponent {
    render() {
        const { classes, summary, glory } = this.props;
        return (
            <div style={{display: 'flex', flexFlow: 'row wrap', fontFamily: `'Roboto', sans-serif`, alignItems: 'center'}}>
                <Typography className={classes.text}>(</Typography>
                <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                    <div style={{ order: 0}}>
                    { summary[0] > 0 && (
                        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
                        <FlashOnIcon className={classes.icon} />
                        <Typography className={classes.text}>{summary[0]}</Typography>
                        </div>
                    )}
                    </div>
                    <div style={{ order: 1}}>
                    { summary[3] > 0 && (
                        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .3rem'}}>
                        <HourglassEmptyIcon className={classes.icon} />
                        <Typography className={classes.text}>{summary[3]}</Typography>
                        </div>
                    )}
                    </div>
                    <div style={{ order: 2}}>
                    { summary[1] > 0 && (
                        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .3rem'}}>
                        <SheduleIcon className={classes.icon} />
                        <Typography className={classes.text}>{summary[1]}</Typography>
                        </div>
                    )}
                    </div>
                    <div style={{ order: 3}}>
                    { summary[2] > 0 && (
                        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .3rem'}}>
                        <HourglassFullIcon className={classes.icon} />
                        <Typography className={classes.text}>{summary[2]}</Typography>
                        </div>
                    )}
                    </div>
                </div>
                <Typography className={classes.text}>)</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '.5rem'}}>
                    <svg className={classes.totalScore} style={{fill: '#D38E36' }} viewBox="0 0 24 24">
                        <path xmlns="http://www.w3.org/2000/svg" d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 6z"/>
                    </svg>
                    <Typography className={classes.text} style={{ color: 'black', fontSize: '1rem'}}>{glory}</Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ScoringOverview);