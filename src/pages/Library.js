import React, { useMemo } from "react";
import VirtualizedCardsList from "../components/VirtualizedCardsList";
import { Helmet } from "react-helmet";
import { CHAMPIONSHIP_FORMAT, getAllSetsValidForFormat, wucards } from "../data/wudb";

function useFilteredCards(format) {
    const filteredCards = useMemo(() => {
        const setsValidForFormat = getAllSetsValidForFormat(format).map(set => set.id);
        return Object.values(wucards).filter(card => setsValidForFormat.includes(card.setId))
    }, [format])

    return filteredCards;
}

function CardPicture({ name, id }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/cards/${String(id).padStart(5, "0")}_xs.webp`}
            />
            <img
                className="relative w-full rounded-md cursor-pointer transform hover:scale-150 transition-all hover:z-10 filter hover:drop-shadow-md"
                alt={name}
                src={`/assets/cards/${String(id).padStart(5, "0")}.png`}
            />
        </picture>
    );
}

function Library() {
    const cardsContainerRef = React.createRef();
    const filteredCards = useFilteredCards(CHAMPIONSHIP_FORMAT);

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    Warhammer Underworlds Direchasm - Cards Library
                </title>
                <link rel="canonical" href="https://yawudb.com/library" />
            </Helmet>

            <div className="flex-1 p-4 flex">
                <div className="flex-1" ref={cardsContainerRef}>
                    {filteredCards.length > 0 && (
                        <VirtualizedCardsList
                            cards={filteredCards}
                            containerRef={cardsContainerRef.current}
                        >
                            {(items) => 
                                items.map((card) => (
                                        <div
                                            key={card.id}
                                            className="flex-1 m-2 flex items-center "
                                        >
                                            <CardPicture id={card.id} name={card.name} />
                                        </div>
                                    ))
                            }
                        </VirtualizedCardsList>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Library;
