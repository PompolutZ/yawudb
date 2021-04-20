import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDeckBuilderDispatcher } from ".";
import {
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    getCardById,
    getFactionById,
} from "../../data/wudb";
import { INITIAL_STATE } from "./reducer";
import DeckCreatorBase from "./DeckCreatorBase";

const decodeUDS = (card) => {
    return String(Number(card) + 1000).padStart(5, "0");
};

const udbPrefixesMap = {
    L: 2000,
    N: 3000,
    P: 4000,
    D: 5000,
    B: 6000,
    G: 7000,
    A: 8000,
    DC: 9000,
    S: 10000,
    E: 11000,
};

const decodeUDB = (card) => {
    let [, prefix, number] = card.match(/([A-Z]*)(\d+)/);

    return prefix
        ? String(udbPrefixesMap[prefix] + Number(number)).padStart(5, "0")
        : String(1000 + Number(number)).padStart(5, "0");
};

const getDecodingFunction = (encoding) => {
    return encoding === "udb" ? decodeUDB : decodeUDS;
};

function DeckCreatorTransfer(props) {
    const dispatch = useDeckBuilderDispatcher();
    const { data } = useParams();

    useEffect(() => {
        const [transferFormat, ...cardIds] = data.split(",");
        const decode = getDecodingFunction(transferFormat);
        const decodedCards = cardIds.map((foreignId) => {
            const wuid = decode(foreignId);
            let card = getCardById(wuid);
            if (card.duplicates) {
                const newest = Math.max(...card.duplicates);
                card = getCardById(newest);
            }

            return card;
        });

        const [{ factionId }] = decodedCards.filter(
            (card) => card.factionId > 1
        );
        const faction = getFactionById(factionId);

        const deckState = {
            ...INITIAL_STATE,
            faction,
            selectedObjectives: decodedCards.filter(checkCardIsObjective),
            selectedGambits: decodedCards.filter(checkCardIsPloy),
            selectedUpgrades: decodedCards.filter(checkCardIsUpgrade),
        };

        // THIS IS INSANELY SHITTY; BUT I AM TIRED
        localStorage.removeItem("wunderworlds_deck_in_progress");
        dispatch({
            type: "SET_DESERIALIZED_STATE",
            payload: deckState,
        });
        dispatch({
            type: "UPDATE_FILTERS",
            payload: {
                faction,
            },
        });
    }, [data]);

    return <DeckCreatorBase {...props} />;
}

export default DeckCreatorTransfer;
