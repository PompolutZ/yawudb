import React from 'react';
import SetsList from './SetsList';
import ScoringOverview from './ScoringOverview';
import RestrictedBannedCardsCount from './RestrictedBannedCardsCount';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const DeckThumbnailHeader = ({ classes, title, author, date, sets, scoringOverview, banned, restricted, isDraft }) => (
    <div className={classes.root}>
        <Typography variant="subtitle2" noWrap style={{maxWidth: '18rem' }}>{title}</Typography>
        {/* <div style={{ fontSize: '.8rem', fontWeight: '500', cursor: 'pointer' }}></div> */}
        <div style={{ marginBottom: '.2rem'}}>
        {
            !date && (
                <div style={{ fontSize: '.6rem', color: 'gray', fontWeight: '300' }}>{author}</div>
            ) 
        }
        {
            date && (
                <div style={{ fontSize: '.6rem', color: 'gray' }}>{author} | {new Date(date).toLocaleDateString()}</div>
            )
        }
        {
            isDraft && (
                <div style={{ fontStyle: 'italic', color: 'darkorange' }}>Draft</div>
            )
        }
        </div>
        <SetsList sets={sets} />
        <ScoringOverview summary={scoringOverview.summary} glory={scoringOverview.glory} />
    </div>
);

const styles = theme => ({
    root: {
        fontFamily: `'Roboto', sans-serif`,
    },
})

export default withStyles(styles)(DeckThumbnailHeader);
