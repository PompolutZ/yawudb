import React, { useMemo, useState } from "react";
import VirtualizedCardsList from "../components/VirtualizedCardsList";
import { Helmet } from "react-helmet";
import {
    CHAMPIONSHIP_FORMAT,
    getAllSetsValidForFormat,
    wucards,
} from "../data/wudb";
import { AutoSizer } from "react-virtualized";

function useFilteredCards(format) {
    const [searchText, setSearchText] = useState("");
    const filteredCards = useMemo(() => {
        const setsValidForFormat = getAllSetsValidForFormat(format).map(
            (set) => set.id
        );
        const cards = Object.values(wucards).filter((card) =>
            setsValidForFormat.includes(card.setId)
        );

        const findText = searchText.toUpperCase();
        return cards.filter(
            (card) =>
                card.name.toUpperCase().includes(findText) ||
                card.rule.toUpperCase().includes(findText)
        );
    }, [format, searchText]);

    return [filteredCards, setSearchText];
}

function CardPicture({ name, id }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/cards/${String(id).padStart(5, "0")}_xs.webp`}
            />
            <img
                className="relative w-full rounded-md cursor-pointer transform hover:scale-125 transition-all hover:z-10 filter hover:drop-shadow-md"
                alt={name}
                src={`/assets/cards/${String(id).padStart(5, "0")}.png`}
            />
        </picture>
    );
}

function Library() {
    const cardsContainerRef = React.createRef();
    const [filteredCards, findCardsWithText] = useFilteredCards(
        CHAMPIONSHIP_FORMAT
    );

    return (
        <React.Fragment>
            <Helmet>
                <title>Warhammer Underworlds Direchasm - Cards Library</title>
                <link rel="canonical" href="https://yawudb.com/library" />
            </Helmet>

            <div className="flex-1 p-4 flex flex-col">
                <input
                    onChange={(e) => findCardsWithText(e.target.value)}
                    placeholder="Search for text on a card"
                    className="px-3 py-2 border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <div className="flex-1" ref={cardsContainerRef}>
                    {filteredCards.length > 0 && (
                        <AutoSizer>
                            {({ width, height }) => (
                                <VirtualizedCardsList
                                    width={width}
                                    height={height}
                                    cards={filteredCards}
                                    containerRef={cardsContainerRef.current}
                                >
                                    {(card) => card ? (
                                        <div
                                            key={card.id}
                                            className="flex-1 m-2 flex items-center "
                                        >
                                            <CardPicture
                                                id={card.id}
                                                name={card.name}
                                            />
                                        </div>
                                    ) : null}
                                </VirtualizedCardsList>
                            )}
                        </AutoSizer>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Library;
