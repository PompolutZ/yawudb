import React from "react";
import CardInDeck from "./Card";

export function CardsList({ cards = [], restrictedCardsCount }) {
    return (
        <>
            {cards.map(({ isForsaken, ...card}, i) => (
                <CardInDeck
                    card={card}
                    isBanned={isForsaken}
                    withAnimation
                    inDeck
                    key={card.id}
                    restrictedCardsCount={restrictedCardsCount}
                    isAlter={i % 2 === 0} />
            ))}
        </>
    );

}
