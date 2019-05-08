import React from 'react';
import ToggleImageButton from './ToggleImageButton';
import { cardType } from '../data/index';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { SET_VISIBLE_CARD_TYPES } from '../reducers/cardLibraryFilters';
import { Set } from 'immutable';

function CardTypeToggle({ types, onTypesChanged }) {
    const visibleCardTypes = new Set(types);

    const toggleTypeAtIndex = index => () => {
        if(visibleCardTypes.includes(index)) {
            onTypesChanged(visibleCardTypes.delete(index).toJS())
        } else {
            onTypesChanged(visibleCardTypes.add(index).toJS())
        }
    }

    const renderIndex = (name, index) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
            <ToggleImageButton 
                isOff={!visibleCardTypes.includes(index)} 
                onImage={`/assets/icons/${name.toLowerCase()}-icon.png`}
                offImage={`/assets/icons/${name.toLowerCase()}-icon-bw.png`}
                onToggle={toggleTypeAtIndex(index)}
                />
            <Typography variant="title" style={{margin: '0 0 0 .5rem', opacity: !visibleCardTypes.includes(index) ? '.4' : 1}}>{name}</Typography>        
        </div>
    )

    return (
        <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
            { cardType.map((v, i) => renderIndex(v, i)) }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        types: state.cardLibraryFilters.visibleCardTypes,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTypesChanged: value => dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardTypeToggle);