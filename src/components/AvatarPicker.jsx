import React, { useEffect, useState } from "react";
import { wufactions } from "../data/wudb";

function FactionIcon({ faction, className }) {
    return (
        <img
            alt={faction}
            className={`w-8 h-8 ${className}`}
            src={`/assets/icons/${faction}-icon.png`}
        />
    );
}

function ToggleableFactionIcon({ faction, className, isOn, onSelect }) {
    return (
        <button
            className={`mx-4 my-2 cursor-pointer flex justify-center focus:outline-none w-8 h-8 transform transition-transform duration-300 filter ${
                isOn
                    ? "opacity-100 scale-125 drop-shadow-md"
                    : "opacity-75 scale-100 hover:scale-105 drop-shadow-sm"
            }`}
            onClick={() => onSelect(faction)}
        >
            <FactionIcon faction={faction} />
        </button>
    );
}

function AvatarPicker({ current, onSelectionChange }) {
    const factions = Object.values(wufactions)
        .filter((f) => f.id > 1)
        .sort((prev, next) => next.id - prev.id)
        .map((f) => f.name);
    const [selectedIcon, setSelectedIcon] = useState(
        current ? current : factions[factions.length]
    );

    useEffect(() => {
        setSelectedIcon(current);
    }, [current]);

    const selectIcon = faction => {
        setSelectedIcon(faction);
        onSelectionChange(faction);
    }

    return (
        <div className="grid grid-cols-5">
            {factions.map((faction) => (
                <ToggleableFactionIcon
                    key={faction}
                    faction={faction}
                    isOn={selectedIcon === faction}
                    onSelect={selectIcon}
                />
            ))}
        </div>
    );
}

export default AvatarPicker;
