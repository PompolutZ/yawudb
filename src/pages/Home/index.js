import React from "react";
import {
    warbandsWithDefaultSet,
    factionIdPrefix,
    factionIndexes,
} from "../../data";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addOrUpdateLastDeck } from "../../reducers/lastDeck";
import { SET_DECKS_META } from "../../reducers/decksMeta";
import { SET_FACTION } from "../../reducers/deckUnderBuild";
import DeckMetaSummary from "../../molecules/DecksMetaSummary";
import { withFirebase } from "../../firebase";
import AutosuggestSearch from "../../components/AutosuggestSearch";
import Footer from "../../components/Footer";


const Home = (props) => {
    const { classes } = props;

    const handleGlobalSearchClick = (payload) => {
        props.history.push(`/view/card/${payload.id}`);
    };

    const handleAddDeckClicked = (faction) => {
        const defaultSet = warbandsWithDefaultSet.reduce(
            (acc, [f, defaultSet]) => {
                if (f === faction) {
                    return defaultSet;
                }
                return acc;
            },
            -1
        );

        props.setFactionForNewDeck(faction, defaultSet);
        handleNavigateToDeckCreate();
    };

    const handleNavigateToDeckCreate = () => {
        props.history.push("/deck/create");
    };

    const handleNavigateToDecksByPrefix = (prefix) => {
        props.history.push(`/decks/${prefix}`);
    };

    return (
        <div className="flex flex-col mx-2 sm:mx-4 relative">
            <div
                style={{
                    backgroundImage:
                        'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("/assets/direchasm_bg.jpg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    height: "50%",
                    width: "100vw",
                    margin:
                        window.innerWidth > 640
                            ? "-75px 0 0 -1rem"
                            : "-75px 0 0 -.5rem",
                    zIndex: -1,
                }}
            ></div>

            <h1 className="block text-2xl my-12 text-center text-white font-semibold z-10">
                Deck building website for Warhammer Underworlds.
            </h1>

            <div className="mb-12 flex justify-center">
                <div className="flex-1 sm:flex-1/2 lg:flex-1/3">
                    <AutosuggestSearch onClick={handleGlobalSearchClick} />
                </div>
            </div>

            <div className={classes.metaSummary}>
                {[
                    ...factionIndexes.slice(27),
                    ...factionIndexes.slice(19, 27),
                    ...factionIndexes.slice(9, 17),
                    ...factionIndexes.slice(1, 9),
                    ...factionIndexes.slice(17, 19),
                ].map((faction) => (
                    <DeckMetaSummary
                        key={factionIdPrefix[faction]}
                        prefix={factionIdPrefix[faction]}
                        onAddNewDeckClick={handleAddDeckClicked}
                        onDecksCountClick={handleNavigateToDecksByPrefix}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        lastDeck: state.lastDeck,
        userInfo: state.auth,
        decksMeta: state.decksMeta,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOrUpdate: (id, timestamp, data) =>
            dispatch(addOrUpdateLastDeck(id, timestamp, data)),
        addDecksMeta: (key, value) =>
            dispatch({
                type: SET_DECKS_META,
                payload: { key: key, value: value },
            }),
        setFactionForNewDeck: (faction, defaultSet) =>
            dispatch({
                type: SET_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
    };
};

const styles = (theme) => ({
    root: {
        margin: "0 auto",
        flex: "0 1 75%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

    columnOne: {
        flex: "1 100%",
        [theme.breakpoints.up("md")]: {
            flex: "1 50%",
            order: 1,
        },
    },

    columnTwo: {
        flex: "1 100%",
        [theme.breakpoints.up("md")]: {
            flex: "1 30%",
            order: 0,
        },
    },

    item: {
        fontFamily: "roboto",
        fontSize: "1rem",
        color: "white",
        marginLeft: "1rem",
    },

    changeLogItem: {
        fontFamily: "roboto",
        fontSize: ".7rem",
        color: "white",
        display: "flex",
        flexFlow: "column wrap",
        marginLeft: "1rem",
        alignItems: "flex-start",
        marginBottom: ".5rem",
    },

    entry: {
        fontFamily: "roboto",
    },

    metaSummary: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        alignContent: "space-around",
        justifyContent: "center",
        minWidth: "375px",
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(Home))));
