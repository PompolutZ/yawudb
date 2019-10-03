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
    SET_DECK_PLAY_FORMAT,
} from '../../../reducers/cardLibraryFilters';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from '@material-ui/core/SvgIcon';
import OpenFormatIcon from '@material-ui/icons/Mood';
import ChampionshipFormatIcon from '@material-ui/icons/EmojiEvents';
import { deckPlayFormats } from '../../../data';

function DeckPlayFormatToggle({ selectedFormat, onFormatChange }) {

    return (
        <Grid container spacing={3} justify="center">
            <Grid item sm={12}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={onFormatChange('open')} variant={selectedFormat === 'open' ? 'contained' : 'outlined'}>
                        <OpenFormatIcon />
                    </Button>
                    <Button onClick={onFormatChange('championship')} variant={selectedFormat === 'championship' ? 'contained' : 'outlined'}>
                        <ChampionshipFormatIcon />
                    </Button>
                    <Button onClick={onFormatChange('relic')} variant={selectedFormat === 'relic' ? 'contained' : 'outlined'}>
                        <SvgIcon>
                            <path d="M 15 2 C 13.894531 2 13 2.894531 13 4 C 13 5.105469 13.894531 6 15 6 C 16.105469 6 17 5.105469 17 4 C 17 2.894531 16.105469 2 15 2 Z M 11.4375 5 C 8.855469 7.230469 7.738281 10.058594 7.28125 11.6875 C 7.058594 12.476563 7.273438 13.320313 7.8125 13.9375 L 10.3125 16.8125 L 12 22 L 14 22 L 12.0625 16.03125 L 10.59375 12.875 C 10.59375 12.875 10.753906 10.90625 12.25 9.28125 L 15.71875 13.75 L 17.3125 12.90625 Z M 17.375 14 L 16.34375 14.5625 L 17.8125 22 L 19 22 Z M 8.0625 15.84375 L 6 22 L 8 22 L 9.46875 17.40625 Z"/>
                        </SvgIcon>
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

function DeckPlayFormatInfo({ format }) {
    switch(format) {
        case 'open': 
            return <Typography variant="body2">Card library will be available in full, without any restrictions.</Typography>;
        case 'championship':
            return <Typography variant="body2">Library will be filtered to fullfil competitive play requirements: banned and rotated out cards will be excluded.</Typography>;
        case 'relic':
            return <Typography variant="body2">Library will be filtered to exlude banned cards only.</Typography>;
        default:
            return <Typography></Typography>;
    }
}

function CardLibraryFilters(props) {
    const onSelectedSetsChange = props.editMode ? props.onEditModeSelectedSetsChange : props.onCreateModeSelectedSetsChange;
    const sets = props.editMode ? props.editModeSets : props.createModeSets;

    const [filtersAreaHeight, setFiltersAreaHeight] = React.useState(0);
    const [format, setFormat] = React.useState(props.deckPlayFormat ? props.deckPlayFormat : deckPlayFormats[0])

    const toggleFiltersAreaVisibility = () => {
        setFiltersAreaHeight(prev => prev === 0 ? 'auto' : 0);
    }

    const handleChangeEligibleForOrganizedPlay = e => {
        props.onChangeEligibleForOrganizedPlay(e.target.checked);
    }

    const handleFormatChange = format => () => {
        setFormat(format);
        props.onChangeDeckPlayFormat(format);
        props.onChangeEligibleForOrganizedPlay(format === 'championship');
    }

    return (
        <div style={{flex: '1 1 auto'}}>
            <div style={{ 
                paddingBottom: '1rem', 
                margin: '1rem .5rem 0 .5rem', 
                display: 'flex', 
                alignItems: 'center'}}>
                
                <DelayedSearch defaultValue={props.searchText} onSearchInputChange={props.onSearchTextChange} />
                <IconButton style={{color: 'white', backgroundColor: '#3B9979'}} onClick={toggleFiltersAreaVisibility}>
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
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography>Selected build format:</Typography>                            
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">{format.toUpperCase()}</Typography>
                        </Grid>
                    </Grid>

                    <DeckPlayFormatToggle selectedFormat={format} onFormatChange={handleFormatChange} />
                    <DeckPlayFormatInfo format={format} />
                    {/* <Switch label="Organised Play" isChecked={this.props.eligibleForOP} onChange={this.handleChangeEligibleForOrganizedPlay} />
                    <Typography variant="subtitle1" style={{ fontSize: '.7rem', marginBottom: '.5rem'}}>
                        <i>Removes banned cards from the cards list. Removes Season 1 Universal cards.</i>
                    </Typography> */}
                </div>
            </AnimateHeight>
        </div>
    );
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
        onChangeDeckPlayFormat: value => dispatch({ type: SET_DECK_PLAY_FORMAT, payload: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLibraryFilters);
