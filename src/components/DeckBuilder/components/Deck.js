import React, { PureComponent, useEffect, useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { cardsDb, factionIdPrefix, wufactions } from "../../../data/index";
import { Set } from "immutable";
// import { toggleCardInDeck } from './DeckBuiilder/components/CardsLibrary';
import DeckIcon from "../../../atoms/DeckIcon";
import WUButton from "../../../atoms/Button";
import WUTextField from "../../../atoms/WUTextField";
import ScoringOverview from "../../../atoms/ScoringOverview";
import { connect } from "react-redux";
import SectionHeader from "./SectionHeader";
import { CardsList } from "./CardsList";
import Grid from "@material-ui/core/Grid";
import DebouncedInput from '../../../v2/components/DebouncedInput';
import { checkCardIsObjective, checkCardIsPloy, checkCardIsUpgrade, getCardById, compareObjectivesByScoreType } from "../../../data/wudb";
import { useDeckBuilderState } from "../../../pages/DeckCreator";

function Deck(props) {
    const [name, setName] = useState("");
    const { faction, selectedObjectives, selectedGambits, selectedUpgrades } = useDeckBuilderState();

    useEffect(() => {
        console.log(`%c FilterableCardLibrary will run useEffect because of new STATE`, 'color: #10B981');

    }, [faction, selectedObjectives, selectedGambits, selectedUpgrades])

    const {
        onSave,
        onRemoveAll,
        onCancel,
        onUpdate,
        editMode,
        deckPlayFormat,
    } = props;
    
    const objectivesCount = selectedObjectives.length || 0;
    const gambitsCount = selectedGambits.length || 0;
    const upgradesCount = selectedUpgrades.length || 0;

    const cards = new Set(
        props.selectedCards.map((id) => {
            const universalRank =
                props.cardsRanking &&
                props.cardsRanking["u"] &&
                props.cardsRanking["u"][id]
                    ? props.cardsRanking["u"][id]
                    : 0;
            const rank =
                props.cardsRanking &&
                props.cardsRanking[faction?.abbr] &&
                props.cardsRanking[faction?.abbr][id]
                    ? props.cardsRanking[faction?.abbr][id] * 10000
                    : universalRank;

            return { id: id, ...getCardById(id), ranking: rank };
        })
    );

    const objectives = cards
        .filter((v) => checkCardIsObjective(v))
        .sort((c1, c2) => {
            return compareObjectivesByScoreType(c1.scoreType, c2.scoreType) || c1.id - c2.id;
        })
        .toJS(); 
    console.log(objectives);
    const gambits = cards
        .filter((v) => checkCardIsPloy(v))
        .sort((c1, c2) => c1.id - c2.id)
        .toJS();
    const upgrades = cards
        .filter((v) => checkCardIsUpgrade(v))
        .sort((c1, c2) => c1.id - c2.id)
        .toJS();
    
    const objectiveSummary = objectives.reduce(
            (acc, c) => {
                acc[c.scoreType] += 1;
                return acc;
            },
            {'Surge': 0, 'End': 0, 'Third': 0}
        );
    const isValidForSave =
        deckPlayFormat === "open"
            ? objectivesCount === 12 && gambitsCount + upgradesCount >= 20
            : objectivesCount === 12 &&
              gambitsCount + upgradesCount >= 20 &&
              objectiveSummary.Surge < 7;
    const isObjectiveCardsSectionValid =
        deckPlayFormat === "open"
            ? objectivesCount === 12
            : objectivesCount === 12 && objectiveSummary.Surge < 7;
    const isPowerCardsSectionValid =
        gambitsCount + upgradesCount >= 20 && gambitsCount <= upgradesCount;


    const totalGlory = objectives.reduce(
        (acc, c) => acc + Number(c.glory),
        0
    );
    return (
        <div>
            <div className="flex items-center m-2">
                <DeckIcon faction={faction?.name} width="3rem" height="3rem" />
                <DebouncedInput
                        onChange={setName}
                        wait={2000}
                        placeholder={`${
                            faction?.displayName
                        } Deck`}
                        className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-accent3-500"
                    />
            </div>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    lg={4}
                    className={`${isObjectiveCardsSectionValid ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    <SectionHeader>
                        <div className="flex">
                            <h1 className="mr-4">
                                {objectivesCount} Objectives
                            </h1>
                            <ScoringOverview
                                summary={objectiveSummary}
                                glory={totalGlory}
                            />
                        </div>
                        {!isObjectiveCardsSectionValid && (
                            <div>
                                <Typography style={{ color: "darkred" }}>
                                    - You must have exactly 12 objective
                                    cards.
                                </Typography>
                                <Typography style={{ color: "darkred" }}>
                                    {deckPlayFormat !== "open" &&
                                    objectiveSummary.Surge > 6
                                        ? "- You cannot have more than 6 Surge (score immediately) cards"
                                        : ""}
                                </Typography>
                            </div>
                        )}
                    </SectionHeader>
                    <CardsList
                        editMode={editMode}
                        isEligibleForOP={props.isEligibleForOP}
                        list={objectives}
                        // toggle={this._toggleCardInDeck}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={4}
                    className={`${isPowerCardsSectionValid ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    <SectionHeader>
                        <div>
                            <div>{gambitsCount} Gambits</div>
                            {gambitsCount + upgradesCount < 20 && (
                                <Typography style={{ color: "darkred" }}>
                                    - You must have at least 20 power cards.
                                    Power cards are ploys, gambit spells and
                                    upgrades.
                                </Typography>
                            )}
                            {gambitsCount > upgradesCount && (
                                <Typography style={{ color: "darkred" }}>
                                    - You cannot have more gambit cards than
                                    upgrade cards.
                                </Typography>
                            )}
                        </div>
                    </SectionHeader>
                    <CardsList
                        editMode={editMode}
                        isEligibleForOP={props.isEligibleForOP}
                        list={gambits}
                        // toggle={this._toggleCardInDeck}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={4}
                    className={`${isPowerCardsSectionValid ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    <SectionHeader>
                        <div>
                            <div>{upgradesCount} Upgrades</div>
                            {gambitsCount + upgradesCount < 20 && (
                                <Typography style={{ color: "darkred" }}>
                                    - You must have at least 20 power cards.
                                    Power cards are ploys, spells and
                                    upgrades.
                                </Typography>
                            )}
                        </div>
                    </SectionHeader>
                    <CardsList
                        editMode={editMode}
                        isEligibleForOP={props.isEligibleForOP}
                        list={upgrades}
                        // toggle={this._toggleCardInDeck}
                    />
                </Grid>
            </Grid>

            {!props.editMode && (
                <div style={{ display: "flex", paddingBottom: "10rem" }}>
                    <WUButton
                        style={{ margin: "auto", color: "red" }}
                        onClick={onRemoveAll}
                    >
                        Remove all
                    </WUButton>
                    {props.isAuth && (
                        <WUButton
                            style={{ margin: "auto" }}
                            onClick={onSave}
                            args={{ isDraft: !isValidForSave }}
                        >
                            {isValidForSave ? "Save" : "Save Draft"}
                        </WUButton>
                    )}
                    {!props.isAuth && (
                        <WUButton
                            style={{ margin: "auto" }}
                            disabled={!isValidForSave}
                            onClick={onSave}
                            args={{ isDraft: !isValidForSave }}
                        >
                            Save
                        </WUButton>
                    )}
                </div>
            )}
            {props.editMode && (
                <div style={{ display: "flex", paddingBottom: "10rem" }}>
                    <WUButton
                        style={{ margin: "auto", color: "red" }}
                        onClick={onCancel}
                    >
                        Cancel
                    </WUButton>
                    <WUButton
                        style={{ margin: "auto" }}
                        onClick={onUpdate}
                        args={{ isDraft: !isValidForSave }}
                    >
                        {isValidForSave ? "Update" : "Update Draft"}
                    </WUButton>
                </div>
            )}
        </div>
    );
}

// class Deck extends PureComponent {
//     state = {
//         name: props.currentName,
//         source: props.currentSource,
//         desc: props.currentDescription,
//     };

//     handleChangeName = (e) => {
//         this.setState({ name: e.target.value });

//         if (this.changeNameTimeout) {
//             clearTimeout(this.changeDescTimeout);
//         }

//         this.changeNameTimeout = setTimeout(
//             () => props.changeName(this.state.name),
//             250
//         );
//     };

//     handleChangeSource = (e) => {
//         props.changeSource(e.target.value);
//         this.setState({ source: e.target.value });
//     };

//     handleChangeDescription = (e) => {
//         this.setState({ desc: e.target.value });

//         if (this.changeDescTimeout) {
//             clearTimeout(this.changeDescTimeout);
//         }

//         this.changeDescTimeout = setTimeout(
//             () => props.changeDescription(this.state.desc),
//             250
//         );
//     };

//     render() {
//     }
// }

const mapStateToProps = (state) => {
    return {
        cardsRanking: state.cardLibraryFilters.cardsRanking,

        isEligibleForOP: state.cardLibraryFilters.eligibleForOP,
        deckPlayFormat: state.cardLibraryFilters.deckPlayFormat,
        restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,
        objectivesCount: state.deckUnderBuild.objectivesCount,
        gambitsCount: state.deckUnderBuild.gambitsCount,
        upgradesCount: state.deckUnderBuild.upgradesCount,

        editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
        editObjectivesCount: state.deckUnderEdit.objectivesCount,
        editGambitsCount: state.deckUnderEdit.gambitsCount,
        editUpgradesCount: state.deckUnderEdit.upgradesCount,
    };
};

export default connect(mapStateToProps, null)(Deck);
