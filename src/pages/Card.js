import React from "react";
import { useParams } from "react-router-dom";
import {
    CHAMPIONSHIP_FORMAT,
    getCardById,
    getSetById,
    RELIC_FORMAT,
    validateCardForPlayFormat,
    VANGUARD_FORMAT,
} from "../data/wudb";
import { ReactComponent as ChampionshipLogo } from '../svgs/championship_logo.svg';
import { ReactComponent as RelicLogo } from '../svgs/relic_logo.svg';
import { ReactComponent as VanguardLogo } from '../svgs/vanguard_logo.svg';

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
    const [isVanguardValid] = validateCardForPlayFormat(card, VANGUARD_FORMAT);
    const set = getSetById(card.setId);

    return (
        <div className="w-full h-full lg:w-1/2 lg:mx-auto grid place-content-center px-4 text-gray-900">
            <img
                src={`/assets/cards/${id.toString().padStart(5, "0")}.png`}
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
                        <div className="flex break-words my-2">
                            <ChampionshipLogo className={`mr-2 text-3xl fill-current ${isValid ? 'text-green-700' : isRestrictedChampionship ? 'text-yellow-700' : 'text-red-700'}`} />
                            { isValid && <span>This card is VALID for Championship format.</span> }
                            { isRestrictedChampionship && <span>This card is RESTRICTED for Championship format.</span> }
                            { isForsakenChampionship && <span>This card is FORSAKEN for Championship format.</span> }
                        </div>
                        <div className="flex break-words my-2">
                            <RelicLogo className={`mr-2 text-3xl fill-current ${isRelicValid ? 'text-green-700' : 'text-red-700'}`} />
                            { isRelicValid && <span>This card is VALID for Relic format.</span> }
                            { isForsakenRelic && <span>This card is FORSAKEN for Relic format.</span> }
                        </div>
                        <div className="flex break-words my-2">
                            <VanguardLogo className={`mr-2 text-3xl fill-current ${isVanguardValid ? 'text-green-700' : 'text-red-700'}`} />
                            { isVanguardValid && <span>This card is VALID for Vanguard format.</span> }
                            { !isVanguardValid && <span>This card cannot be used for Vanguard format.</span> }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
