import React from "react";
import { grouppedFactions, sortedFactions } from "../../data/wudb";
import { useMultiSelectArray } from "../../hooks/useMultiSelectArray";
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