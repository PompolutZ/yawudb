import React from "react";
import { useParams } from "react-router-dom";
import {
    CHAMPIONSHIP_FORMAT,
    getCardById,
    getSetById,
    NEMESIS_FORMAT,
    RELIC_FORMAT,
    validateCardForPlayFormat,
} from "../data/wudb";
import CardImage from "../v2/components/CardImage";
import { PlayFormatPicture } from "../v2/components/PlayFormatPicture";

function Card() {
    const { id } = useParams();
    const card = getCardById(id);
    const [
        isValid,
        isForsakenChampionship,
        isRestrictedChampionship,
    ] = validateCardForPlayFormat(card, CHAMPIONSHIP_FORMAT);
    const [isRelicValid, isForsakenRelic] = validateCardForPlayFormat(
        card,
        RELIC_FORMAT
    );
    const [isValidForNemesis] = validateCardForPlayFormat(
        card,
        NEMESIS_FORMAT
    );
    const set = getSetById(card.setId);

    return (
        <div className="w-full h-full lg:w-1/2 lg:mx-auto grid place-content-center px-4 text-gray-900">
            <CardImage
                id={Number(id)}
                alt={`card`}
                className="max-w-full rounded-xl shadow-md"
            />
            {card && (
                <>
                    <div>
                        <h3 className="font-bold text-gray-700 mt-4">
                            Card location:
                        </h3>
                        <div>
                            <img
                                src={`/assets/icons/${set.name}-icon.png`}
                                alt={`${set.displayName}`}
                                className="w-8 h-8 mr-4"
                            />
                            {set.displayName}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 mt-4">
                            Play format availability:
                        </h3>
                        <div className="flex my-2 items-center space-x-4">
                            <PlayFormatPicture format={CHAMPIONSHIP_FORMAT} />
                            {isValid && (
                                <span>
                                    This card is VALID for Championship format.
                                </span>
                            )}
                            {isRestrictedChampionship && (
                                <span>
                                    This card is RESTRICTED for Championship
                                    format.
                                </span>
                            )}
                            {isForsakenChampionship && (
                                <span>
                                    This card is FORSAKEN for Championship
                                    format.
                                </span>
                            )}
                        </div>
                        <div className="flex my-2 items-center space-x-4">
                            <PlayFormatPicture format={RELIC_FORMAT} />
                            {isRelicValid && (
                                <span>
                                    This card is VALID for Relic format.
                                </span>
                            )}
                            {isForsakenRelic && (
                                <span>
                                    This card is FORSAKEN for Relic format.
                                </span>
                            )}
                        </div>
                        <div className="flex break-words my-2 items-center space-x-4">
                            <PlayFormatPicture format={NEMESIS_FORMAT} /> 
                            {isValidForNemesis && (
                                <span>
                                    This card is VALID for Nemesis format.
                                </span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
