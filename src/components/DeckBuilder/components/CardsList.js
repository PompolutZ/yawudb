import React from "react";
import ExpandableWUCard from "../../../atoms/ExpandableWUCard";

export function CardsList({ cards = [], restrictedCardsCount }) {
    return (
        <>
            {cards.map((card, i) => (
                <ExpandableWUCard
                    card={card}
                    withAnimation
                    inDeck
                    key={card.id}
                    restrictedCardsCount={restrictedCardsCount}
                    isAlter={i % 2 === 0} />
            ))}
        </>
    );

}
