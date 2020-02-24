import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import OpenFormatIcon from '@material-ui/icons/Mood';
import ChampionshipFormatIcon from '@material-ui/icons/EmojiEvents';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { cardsDb } from '../data';
import { checkCardForsakenFor, ignoreAsDublicate } from '../utils/functions';

const useStyles = makeStyles(theme => ({
    container: {
        margin: 'auto 1rem'
    }, 

    icon: {
        width: '1rem',
        height: '1rem'
    }
}));

const RelicIcon = ({ className, style }) => (
    <SvgIcon className={className} style={style}>
        <path d="M 15 2 C 13.894531 2 13 2.894531 13 4 C 13 5.105469 13.894531 6 15 6 C 16.105469 6 17 5.105469 17 4 C 17 2.894531 16.105469 2 15 2 Z M 11.4375 5 C 8.855469 7.230469 7.738281 10.058594 7.28125 11.6875 C 7.058594 12.476563 7.273438 13.320313 7.8125 13.9375 L 10.3125 16.8125 L 12 22 L 14 22 L 12.0625 16.03125 L 10.59375 12.875 C 10.59375 12.875 10.753906 10.90625 12.25 9.28125 L 15.71875 13.75 L 17.3125 12.90625 Z M 17.375 14 L 16.34375 14.5625 L 17.8125 22 L 19 22 Z M 8.0625 15.84375 L 6 22 L 8 22 L 9.46875 17.40625 Z"/>
    </SvgIcon>
)

function DetailedPlayStyleValidity({ validFormats, cards }) {
    const classes = useStyles();
    const allCards = cards.map(cid => ({ ...cardsDb[cid], id: cid }))
    const onlyUniversals = allCards.filter(c => c.faction === 0);
    console.log(onlyUniversals);
    const cFC = onlyUniversals.filter(c => checkCardForsakenFor(c.id, 'championship')).length;
    console.log(cFC);
    const outOfSeason = onlyUniversals.filter(c => Number(c.id) < 3000 && !ignoreAsDublicate(c.name)).length;
    console.log(outOfSeason);
    const surges = allCards.filter(c => c.type === 0 && c.scoreType === 0).length;
    console.log(surges);

    return (
        <Grid className={classes.container} container spacing={3}>
            <Grid item xs={4} style={{ borderRight: '1px solid lightgray' }}>
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <ChampionshipFormatIcon className={classes.icon} style={{ color: validFormats.includes('championship') ? '#3B9979' : 'red' }} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Championship</Typography>
                    </Grid>
                </Grid>
                {
                    validFormats.includes('championship') && (
                        <Grid item>
                            <Typography style={{ color: 'green'}}>VALID</Typography>
                        </Grid>
                    )
                }
                {
                    !validFormats.includes('championship') && (
                        <Grid container>

                        </Grid>
                    )
                }
            </Grid>
            <Grid item xs={4}  style={{ borderRight: '1px solid lightgray' }}>
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <RelicIcon className={classes.icon} style={{ color: validFormats.includes('relic') ? '#3B9979' : 'red' }} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Relic</Typography>
                    </Grid>
                </Grid>
                {
                    validFormats.includes('relic') && (
                        <Grid item>
                            <Typography style={{ color: 'green'}}>VALID</Typography>
                        </Grid>
                    )
                }
            </Grid>
            <Grid item xs={4} container direction="column">
                <Grid item container alignItems="center">
                    <Grid item xs={2}>
                        <OpenFormatIcon className={classes.icon} style={{ color: validFormats.includes('open') ? '#3B9979' : 'red' }} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Open</Typography>
                    </Grid>
                </Grid>
                {
                    validFormats.includes('open') && (
                        <Grid item>
                            <Typography style={{ color: 'green'}}>VALID</Typography>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default DetailedPlayStyleValidity;