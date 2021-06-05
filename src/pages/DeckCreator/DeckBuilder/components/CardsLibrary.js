import React, { useEffect, useState } from "react";
import { AutoSizer } from "react-virtualized";
import { connect } from "react-redux";
import {
    validateCardForPlayFormat,
    VANGUARD_FORMAT,
    wucards,
} from "../../../../data/wudb";
import { useDeckBuilderState } from "../..";
import CardInDeck from "./Card";
import VirtualizedCardsList from "../../../../components/VirtualizedCardsList";

function stringTypeToNumber(type) {
    switch (type) {
        case "Objective":
            return 0;
        case "Ploy":
            return 1;
        case "Spell":
            return 1;
        case "Upgrade":
            return 2;
    }
}

const _sort = (card1, card2) => {
    const t1 = stringTypeToNumber(card1.type);
    const t2 = stringTypeToNumber(card2.type);
    return (
        t1 - t2 ||
        card2.faction - card1.faction ||
        card2.ranking - card1.ranking
    );
};

function FilterableCardLibrary(props) {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const state = useDeckBuilderState();
    const { searchText, visibleCardTypes, cardsRanking } = props;

    useEffect(() => {
        const factionCards = Object.values(wucards).filter(
            (card) =>
                card.factionId === state.faction.id &&
                (card.duplicates
                    ? card.id === Math.max(...card.duplicates)
                    : true)
        );

        const nextCards = [
            ...factionCards,
            ...Object.values(wucards).filter(
                (card) =>
                    !!state.sets.find((set) => set.id == card.setId) &&
                    card.factionId === 1 &&
                    (card.duplicates
                        ? card.id === Math.max(...card.duplicates)
                        : true)
            ),
        ].filter(card => {
            return props.filter.test ? props.filter.test(card) : true
        }).map((c) => {
            // previously cards were in format '00000' where first two digits were wave
            // (e.g. Shadespire, Beastgrave or Power Unbound) and then card number
            // =========
            // new format has cards as numbers, which requires padding 0s for now for backward compatibility.

            // let cid = `${c.id}`.padStart(5, "0");

            let oldCardId = `${Number(c.id)}`.padStart(5, "0");
            // Cards ids is a mess
            const universalRank =
                cardsRanking &&
                cardsRanking["u"] &&
                cardsRanking["u"][oldCardId]
                    ? cardsRanking["u"][oldCardId]
                    : 0;

            const rank =
                cardsRanking &&
                cardsRanking[state.faction.abbr] &&
                cardsRanking[state.faction.abbr][oldCardId]
                    ? cardsRanking[state.faction.abbr][oldCardId] * 10000
                    : universalRank;

            const [, isForsaken, isRestricted] = validateCardForPlayFormat(
                c,
                state.format
            );

            const card = {
                oldId: `${c.id}`.padStart(5, "0"),
                ranking: rank,
                ...c,
                isBanned: isForsaken,
                isRestricted,
            };

            return card;
        });

        const nextCardsExcludingForsaken =
            state.format !== VANGUARD_FORMAT
                ? nextCards.filter((c) => !c.isBanned)
                : nextCards;
        setCards(nextCardsExcludingForsaken);
    }, [state, props.filter]);

    useEffect(() => {
        let filteredCards = cards;
        
        if (isNaN(searchText)) {
            filteredCards = filteredCards.filter((c) => {
                if (!searchText) return true;

                return (
                    c.name.toUpperCase().includes(searchText.toUpperCase()) ||
                    c.rule.toUpperCase().includes(searchText.toUpperCase())
                );
            });
        } else {
            filteredCards = filteredCards.filter(({ id }) =>
                `${id}`.padStart(5, "0").includes(searchText)
            );
        }

        const sorted = filteredCards.sort((c1, c2) => _sort(c1, c2));
        const drawableCards = sorted.map((c) => ({ card: c, expanded: false }));
        setFilteredCards(drawableCards);
    }, [cards, searchText, visibleCardTypes]);

    return (
        <div className="flex-1 outline-none">
            <AutoSizer>
                {({ width, height }) => (
                    <VirtualizedCardsList
                        width={width}
                        height={height}
                        cards={filteredCards}
                        variant="list"
                    >
                        {({ card, expanded }, key, style, rowIndex) =>
                            card ? (
                                <div key={key} className={`h-full w-full m-1 flex flex-col justify-center ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-white'}`} style={style}>
                                    <CardInDeck
                                        showType
                                        key={card.id}
                                        card={card}
                                        expanded={expanded}
                                        withAnimation={false}
                                    />
                                </div>
                            ) : (
                                <span>NONE</span>
                            )
                        }
                    </VirtualizedCardsList>
                )}
            </AutoSizer>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        visibleCardTypes: state.cardLibraryFilters.visibleCardTypes,
        eligibleForOP: state.cardLibraryFilters.eligibleForOP,
        cardsRanking: state.cardLibraryFilters.cardsRanking,
    };
};

export default connect(mapStateToProps)(FilterableCardLibrary);
