import React, { useState } from "react";
import DeckIcon from "../../../atoms/DeckIcon";
import WUButton from "../../../atoms/Button";
import { connect } from "react-redux";
import DebouncedInput from '../../../v2/components/DebouncedInput';
import { useDeckBuilderState } from "../../../pages/DeckCreator";
import ObjectivesList from "./ObjectivesList";
import GambitsList from "./GambitsList";
import UpgradesList from "./UpgradesList";

function Deck(props) {
    const [, setName] = useState("");
    const { faction, selectedObjectives, selectedGambits, selectedUpgrades } = useDeckBuilderState();

    const {
        onSave,
        onRemoveAll,
        onCancel,
        onUpdate,
        deckPlayFormat,
    } = props;
    
    const objectivesCount = selectedObjectives.length || 0;
    const gambitsCount = selectedGambits.length || 0;
    const upgradesCount = selectedUpgrades.length || 0;

    const isValidForSave =
        deckPlayFormat === "open"
            ? objectivesCount === 12 && gambitsCount + upgradesCount >= 20
            : objectivesCount === 12 &&
              gambitsCount + upgradesCount >= 20;

    return (
        <div>
            <div className="flex items-center m-2">
                <DeckIcon faction={faction.name} width="3rem" height="3rem" />
                <DebouncedInput
                        onChange={setName}
                        wait={2000}
                        placeholder={`${
                            faction.displayName
                        } Deck`}
                        className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-accent3-500"
                    />
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-2">
                <ObjectivesList />
                <GambitsList />
                <UpgradesList />
            </div>

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
