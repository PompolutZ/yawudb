import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import ToggableExpansionIcon from "../atoms/ToggableExpansionIcon";
import { NEMESIS_FORMAT, setHasPlot } from "../data/wudb";
import Toggle from '../v2/components/HexToggle';
import { ReactComponent as CompassIcon } from "@icons/compass.svg";

function ExpansionsToggle({ expansions = [], selectedExpansions = [], onExpansionsChange, selectedFormat, singleSet }) {
    const [selectAllValidSets, setSelectAllValidSets] = useState(true);

    useEffect(() => {
        setSelectAllValidSets(expansions.length == selectedExpansions.length)
    }, [expansions.length, selectedExpansions.length]);

    const handleToggle = expansion => () => {
        if (singleSet) {
            setSelectAllValidSets(false);
            onExpansionsChange([expansion])
        } else {
            const next = selectedExpansions.includes(expansion)
                ? selectedExpansions.filter(e => e != expansion)
                : [...selectedExpansions, expansion];
    
            setSelectAllValidSets(next.length == selectedExpansions.length);
            onExpansionsChange(next);
        }
    }

    const toggleAllSelectedSets = () => {
        if (selectAllValidSets) {
            setSelectAllValidSets(false);
            onExpansionsChange([]);
        } else {
            setSelectAllValidSets(true);
            onExpansionsChange([...expansions]);
        }
    }

    return (
        <>
            {selectedFormat !== NEMESIS_FORMAT && (
                <div className="flex my-4">
                    <Toggle checked={selectAllValidSets} onChange={toggleAllSelectedSets} />
                    <p className="ml-2">
                        Use all sets valid for selected format.
                    </p>
                </div>
            )}
            <div className="flex flex-wrap space-x-1">
                {expansions.map(expansion => (
                    <div data-tip={expansion.displayName} className="relative">
                        <ToggableExpansionIcon
                            key={expansion.id}
                            set={expansion.name}
                            variant="large"
                            isEnabled={selectedExpansions.includes(expansion)}
                            onClick={handleToggle(expansion)}
                        />
                        {setHasPlot(expansion.id) && (
                            <div className="absolute w-4 h-4 bg-purple-700 -bottom-1 left-4 rounded-full text-white">
                                <CompassIcon className="stroke-current w-4 h-4" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <ReactTooltip effect="solid" />
        </>
    );
}

export default ExpansionsToggle;
