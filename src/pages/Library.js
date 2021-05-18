import React, { useMemo } from "react";
import { cardsDb } from "../data/index";
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

function Library() {
    // const [cards, setCards] = React.useState([]);
    const cardsContainerRef = React.createRef();
    const filteredCards = useFilteredCards(CHAMPIONSHIP_FORMAT);

    // React.useEffect(() => {
    //     let cards = [];
    //     for (let c in cardsDb) {
    //         cards.push({ id: c, ...cardsDb[c] });
    //     }

    //     setCards(cards);
    // }, []);

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
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Library;
