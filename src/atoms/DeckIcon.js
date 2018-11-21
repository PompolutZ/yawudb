import React from 'react';

const DeckIcon = ({ width, height, faction}) => (
    <img id="factionDeckIcon" 
    style={{width: width, height: height, margin: '0 .3rem 0 0', flex: '0 0 auto'}} 
    alt={`${faction}`} 
    src={`/assets/icons/${faction}-deck.png`} />
);

export default DeckIcon;