import React, { PureComponent } from 'react';
import DeckIcon from '../../../atoms/DeckIcon';
import DeckThumbnailHeader from './DeckThumbnailHeader';
import { idPrefixToFaction } from '../../../data';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex', 
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        }
    }
});

class DeckThumbnail extends PureComponent {
    render() {
        const { classes, factionId, title, author, date, sets, objectives, banned, restricted } = this.props;
        const scoringOverview = objectives.reduce((acc, o) => {
            acc.summary[o.scoreType] += 1;
            acc.glory += o.glory;
            return acc;
        }, {
            glory: 0,
            summary: [0, 0, 0, 0]
        });

        return (
            <div className={classes.root} onClick={this.props.onClick}>
                <DeckIcon width="3rem" height="3rem" faction={idPrefixToFaction[factionId.split('-')[0]]} />
                <DeckThumbnailHeader 
                    title={title} 
                    author={author} 
                    date={date} 
                    sets={sets} 
                    scoringOverview={scoringOverview}
                    banned={banned}
                    restricted={restricted} />
            </div>
        );
    }
}

export default withStyles(styles)(DeckThumbnail);