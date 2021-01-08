import React, { useEffect, useState } from "react";
import DeckIcon from "../../../../atoms/DeckIcon";
import DebouncedInput from "../../../../v2/components/DebouncedInput";
import ObjectivesList from "./ObjectivesList";
import GambitsList from "./GambitsList";
import UpgradesList from "./UpgradesList";
import { ReactComponent as SaveIcon } from "../../../../svgs/save.svg";
import { ReactComponent as CloseIcon } from "../../../../svgs/x.svg";
import {
    validateCardForPlayFormat,
    validateDeckForPlayFormat,
} from "../../../../data/wudb";
import uuid4 from "uuid";

function Deck({
    faction,
    selectedObjectives,
    selectedGambits,
    selectedUpgrades,
    format,
    deckName,
    onDeckNameChange,
    onSave,
    onReset,
}) {
    const [objectives, setObjectives] = useState(selectedObjectives);
    const [gambits, setGambits] = useState(selectedGambits);
    const [upgrades, setUpgrades] = useState(selectedUpgrades);
    const [isValid, setIsValid] = useState(false);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        // Cards ids is a mess
        setObjectives(selectedObjectives.map(c => {
            const [
                ,
                isForsaken,
                isRestricted,
            ] = validateCardForPlayFormat(c, format);
    
            const card = {
                oldId: `${c.id}`.padStart(5, "0"),
                ...c,
                isBanned: isForsaken,
                isRestricted,
            };

            return card;
        }))

    }, [selectedObjectives, format])
    
    useEffect(() => {
        // Cards ids is a mess
        setGambits(selectedGambits.map(c => {
            const [
                ,
                isForsaken,
                isRestricted,
            ] = validateCardForPlayFormat(c, format);
    
            const card = {
                oldId: `${c.id}`.padStart(5, "0"),
                ...c,
                isBanned: isForsaken,
                isRestricted,
            };

            return card;
        }))

    }, [selectedGambits, format])
    
    useEffect(() => {
        // Cards ids is a mess
        setUpgrades(selectedUpgrades.map(c => {
            const [
                ,
                isForsaken,
                isRestricted,
            ] = validateCardForPlayFormat(c, format);
    
            const card = {
                oldId: `${c.id}`.padStart(5, "0"),
                ...c,
                isBanned: isForsaken,
                isRestricted,
            };

            return card;
        }))

    }, [selectedUpgrades, format])

    useEffect(() => {
        const [isValid, issues] = validateDeckForPlayFormat({
            objectives,
            gambits,
            upgrades,
        }, format);
        console.log(isValid, issues);
        setIsValid(isValid);
        setIssues(issues);
    }, [objectives, gambits, upgrades, format]);

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
                        value={deckName}
                        onChange={onDeckNameChange}
                        placeholder={`${faction.displayName} Deck`}
                        className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-purple-700"
                    />
                </div>
                <div className="ml-auto mr-4 grid gap-2 grid-cols-2">
                    <button
                        disabled={!isValid}
                        className="btn btn-purple"
                        onClick={onSave}
                    >
                        <SaveIcon />
                    </button>
                    <button className="btn btn-red" onClick={onReset}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <section className="my-4 text-accent3-700 text-sm">
                {!isValid && (
                    <ul>
                        {issues.map((issue) => (
                            <li key={uuid4()}>
                                {issue}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-2">
                <ObjectivesList
                    isValid={isValid}
                    format={format}
                    selectedObjectives={objectives}
                />
                <GambitsList
                    isValid={isValid}
                    format={format}
                    selectedGambits={gambits}
                />
                <UpgradesList
                    isValid={isValid}
                    format={format}
                    selectedUpgrades={upgrades}
                />
            </div>
        </div>
    );
}

export default Deck;
