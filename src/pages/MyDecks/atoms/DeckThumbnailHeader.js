import React from 'react';
import SetsList from '../../../atoms/SetsList';
import ScoringOverview from '../../../atoms/ScoringOverview';
import RestrictedBannedCardsCount from '../../../atoms/RestrictedBannedCardsCount';

const DeckThumbnailHeader = ({ title, author, date, sets, scoringOverview, banned, restricted }) => (
    <div style={{ fontFamily: `'Roboto', sans-serif`}}>
        <div style={{ fontSize: '.8rem', fontWeight: '500' }}>{title}</div>
        {
            !date && (
                <div style={{ fontSize: '.8rem' }}>{author}</div>
            ) 
        }
        {
            date && (
                <div style={{ fontSize: '.6rem', color: 'gray' }}>{author} | {new Date(date).toLocaleDateString()}</div>
            )
        }

        <SetsList sets={sets} />
        <ScoringOverview summary={scoringOverview.summary} glory={scoringOverview.glory} />
        <RestrictedBannedCardsCount banned={banned} restricted={restricted} />
    </div>
);

export default DeckThumbnailHeader;
