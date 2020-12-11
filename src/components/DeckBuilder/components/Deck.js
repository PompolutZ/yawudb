import React from "react";
import DeckIcon from "../../../atoms/DeckIcon";
import DebouncedInput from "../../../v2/components/DebouncedInput";
import ObjectivesList from "./ObjectivesList";
import GambitsList from "./GambitsList";
import UpgradesList from "./UpgradesList";
import { ReactComponent as SaveIcon } from "../../../svgs/save.svg";
import { ReactComponent as TrashIcon } from "../../../svgs/trash.svg";
import {
    validateObjectivesListForPlayFormat,
    validatePowerDeckForFormat,
} from "../../../data/wudb";
import PropTypes from "prop-types";

function Deck({
    faction,
    selectedObjectives,
    selectedGambits,
    selectedUpgrades,
    format,
    onDeckNameChange,
    onSave,
    onReset,
}) {
    const [isObjectivesValid] = validateObjectivesListForPlayFormat(
        selectedObjectives,
        format
    );
    const [isPowerDeckValid] = validatePowerDeckForFormat(
        selectedGambits,
        selectedUpgrades,
        format
    );

    return (
        <div>
            <div className="flex items-center">
                <div className="flex flex-1 items-center m-2">
                    <DeckIcon
                        faction={faction.name}
                        width="3rem"
                        height="3rem"
                    />
                    <DebouncedInput
                        onChange={onDeckNameChange}
                        placeholder={`${faction.displayName} Deck`}
                        className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-purple-700"
                    />
                </div>
                <div className="ml-auto mr-4 grid gap-2 grid-cols-2">
                    <button className="btn btn-purple" onClick={onSave}>
                        <SaveIcon />
                        {/* disabled={!isObjectivesValid || !isPowerDeckValid } */}
                    </button>
                    <button className="btn btn-red" onClick={onReset}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-2">
                <ObjectivesList />
                <GambitsList />
                <UpgradesList />
            </div>
        </div>
    );
}

Deck.propTypes = {
    faction: PropTypes.object,
    selectedObjectives: PropTypes.array,
    selectedGambits: PropTypes.array,
    selectedUpgrades: PropTypes.array,
    format: PropTypes.string,
    onDeckNameChange: PropTypes.func,
    onSave: PropTypes.func,
    onReset: PropTypes.func,
};

export default Deck;
