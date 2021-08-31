import React, { useMemo, useState } from "react";
import VirtualizedCardsList from "../../components/VirtualizedCardsList";
import { Helmet } from "react-helmet";
import {
    CHAMPIONSHIP_FORMAT,
    getAllSetsValidForFormat,
    wucards,
    wufactions,
} from "../../data/wudb";
import { AutoSizer } from "react-virtualized";
import { useBreakpoint } from "../../hooks/useMediaQuery";
import SectionTitle from "../../v2/components/SectionTitle";
import { DeckPlayFormatToggle } from "../../v2/components/DeckPlayFormatToggle";
import { DeckPlayFormatInfo } from "../../v2/components/DeckPlayFormatInfo";
import IconButton from "../../v2/components/IconButton";
import { ReactComponent as TogglesIcon } from "../../svgs/sliders.svg";
import { sortByIdAsc } from "../../utils/sort";
import { GrouppedFactionsToggle } from "../../v2/components/GrouppedFactionsToggle";
import { GrouppedExpansions } from "../../v2/components/GrouppedExpansions";

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
                className="relative w-full rounded-md cursor-pointer transform hover:scale-105 transition-all hover:z-10 filter hover:drop-shadow-lg"
                alt={name}
                src={`/assets/cards/${String(id).padStart(5, "0")}.png`}
            />
        </picture>
    );
}

function Library() {
    const cardsContainerRef = React.createRef();
    const [selectedFormat, setSelectedFormat] = useState(CHAMPIONSHIP_FORMAT);
    const sortedFactions = Object.values(wufactions).sort(sortByIdAsc);
    const [selectedFactions, setSelectedFactions] = useState(
        sortedFactions.map((f) => f.id)
    );
    const [filteredCards, findCardsWithText] = useFilteredCards(selectedFormat);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <React.Fragment>
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-4 p-4">
                <div className={`bg-gray-200 space-y-3`}>
                    <section className="flex space-x-2 m-2">
                        <input
                            onChange={(e) => findCardsWithText(e.target.value)}
                            placeholder="Search for text on a card"
                            className="flex-1 px-3 py-2 w-full m-1border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
                        />
                        <IconButton
                            className="rounded-full ml-3 px-2 w-11 h-11 grid place-content-center relative hover:bg-gray-100 focus:text-purple-700"
                            onClick={() => setShowFilters((prev) => !prev)}
                        >
                            <TogglesIcon />
                        </IconButton>
                    </section>
                    <section className="flex flex-col items-center space-y-2">
                        <SectionTitle title="Game format" />
                        <DeckPlayFormatToggle
                            selectedFormat={CHAMPIONSHIP_FORMAT}
                            onFormatChange={setSelectedFormat}
                        />

                        <DeckPlayFormatInfo
                            className="text-gray-900 text-sm mt-2 max-w-sm"
                            format={selectedFormat}
                        />
                    </section>

                    <GrouppedFactionsToggle selectedFactions={selectedFactions} />
                    
                    <GrouppedExpansions />
                </div>
                <div className="flex-1 lg:col-span-3 flex flex-col lg:px-2">
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
                                        {(card, key, style) =>
                                            card ? (
                                                <div
                                                    key={key}
                                                    style={style}
                                                    className="flex-1 p-2 flex items-center "
                                                >
                                                    <CardPicture
                                                        id={card.id}
                                                        name={card.name}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                    </VirtualizedCardsList>
                                )}
                            </AutoSizer>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Library;
