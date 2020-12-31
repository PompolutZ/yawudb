import React from "react";
import ExpandableWUCard from "../../../../atoms/ExpandableWUCard";

export function CardsList({ cards = [], restrictedCardsCount }) {
    return (
        <>
            {cards.map(({ isForsaken, ...card}, i) => (
                <ExpandableWUCard
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
