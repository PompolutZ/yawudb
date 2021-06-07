import React, { useEffect } from "react";
import { idPrefixToFaction } from "../data/index";
import { Link } from "react-router-dom";
import useDexie from "../hooks/useDexie";
import { getFactionByAbbr } from "../data/wudb";

function DeckIconPicture({ faction, ...props }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${faction}-deck.webp`}
            />
            <img
                src={`/assets/icons/${faction}-deck-64.png`}
                className={props.className}
                style={{
                    top: "-10%",
                    left: "-10%",
                    filter: "drop-shadow(0px 0px 4px black)",
                }}
            />
        </picture>
    );
}

const DecksCount = ({ count, ...props }) => (
    <span className={props.className}>{count}</span>
);

function DeckMetaSummary({
    prefix,
}) {
    const [count, setCount] = React.useState(0);
    const db = useDexie("wudb");

    useEffect(() => {
        const faction = getFactionByAbbr(prefix);
        db.publicDecks.where("faction").equalsIgnoreCase(faction.name).toArray().then(r => {
            setCount(r.length);
        }).catch(error => console.error(error));
    }, [db, prefix])

    return (
        <div className="flex justify-center items-center p-6 group">
            <Link
                className="relative text-center bg-accent3-700 rounded w-full h-32 lg:w-32 text-6xl flex justify-end items-end p-2 transition-transform duration-200 transform group-hover:scale-105"
                to={`/decks/${prefix}`}
            >
                <DeckIconPicture
                    className={`transform group-hover:scale-110 transition-transform duration-500 ease-out ${
                        count > 0 ? "w-24 h-24 absolute inset-0" : "w-24 h-24 top-1/2 left-1/2 absolute"
                    }`}
                    faction={idPrefixToFaction[prefix]}
                />

                {count > 0 && (
                    <DecksCount
                        className="text-white text-2xl font-bold"
                        count={count}
                    />
                )}
            </Link>
        </div>
    );
}

export default DeckMetaSummary;
