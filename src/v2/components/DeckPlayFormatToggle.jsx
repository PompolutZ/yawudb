import React, { useState } from "react";
import { ReactComponent as ChampionshipLogo } from "../../svgs/championship_logo.svg";
import { ReactComponent as VanguardLogo } from "../../svgs/vanguard_logo.svg";
import { ReactComponent as RelicLogo } from "../../svgs/relic_logo.svg";
import {
    CHAMPIONSHIP_FORMAT,
    RELIC_FORMAT,
    VANGUARD_FORMAT,
} from "../../data/wudb";

const IconWithLabel = ({ children }) => {
    return <div className="flex space-x-2">{children}</div>;
};

const formats = [
    {
        name: VANGUARD_FORMAT,
        Content: (
            <IconWithLabel>
                <VanguardLogo className={`text-2xl fill-current`} />
                {VANGUARD_FORMAT}
            </IconWithLabel>
        ),
        onClick: (callback) => callback(VANGUARD_FORMAT),
    },
    {
        name: CHAMPIONSHIP_FORMAT,
        Content: (
            <IconWithLabel>
                <ChampionshipLogo className={`text-2xl fill-current`} />
                {CHAMPIONSHIP_FORMAT}
            </IconWithLabel>
        ),
        onClick: (callback) => callback(CHAMPIONSHIP_FORMAT),
    },
    {
        name: RELIC_FORMAT,
        Content: (
            <IconWithLabel>
                <RelicLogo className={`text-2xl fill-current`} />
                {RELIC_FORMAT}
            </IconWithLabel>
        ),
        onClick: (callback) => callback(RELIC_FORMAT),
    },
];

const DeckPlayFormatToggle = ({ selectedFormat, onFormatChange }) => {
    return (
        <ButtonGroup
            items={formats}
            preselect={formats.findIndex(
                (item) => item.name === selectedFormat
            )}
            onSelectionChange={onFormatChange}
        ></ButtonGroup>
    );
};

const ButtonGroup = ({ items = [], preselect = 0, onSelectionChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(preselect);

    const handleSelection = (event, index) => {
        setSelectedIndex(index);
        onSelectionChange(event);
    };

    return (
        <div className="">
            {items.map((item, i) => (
                <button
                    key={item.name}
                    onClick={() => handleSelection(item.name, i)}
                    className={`px-3 py-2 capitalize border border-purple-700 ${
                        selectedIndex === i
                            ? "bg-white text-purple-700"
                            : "bg-purple-700 shadow-md text-white"
                    } ${
                        i === 0
                            ? "first:rounded-l-md"
                            : i === items.length - 1
                            ? "last:rounded-r-md"
                            : ""
                    }`}
                >
                    {item.Content}
                </button>
            ))}
        </div>
    );
};

export { DeckPlayFormatToggle };
