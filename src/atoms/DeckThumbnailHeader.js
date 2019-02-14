import React from 'react';
import SetsList from './SetsList';
import ScoringOverview from './ScoringOverview';
import RestrictedBannedCardsCount from './RestrictedBannedCardsCount';

const DeckThumbnailHeader = ({ title, author, date, sets, scoringOverview, banned, restricted, isDraft }) => (
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
        {
            isDraft && (
                <div style={{ fontStyle: 'italic', color: 'darkorange' }}>Draft</div>
            )
        }
        <SetsList sets={sets} />
        <ScoringOverview summary={scoringOverview.summary} glory={scoringOverview.glory} />
        <RestrictedBannedCardsCount banned={banned} restricted={restricted} />
    </div>
);

export default DeckThumbnailHeader;
