import React from "react";
import { useDeckBuilderDispatcher } from "../..";
import { CHAMPIONSHIP_FORMAT } from "../../../../data/wudb";
import { toggleCardAction } from "../../reducer";
import CardInDeck from "./Card";

export function CardsList({ cards = [], format= CHAMPIONSHIP_FORMAT, restrictedCardsCount }) {
    const dispatch = useDeckBuilderDispatcher();
    return (
        <>
            {cards.map(({ isForsaken, ...card}, i) => (
                <CardInDeck
                    cardId={card.id}
                    withAnimation
                    inDeck
                    format={format}
                    key={card.id}
                    toggleCard={() => dispatch(toggleCardAction(card))}
                    restrictedCardsCount={restrictedCardsCount}
                    isAlter={i % 2 === 0} />
            ))}
        </>
    );

}
