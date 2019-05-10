import React, { useState } from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { cardsdb } from '../data/cardsdb'
import { cardTypeIcons, setsIndex } from '../data'
import toPairs from 'lodash/toPairs'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node)
                    inputRef(node)
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    )
}

const renderSuggestion = onMenuItemClick => (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)

    const handleMenuSuggestionClicked = () => {
        onMenuItemClick(suggestion);
    }

    return (
        <MenuItem
            selected={isHighlighted}
            component="div"
            onClick={handleMenuSuggestionClicked}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'relative', marginRight: '.5rem', width: '2rem', height: '1.5rem' }}>
                    <img src={`/assets/icons/${cardTypeIcons[suggestion.type]}.png`} style={{ width: '1.5rem', height: '1.5rem', position: 'absolute', top: 0, left: 0 }} />
                    <img src={`/assets/icons/${setsIndex[suggestion.set]}-icon.png`} style={{ width: '1.5rem', height: '1.5rem', position: 'absolute', top: 0, left: 12 }} />
                </div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    )
                )}
            </div>
        </MenuItem>
    )
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0
    const suggestions = toPairs(cardsdb).map(([id, card]) => ({
        id: id,
        label: card.name,
        type: card.type,
        set: card.set
    }));

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
              const keep =
                  count < 5 &&
                  suggestion.label.slice(0, inputLength).toLowerCase() ===
                      inputValue

              if (keep) {
                  count += 1
              }

              return keep
          })
}

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    container: {
        // backgroundColor: 'magenta',
        flexGrow: 1,
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
})

function AutosuggestSearch({ classes, onClick }) {
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [lastPickedSuggestion, setLastPickedSuggestion] = useState(null);

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    }

    const handleSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const handleChange = (event, { newValue }) => {
        setText(newValue)
    }

    const getCurrentSuggestion = suggestion => {
        setLastPickedSuggestion(suggestion);
        return suggestion.label;
    }

    const handleClick = () => {
        onClick(lastPickedSuggestion)
    }

    const autosuggestProps = {
        renderInputComponent,
        suggestions: suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue: getCurrentSuggestion,
        renderSuggestion: renderSuggestion(onClick),
    }

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder: 'Search for a card name',
                    value: text,
                    onChange: handleChange,
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
            <IconButton color="primary" onClick={handleClick}>
                <SearchIcon />
            </IconButton>
            {/* <div className={classes.divider} /> */}
        </div>
    )
}

export default withStyles(styles)(AutosuggestSearch)
