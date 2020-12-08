import React, { useState } from "react";
import DeckIcon from "../../../atoms/DeckIcon";
import WUButton from "../../../atoms/Button";
import { connect } from "react-redux";
import DebouncedInput from "../../../v2/components/DebouncedInput";
import { useDeckBuilderDispatcher, useDeckBuilderState } from "../../../pages/DeckCreator";
import ObjectivesList from "./ObjectivesList";
import GambitsList from "./GambitsList";
import UpgradesList from "./UpgradesList";
import { ReactComponent as SaveIcon } from '../../../svgs/save.svg';
import { ReactComponent as TrashIcon } from '../../../svgs/trash.svg';
import { OPEN_FORMAT, validateObjectivesListForPlayFormat, validatePowerDeckForFormat } from "../../../data/wudb";
import { RESET_DECK_ACTION } from "../../../pages/DeckCreator/reducer";

function Deck(props) {
    const [, setName] = useState("");
    const {
        faction,
        selectedObjectives,
        selectedGambits,
        selectedUpgrades,
        format,
    } = useDeckBuilderState();
    const dispatch = useDeckBuilderDispatcher();

    const handleResetCurrentDeck = () => {
        dispatch({
            type: RESET_DECK_ACTION
        })
    }

    const [isObjectivesValid] = validateObjectivesListForPlayFormat(selectedObjectives, format);
    const [isPowerDeckValid] = validatePowerDeckForFormat(selectedGambits, selectedUpgrades, format);
    console.log(isObjectivesValid, isPowerDeckValid);

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-1 items-center m-2">
                    <DeckIcon
                        faction={faction.name}
                        width="3rem"
                        height="3rem"
                    />
                    <DebouncedInput
                        onChange={setName}
                        wait={2000}
                        placeholder={`${faction.displayName} Deck`}
                        className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-accent3-500"
                    />
                </div>
                <div className="ml-auto mr-4 grid gap-2 grid-cols-2">
                    <button disabled={!isObjectivesValid || !isPowerDeckValid } className="btn btn-green"
                        onClick={() => console.log('Save')}>
                        <SaveIcon />
                    </button>
                    <button className="btn btn-red"
                        onClick={handleResetCurrentDeck}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-2">
                <ObjectivesList />
                <GambitsList />
                <UpgradesList />
            </div>

            {/* {!props.editMode && (
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
            )} */}
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
