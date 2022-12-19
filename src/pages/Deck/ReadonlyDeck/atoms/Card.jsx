import React, { useState } from "react";
import { getSetById, totalCardsPerWave } from "../../../../data/wudb/index";
import { pickCardColor2 } from "../../../../utils/functions";
import AnimateHeight from "react-animate-height";
import {
    CHAMPIONSHIP_FORMAT,
    getCardWaveFromId,
    getSetNameById,
    validateCardForPlayFormat,
} from "../../../../data/wudb";
import CardImage from "../../../../v2/components/CardImage";
import CardRule from "../../../../atoms/CardRule";
import ObjectiveScoreTypeIcon from "../../../../components/ObjectiveScoreTypeIcon";
import { ReactComponent as LockIcon } from "@icons/lock.svg";
import { ReactComponent as ForsakenIcon } from "@icons/no-symbol.svg";

const idToPrintId = (id) => {
    return (
        <>
            <span className="font-bold">{`${id}`.slice(-3)}</span>
            <span>/{totalCardsPerWave[parseInt(getCardWaveFromId(id))]}</span>
        </>
    );
};

const SetIcon = ({ id, setId, className = "" }) => (
    <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${getSetNameById(setId)}-icon.webp`}
        />
        <img
            className={`w-4 h-4 -ml-1 mr-2 ${className}`}
            id={id}
            src={`/assets/icons/${getSetNameById(setId)}-icon-24.png`}
            alt="icon"
        />
    </picture>
);

function CardImageOrText({ useTextFallback, image, fallback }) {
    return useTextFallback ? fallback : image;
}

function Expandable({ animateHeight, children }) {
    return (
        <AnimateHeight height={animateHeight} duration={250} easing="ease-out">
            {children}
        </AnimateHeight>
    );
}

const CardAsImage = ({ id, name, setId }) => {
    const [, isForsaken, isRestricted] = validateCardForPlayFormat(
        id,
        CHAMPIONSHIP_FORMAT
    );

    return (
        <div className="relative m-2 w-56 flex flex-col">
            <div className="relative">
                <CardImage
                    alt={name}
                    id={id}
                    className={`shadow-lg rounded-2xl ${
                        isForsaken
                            ? "shadow-red-500"
                            : isRestricted
                            ? "shadow-objective-gold"
                            : ""
                    }`}
                />
                {isForsaken && (
                    <ForsakenIcon className="text-red-500/40 stroke-current w-50 h-50 absolute inset-0 m-auto" />
                )}

                {isRestricted && (
                    <LockIcon className="text-objective-gold/40 stroke-current w-50 h-50 absolute inset-0 m-auto" />
                )}
            </div>

            <div className="space-y-2 mt-4">
                <span className="inline-block text-sm text-gray-700">
                    Found in:{" "}
                </span>
                <div className="flex space-x-2 items-center">
                    <SetIcon id={`${id}`} setId={setId} />
                    <span className="inline-block text-sm">
                        {getSetById(setId).displayName}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CardAsText = ({ card, cardId }) => {
    const [expanded, setExpanded] = useState(false);
    const [useTextFallback, setUseTextFallback] = useState(false);
    const animateHeight = expanded ? "auto" : 0;

    return (
        <>
            <div
                className="flex items-center p-2 rounded cursor-pointer space-x-1 transform transition-all sm:hover:bg-gray-300 sm:hover:shadow-sm sm:hover:scale-105"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <SetIcon id={`${cardId}`} setId={card.setId} />
                <h3
                    className="cursor-pointer flex-1 inline-block"
                    style={{
                        color: pickCardColor2(cardId, CHAMPIONSHIP_FORMAT),
                    }}
                >
                    {card.name}
                </h3>
                <div className="flex items-center">
                    {card.scoreType && (
                        <ObjectiveScoreTypeIcon
                            type={card.scoreType}
                            style={{
                                width: ".8rem",
                                height: ".8rem",
                            }}
                        />
                    )}
                    {card.glory && (
                        <span className="text-xs font-bold">
                            ({card.glory})
                        </span>
                    )}
                </div>
                <div className="flex items-center">
                    <div className="ml-auto flex items-center text-xs text-gray-700">
                        <div>(</div>
                        {idToPrintId(cardId)}
                        <picture>
                            <source
                                type="image/webp"
                                srcSet={`/assets/icons/wave-${cardId.substr(
                                    0,
                                    2
                                )}-icon-48.webp`}
                            />
                            <img
                                className="w-3 h-3 ml-1"
                                id={idToPrintId(cardId)}
                                alt={`wave-${cardId.substr(0, 2)}`}
                                src={`/assets/icons/wave-${cardId.substr(
                                    0,
                                    2
                                )}-icon-24.png`}
                            />
                        </picture>
                        <div>)</div>
                    </div>
                </div>
            </div>
            <Expandable animateHeight={animateHeight}>
                <CardImageOrText
                    useTextFallback={useTextFallback}
                    image={
                        <CardImage
                            onError={() => setUseTextFallback(true)}
                            onLoad={() => setUseTextFallback(false)}
                            className="w-full mx-auto my-2 rounded-lg shadow-md sm:max-w-xs"
                            id={card.id}
                            alt={card.name}
                        />
                    }
                    fallback={<CardRule rule={card.rule} glory={card.glory} />}
                />
            </Expandable>
        </>
    );
};

const Card = ({ card, asImage }) => {
    const cardId = `${card.id}`.padStart(5, "0");
    return asImage ? (
        <CardAsImage id={cardId} name={card.name} setId={card.setId} />
    ) : (
        <CardAsText card={card} cardId={cardId} />
    );
};

export default Card;
