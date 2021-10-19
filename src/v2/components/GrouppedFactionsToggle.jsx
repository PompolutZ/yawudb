import React, { useState } from "react";
import { wufactions } from "../../data/wudb";
import { useMultiSelectArray } from "../../hooks/useMultiSelectArray";
import { sortByIdAsc } from "../../utils/sort";
import IconButton from "./IconButton";
import SectionTitle from "./SectionTitle";

function FactionPicture({ faction, ...rest }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${faction}-icon.webp`}
            />
            <img
                src={`/assets/icons/${faction}-icon.png`}
                alt={`${faction}`}
                {...rest}
            />
        </picture>
    );
}

const sortedFactions = Object.values(wufactions).sort(sortByIdAsc);

const grouppedFactions = () => {
    return [
        {
            title: "Universal (Any warband)",
            factions: [wufactions["Universal"], wufactions["Order"], wufactions["Chaos"], wufactions["Death"], wufactions["Destruction"]],
        },
        {
            title: "Harrowdeep",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Xandire's Truthseekers"].id
            ),
        },
        {
            title: "Direchasm",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Myari's Purifiers"].id &&
                    f.id <= wufactions["Elathain's Soulraid"].id
            ),
        },
        {
            title: "Beastgrave",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Grashrak's Despoilers"].id &&
                    f.id <= wufactions["Morgok's Krushas"].id
            ),
        },
        {
            title: "Nightvault",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Stormsire's Cursebreakers"].id &&
                    f.id <= wufactions["Ylthari's Guardians"].id
            ),
        },
        {
            title: "Shadespire",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Garrek's Reavers"].id &&
                    f.id <= wufactions["The Farstriders"].id
            ),
        },
        {
            title: "Starting set",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Storm of Celestus"].id &&
                    f.id <= wufactions["Drepur's Wraithcreepers"].id
            ),
        },
        {
            title: "Dreadfane",
            factions: sortedFactions.filter(
                (f) =>
                    f.id >= wufactions["Ironsoul's Condemners"].id &&
                    f.id <= wufactions["Lady Harrow's Mournflight"].id
            ),
        },
    ];
};

const GrouppedFactionsToggle = ({ selectedFactions, onSelectionChanged, allowMultiSelect = true }) => {
    const { selected, onToggle } = useMultiSelectArray(
        selectedFactions,
        allowMultiSelect,
        sortedFactions.map(f => f.id),
        onSelectionChanged
    )
    const factionGroups = grouppedFactions();

    return (
        <section className="flex flex-col space-y-2 mx-4">
            <SectionTitle title="Factions" />

            {factionGroups.map(({ title, factions }) => (
                <article key={title}>
                    <h6 className="text-xs font-bold text-gray-500">{title}</h6>
                    <div className="m-2 flex flex-wrap content-start items-center">
                        {factions.map((faction) => (
                            <IconButton className="mb-2 mr-2" key={faction.id} onClick={onToggle(faction.id)}>
                                <FactionPicture
                                    faction={faction.name}
                                    className={`w-8 h-8 ${
                                        selected.includes(faction.id)
                                            ? "drop-shadow-md opacity-100"
                                            : "drop-shadow-sm opacity-50"
                                    }  hover:scale-105`}
                                />
                            </IconButton>
                        ))}
                    </div>
                </article>
            ))}
        </section>
    );
}

export { GrouppedFactionsToggle }