import React, { useState } from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { cardsDb } from "../data";
import { cardTypeIcons, setsIndex } from "../data";
import toPairs from "lodash/toPairs";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import { getSetNameById, wucards } from "../data/wudb";

const styles = (theme) => ({
    container: {
        fontSize: "1.5rem",
        flexGrow: 1,
        position: "relative",
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: "block",
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
    divider: {
        height: theme.spacing(2),
    },

    textFieldRoot: {
        backgroundColor: "white",
        borderRadius: "8px",
    },
});

function AutosuggestSearch({ classes, onClick }) {
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [lastPickedSuggestion, setLastPickedSuggestion] = useState(null);

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (event, { newValue }) => {
        setText(newValue);
    };

    const getCurrentSuggestion = (suggestion) => {
        setLastPickedSuggestion(suggestion);
        return suggestion.label;
    };

    const handleClick = () => {
        onClick(lastPickedSuggestion);
    };

    const handleKeyPress = (event) => {
        if (event.key !== "Enter") return;
        onClick(lastPickedSuggestion);
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue: getCurrentSuggestion,
        renderSuggestion: renderSuggestion(onClick),
    };

    return (
        <>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder: "Search for a card name",
                    value: text,
                    onChange: handleChange,
                    onKeyPress: handleKeyPress,
                    variant: "outlined",
                    color: "primary",
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={(options) => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        </>
    );
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: (node) => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    root: classes.textFieldRoot,
                },
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon className="text-gray-500 fill-current" />
                    </InputAdornment>
                ),
            }}
            {...other}
            style={{ borderRadius: "1rem" }}
        />
    );
}

const renderSuggestion = (onMenuItemClick) => (
    suggestion,
    { query, isHighlighted }
) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    const handleMenuSuggestionClicked = () => {
        onMenuItemClick(suggestion);
    };

    return (
        <MenuItem
            selected={isHighlighted}
            component="div"
            onClick={handleMenuSuggestionClicked}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        position: "relative",
                        marginRight: ".5rem",
                        width: "2rem",
                        height: "1.5rem",
                    }}
                >
                    <img
                        src={`/assets/icons/${
                            cardTypeIcons[suggestion.type]
                        }.png`}
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                    <img
                        src={`/assets/icons/${
                            getSetNameById(suggestion.set)
                        }-icon.png`}
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            position: "absolute",
                            top: 0,
                            left: 12,
                        }}
                    />
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
    );
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestions = toPairs(wucards).map(([id, card]) => ({
        id: id,
        label: card.name,
        type: card.type,
        set: card.setId,
    }));

    return inputLength === 0
        ? []
        : suggestions.filter((suggestion) => {
              const keep =
                  count < 5 &&
                  suggestion.label.slice(0, inputLength).toLowerCase() ===
                      inputValue;

              if (keep) {
                  count += 1;
              }

              return keep;
          });
}

export default withStyles(styles)(AutosuggestSearch);
