import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { VIEW_DECK } from "../../constants/routes";
import {
    checkCardIsObjective,
    getCardById,
} from "../../data/wudb";
import ScoringOverview from "../../atoms/ScoringOverview";
import SetsList from "../../atoms/SetsList";
import { FactionDeckPicture } from "@components/FactionDeckPicture";
import { DeckPlayFormatsValidity } from "@components/DeckPlayFormatsValidity";

export default function PublicDeckLink({ ...props }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cards = props.cards.map((x) => getCardById(x));
        setCards(cards);
    }, [props.cards]);

    const totalGlory = useMemo(
        () =>
            cards
                .filter(checkCardIsObjective)
                .reduce((total, { glory }) => (total += glory), 0),
        [cards]
    );

    const objectiveSummary = useMemo(
        () =>
            cards.filter(checkCardIsObjective).reduce(
                (acc, c) => {
                    acc[c.scoreType] += 1;
                    return acc;
                },
                { Surge: 0, End: 0, Third: 0 }
            ),
        [cards]
    );

    return (
        <div className="flex px-4 items-center border-t border-gray-500">
            <div className="flex flex-col items-center space-y-2">
                <FactionDeckPicture faction={props.faction} size="w-12 h-12" />
                <DeckPlayFormatsValidity cards={cards} /> 
            </div>
            <div className="flex-1 space-y-1 ml-8">
                <Link
                    className="text-xl hover:text-purple-700"
                    to={{
                        pathname: `${VIEW_DECK}/${props.deckId}`,
                        state: {
                            deck: {
                                ...props,
                                id: props.deckId
                            },
                            canUpdateOrDelete: false,
                        },
                    }}
                >
                    {props.name}
                </Link>
                <h3 className="text-sm text-gray-700">{new Date(props.updatedutc).toLocaleDateString()}</h3>
                <SetsList sets={props.sets} />
                <ScoringOverview
                    summary={objectiveSummary}
                    glory={totalGlory}
                />
            </div>
        </div>
    );
}