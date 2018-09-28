import React from 'react';
import ToggleImageButton from './ToggleImageButton';
import { factionIndexes } from '../data/index';
import * as _ from 'lodash';

const FactionToggle = ({ selectedFaction, setFaction }) => {
    const renderFactionToggleButton = faction => {
        return <ToggleImageButton key={faction}
                isOff={faction !== selectedFaction} 
                onImage={`/assets/icons/${faction}-icon.png`}
                offImage={`/assets/icons/${faction}-icon-bw.png`}
                onToggle={() => setFaction(faction)}
                />
    }     

    return (
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
            { factionIndexes.slice(1).map(faction => renderFactionToggleButton(faction)) }
        </div>
    );
}

export default FactionToggle;