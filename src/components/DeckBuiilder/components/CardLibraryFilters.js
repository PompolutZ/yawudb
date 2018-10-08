import React, { Component } from 'react';
import DelayedSearch from '../../DelayedSearch';
import { IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AnimateHeight from 'react-animate-height';
import ExpansionsToggle from '../../ExpansionsToggle';
import CardTypeToggle from '../../CardTypeToggle';
import { connect } from 'react-redux';
import { 
    CHANGE_SEARCH_TEXT,
    SET_SETS,
    SET_VISIBLE_CARD_TYPES,
    SET_VISIBLE_OBJECTIVE_SCORE_TYPES
} from '../../../reducers/cardLibraryFilters';

class CardLibraryFilters extends Component {
    state = {
        areFiltersVisible: false,
    }

    toggleFiltersAreaVisibility = () => {
        this.setState(state => ({ areFiltersVisible: !state.areFiltersVisible }));
    }

    render() {
        const filtersAreaHeight = this.state.areFiltersVisible ? 'auto' : 0;
        return (
            <div style={{flex: '1 1 auto'}}>
                <div style={{ 
                    paddingBottom: '1rem', 
                    margin: '1rem .5rem 0 .5rem', 
                    display: 'flex', 
                    alignItems: 'center'}}>
                    
                    <DelayedSearch defaultValue={this.props.searchText} onSearchInputChange={this.props.onSearchTextChange} />
                    <IconButton style={{color: 'white', backgroundColor: '#3B9979'}} onClick={this.toggleFiltersAreaVisibility}>
                        <FilterListIcon />
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
                        <ExpansionsToggle selectedSets={this.props.sets} onExpansionsChange={this.props.onSelectedSetsChange} />
                    </div>
                    <div style={{borderBottom: '1px solid gray', paddingBottom: '1rem', margin: '1rem .5rem 0 .5rem'}}>
                        <div style={{display: 'flex', position: 'relative', marginBottom: '.5rem'}}>
                            <div>Toggle Types:</div>
                            <div style={{flex: '1 1 auto', height: '1rem', borderBottom: '1px solid gray', margin: 'auto 1rem 0 .5rem'}}></div> 
                        </div>
                        <CardTypeToggle selectedCardTypes={this.props.visibleCardTypes} oncardTypesChange={this.props.onVisibleCardTypesChange} />
                    </div>
                </AnimateHeight>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.cardLibraryFilters;
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchTextChange: value => dispatch({ type: CHANGE_SEARCH_TEXT, payload: value }),
        onSelectedSetsChange: value => dispatch({ type: SET_SETS, payload: value }),
        onVisibleCardTypesChange: value => dispatch({ type: SET_VISIBLE_CARD_TYPES, payload: value }),
        onVisibleObjectiveScoreTypesChange: value => dispatch({ type: SET_VISIBLE_OBJECTIVE_SCORE_TYPES, payload: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLibraryFilters);
