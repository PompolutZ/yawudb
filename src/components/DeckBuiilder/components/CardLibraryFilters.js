import React, { Component } from 'react';
import DelayedSearch from '../../DelayedSearch';
import { IconButton, Typography } from '@material-ui/core';
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz';
import AnimateHeight from 'react-animate-height';
import ExpansionsToggle from '../../ExpansionsToggle';
import CardTypeToggle from '../../CardTypeToggle';
import { connect } from 'react-redux';
import { 
    CHANGE_SEARCH_TEXT,
    SET_CREATE_MODE_SETS,
    SET_EDIT_MODE_SETS,
    SET_VISIBLE_CARD_TYPES,
    SET_VISIBLE_OBJECTIVE_SCORE_TYPES,
    SET_ELIGIBLE_FOR_ORGANIZED_PLAY,
} from '../../../reducers/cardLibraryFilters';
import Switch from '../../../atoms/Switch';

class CardLibraryFilters extends Component {
    state = {
        areFiltersVisible: false,
    }

    toggleFiltersAreaVisibility = () => {
        this.setState(state => ({ areFiltersVisible: !state.areFiltersVisible }));
    }

    render() {
        const filtersAreaHeight = this.state.areFiltersVisible ? 'auto' : 0;
        const onSelectedSetsChange = this.props.editMode ? this.props.onEditModeSelectedSetsChange : this.props.onCreateModeSelectedSetsChange;
        const sets = this.props.editMode ? this.props.editModeSets : this.props.createModeSets;
        return (
            <div style={{flex: '1 1 auto'}}>
                <div style={{ 
                    paddingBottom: '1rem', 
                    margin: '1rem .5rem 0 .5rem', 
                    display: 'flex', 
                    alignItems: 'center'}}>
                    
                    <DelayedSearch defaultValue={this.props.searchText} onSearchInputChange={this.props.onSearchTextChange} />
                    <IconButton style={{color: 'white', backgroundColor: '#3B9979'}} onClick={this.toggleFiltersAreaVisibility}>
                        <MoreHorizontalIcon />
                    </IconButton>
                </div>
                <AnimateHeight 
                    duration={200}
                    easing="ease-out"
                    height={ filtersAreaHeight }
                    >
                    <div style={{paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                        <div style={{display: 'flex', position: 'relative', marginBottom: '.5rem'}}>
                            <div>Toggle Sets:</div>
                            <div style={{flex: '1 1 auto', height: '1rem', borderBottom: '1px solid gray', margin: 'auto 1rem 0 .5rem'}}></div> 
                        </div>
                        <ExpansionsToggle selectedSets={sets} onExpansionsChange={onSelectedSetsChange} />
                    </div>
                    <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                        <div style={{display: 'flex', position: 'relative', marginBottom: '.5rem'}}>
                            <div>Toggle Types:</div>
                            <div style={{flex: '1 1 auto', height: '1rem', borderBottom: '1px solid gray', margin: 'auto 1rem 0 .5rem'}}></div> 
                        </div>
                        <CardTypeToggle />
                    </div>
                    <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                        <Switch label="Organised Play" isChecked={this.props.eligibleForOP} onChange={this.handleChangeEligibleForOrganizedPlay} />
                        <Typography variant="subheading" style={{ fontSize: '.7rem', marginBottom: '.5rem'}}>
                            <i>Removes banned cards from the cards list.</i>
                        </Typography>
                    </div>
                </AnimateHeight>
            </div>
        );
    }

    handleChangeEligibleForOrganizedPlay = e => {
        this.props.onChangeEligibleForOrganizedPlay(e.target.checked);
    }
}

const mapStateToProps = state => {
    return state.cardLibraryFilters;
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchTextChange: value => dispatch({ type: CHANGE_SEARCH_TEXT, payload: value }),
        onCreateModeSelectedSetsChange: value => dispatch({ type: SET_CREATE_MODE_SETS, payload: value }),
        onEditModeSelectedSetsChange: value => dispatch({ type: SET_EDIT_MODE_SETS, payload: value }),
        onVisibleCardTypesChange: value => dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
        onVisibleObjectiveScoreTypesChange: value => dispatch({ type: SET_VISIBLE_OBJECTIVE_SCORE_TYPES, payload: value }),
        onChangeEligibleForOrganizedPlay: value => dispatch({ type: SET_ELIGIBLE_FOR_ORGANIZED_PLAY, payload: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLibraryFilters);
