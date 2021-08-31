import React from "react";
import { wufactions } from "../../data/wudb";
import { sortByIdAsc } from "../../utils/sort";
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

function FactionToggleButton({ children, className }) {
    return <button className={className}>{children}</button>;
}


const grouppedFactions = () => {
    const sortedFactions = Object.values(wufactions).sort(sortByIdAsc);
    return [
        {
            title: "Universal (Any warband)",
            factions: [wufactions["Universal"]],
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

const GrouppedFactionsToggle = ({ selectedFactions }) => {
    const factionGroups = grouppedFactions();
    return (
        <section className="flex flex-col space-y-2 mx-4">
            <SectionTitle title="Factions" />

            {factionGroups.map(({ title, factions }) => (
                <article key={title}>
                    <h6 className="text-xs font-bold text-gray-500">{title}</h6>
                    <div className="m-2 flex flex-wrap content-start items-center">
                        {factions.map((faction) => (
                            <FactionToggleButton className="mb-2 mr-2" key={faction.id}>
                                <FactionPicture
                                    faction={faction.name}
                                    className={`w-8 h-8 ${
                                        selectedFactions.includes(faction.id)
                                            ? "drop-shadow-md opacity-100"
                                            : "drop-shadow-md opacity-75"
                                    }  hover:scale-105`}
                                />
                            </FactionToggleButton>
                        ))}
                    </div>
                </article>
            ))}
        </section>
    );
}

export { GrouppedFactionsToggle }