import { useLocation, useParams } from "react-router-dom";
import {
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    checkWarbandSpecificCard,
    getCardById,
    getFactionById,
    getFactionByName,
    udbPrefexes
} from "../../data/wudb";
import { INITIAL_STATE } from "./reducer";

export function useStateCreator() {
    const { action, data } = useParams();
    const { state } = useLocation();

    switch (action) {
        case "create":
            return { action, state: null };
        case "edit":
            return {
                action,
                state: {
                    ...INITIAL_STATE,
                    faction: getFactionByName(state?.deck?.faction),
                    selectedObjectives: state?.deck?.objectives,
                    selectedGambits: state?.deck?.gambits,
                    selectedUpgrades: state?.deck?.upgrades,
                },
                previous: {
                    id: data,
                    name: state?.deck?.name,
                    private: state?.deck?.private,
                },
            };
        case "transfer": {
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
                checkWarbandSpecificCard
            );
            const faction = getFactionById(factionId);

            return {
                action,
                state: {
                    ...INITIAL_STATE,
                    faction,
                    selectedObjectives:
                        decodedCards.filter(checkCardIsObjective),
                    selectedGambits: decodedCards.filter(checkCardIsPloy),
                    selectedUpgrades: decodedCards.filter(checkCardIsUpgrade),
                },
            };
        }
    }
}

const decodeUDS = (card) => {
    const udsId = Number(card);
    if (udsId >= 9000 && udsId < 10000) {
        return String(Number(card) + 2000).padStart(5, "0");
    } else if (udsId >= 10000 && udsId < 11000) {
        return String(Number(card)).padStart(5, "0");
    }

    return String(Number(card) + 1000).padStart(5, "0");
};

const decodeWUC = (card) => card;

const decodeUDB = card => {
    const [,prefix, cardNumber] = card.match(/([A-Z]+)?(\d+)?/);

    return prefix ? udbPrefexes[prefix] * 1000 + Number(cardNumber) : 1000 + Number(cardNumber);
}

const getDecodingFunction = (encoding) => {
    switch (encoding) {
        case "udb":
            return decodeUDB;
        case "uds":
            return decodeUDS;
        case "wuc":
            return decodeWUC;
        default:
            throw Error("Unknown encoding format");
    }
};
