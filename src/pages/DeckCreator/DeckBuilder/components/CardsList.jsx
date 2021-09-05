import React from "react";
import { useDeckBuilderDispatcher } from "../..";
import { toggleCardAction } from "../../reducer";
import CardInDeck from "./Card";

export function CardsList({ cards = [], restrictedCardsCount }) {
    const dispatch = useDeckBuilderDispatcher();
    return (
        <>
            {cards.map(({ isForsaken, ...card}, i) => (
                <CardInDeck
                    cardId={card.id}
                    isBanned={isForsaken}
                    withAnimation
                    inDeck
                    key={card.id}
                    toggleCard={() => dispatch(toggleCardAction(card))}
                    restrictedCardsCount={restrictedCardsCount}
                    isAlter={i % 2 === 0} />
            ))}
        </>
    );

}
