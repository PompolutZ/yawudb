import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    factions,
    CHAMPIONSHIP_FORMAT,
    RELIC_FORMAT,
    OPEN_FORMAT,
} from "../../data";
import { ReactComponent as Logo } from "../../svgs/underworlds_logo.svg";
import { ReactComponent as Hex } from "../../svgs/hexagon.svg";
import { ReactComponent as GridIcon } from "../../svgs/grid.svg";
import { ReactComponent as ListIcon } from "../../svgs/list.svg";
import { ReactComponent as StarIcon } from "../../svgs/star.svg";
import { ReactComponent as ClockIcon } from "../../svgs/clock.svg";
import { ReactComponent as HourglassIcon } from "../../svgs/hourglass-2.svg";
import { ReactComponent as ZapIcon } from "../../svgs/zap.svg";
import { useInView } from "react-intersection-observer";
import { ReactComponent as SlidersIcon } from "../../svgs/sliders.svg";
import SectionTitle from "../components/SectionTitle";
import FullScreenOverlay from "../components/FullScreenOverlay";
import useDexie from "../../hooks/useDexie";
import DebouncedInput from "../components/DebouncedInput";

function SelectedFaction({ faction = "morgwaeths-blade-coven", ...rest }) {
    return (
        <div className={`flex flex-grow ${rest.className}`}>
            <div className="">
                <picture>
                    <img
                        className="w-20 h-20"
                        src={`/assets/icons/${faction}-deck.png`}
                    />
                </picture>
            </div>
            <div className="flex-grow grid place-content-center text-gray-900 text-2xl">
                {factions[faction]}
            </div>
        </div>
    );
}

function FactionsPicker({ selected, onPicked, ...rest }) {
    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.keys(factions)
                .slice(1)
                .filter((f) => f != selected)
                .map((faction) => (
                    <img
                        key={faction}
                        className="w-10 h-10 m-1"
                        onClick={() => onPicked(faction)}
                        src={`/assets/icons/${faction}-icon.png`}
                    />
                ))}
        </div>
    );
}

function Toggle({ checked }) {
    return (
        <div className="flex w-6 h-6 relative cursor-pointer">
            <Hex className="text-gray-900 stroke-current stroke-2 w-6 h-6" />
            {checked && (
                <div className="absolute grid place-content-center inset-0">
                    <Logo className="w-4 h-4" />
                </div>
            )}
        </div>
    );
}

function SetsPicker({ ...rest }) {
    return (
        <>
            <div className="flex">
                <Toggle checked />
                <p className="ml-2">
                    Select all sets available for selected format.
                </p>
            </div>
            <div className={`flex flex-wrap align-middle ${rest.className}`}>
                {rest.selectedSets.map((set) => (
                    <img
                        key={set.id}
                        className="w-10 h-10 m-1"
                        src={`/assets/icons/${set.name}-icon.png`}
                    />
                ))}
            </div>
        </>
    );
}

function SelectFormatButton({ ...rest }) {
    const [currentFormat, setCurrentFormat] = useState(rest.selectedFormat);

    const handleChange = e => {
        setCurrentFormat(e.target.value);
    }

    return (
        <div className={`clearfix flex place-content-center ${rest.className}`}>
            <input
                className="stv-radio-button"
                id={RELIC_FORMAT}
                type="radio"
                name="format"
                value={RELIC_FORMAT}
                checked={currentFormat == RELIC_FORMAT}
                onChange={handleChange}
            />
            <label htmlFor={RELIC_FORMAT}>{RELIC_FORMAT}</label>

            <input
                id={CHAMPIONSHIP_FORMAT}
                type="radio"
                name="format"
                className="stv-radio-button"
                value={CHAMPIONSHIP_FORMAT}
                checked={currentFormat == CHAMPIONSHIP_FORMAT}
                onChange={handleChange}
            />
            <label htmlFor={CHAMPIONSHIP_FORMAT}>{CHAMPIONSHIP_FORMAT}</label>

            <input
                className="stv-radio-button"
                id={OPEN_FORMAT}
                type="radio"
                name="format"
                value={OPEN_FORMAT}
                checked={currentFormat == OPEN_FORMAT}
                onChange={handleChange}
            />
            <label htmlFor={OPEN_FORMAT}>{OPEN_FORMAT}</label>
        </div>
    );
}

function Filters({
    selectedFaction,
    factionPicker,
    selectedFormat,
    selectedSets,
    ...rest
}) {
    return (
        <section className={`${rest.className}`}>
            <SectionTitle title="Warband" />
            
            {selectedFaction}
            
            {factionPicker}

            <SectionTitle title="Format" className="my-8" />

            <SelectFormatButton selectedFormat={selectedFormat} />
            
            <SectionTitle title="Sets" className="my-8" />
            
            <div className="flex">
                <Toggle checked />
                <p className="ml-2">
                    For dublicate cards show only newest one.
                </p>
            </div>
            <SetsPicker selectedSets={selectedSets} />
        </section>
    );
}

function Rank({ rank, classes, ...rest }) {
    const fullStars = new Array(5).fill(1);
    const emptyStars = new Array(5).fill(0);

    return (
        <div className="flex">
            {[...fullStars, ...emptyStars]
                .slice(5 - rank / 2, 10 - rank / 2)
                .map((star, i) => {
                    return star ? (
                        <StarIcon
                            key={i}
                            className={`fill-current ${classes}`}
                        />
                    ) : (
                        <StarIcon key={i} className={`opacity-25 ${classes}`} />
                    );
                })}
        </div>
    );
}

function ScoreIcon({ scoreType, classes, ...rest }) {
    switch (scoreType) {
        case "Surge":
            return <ZapIcon className={`${classes}`} />;
        case "End":
            return <ClockIcon className={`${classes}`} />;
        case "Third":
            return <HourglassIcon className={`fill-current ${classes}`} />;
        default:
            return null;
    }
}

const Card = memo(({ image, id, name, setName, type, onPicked, ...rest }) => {
    const handleClicked = () => {
        onPicked({
            id,
            name,
            setName,
            type,
            ...rest
        })
    }

    return (
        <>
            {image ? (
                <article className="w-1/4 p-2 mb-2" onClick={handleClicked}>
                    <img
                        className="rounded-md hover:filter-shadow-sm"
                        src={`/assets/cards/0${id}.png`}
                    />
                    <div class="flex items-center my-2">
                        <img
                            className="w-4 h-4 mr-2"
                            src={`/assets/icons/${setName}-icon.png`}
                        />
                        <Rank
                            rank={rest.rank?.rank}
                            classes="text-gray-700 w-2 h-2"
                        />
                    </div>
                </article>
            ) : (
                <article
                    className={`w-full flex p-2 ${
                        rest.even ? "bg-gray-200" : "bg-white"
                    }`}
                    onClick={handleClicked}
                >
                    <div className="w-10 h-10 mr-2 relative">
                        <img
                            className="w-8 h-8 absolute left-0"
                            src={`/assets/icons/${type.toLowerCase()}-icon.png`}
                        />
                        <img
                            className={`w-6 h-6 absolute right-0 bottom-0 border-2 rounded-full ${
                                rest.even ? "border-gray-200" : "border-white"
                            }`}
                            src={`/assets/icons/${setName}-icon.png`}
                        />
                    </div>

                    <div>
                        <div className="flex items-center">
                            <h6 className="text-gray-900">{name}</h6>
                            <ScoreIcon
                                classes="mx-2 w-4 h-4"
                                scoreType={rest.scoreType}
                            />
                        </div>
                        <div className="flex items-center">
                            <Rank
                                rank={rest.rank?.rank}
                                classes="text-gray-700 w-2 h-2"
                            />
                        </div>
                    </div>
                </article>
            )}
        </>
    );
});

function FilterableCardsList({ cards, layout = "grid", onCardPicked, ...rest }) {
    const { ref, inView } = useInView({ threshold: 0.5 });
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        setVisibleCards(() => cards?.slice(0, 20));
    }, [cards]);

    useEffect(() => {
        if (!cards) return;

        if (inView) {
            setVisibleCards((current) => {
                return [
                    ...current,
                    ...cards.slice(current.length, current.length + 20),
                ];
            });
        }
    }, [inView, cards]);

    return (
        <section
            className={`lg:max-h-screen lg:overflow-y-auto ${rest.className}`}
        >
            {visibleCards?.map((card, i) => (
                <Card
                    key={card.id}
                    image={layout == "grid"}
                    {...card}
                    even={i % 2 == 0}
                    onPicked={onCardPicked}
                />
            ))}
            <div ref={ref}>Loading...</div>
        </section>
    );
}

function CurrentDeck({ selectedFaction, currentDeck, ...rest}) {
    const { cards, sets, factions, cardsRanks } = useDexie("wudb");
    const [factionInfo, setFactionInfo] = useState(undefined)

    useEffect(() => {
        factions.where('name').equals(selectedFaction).first(setFactionInfo);
    }, [selectedFaction, factions])

    return (
        <section
        className={`${rest.className}`}
    >
        <div className="w-full p-4">
            <div className="lg:col-span-3 flex items-center">
                {
                    factionInfo && (
                        <img className="w-16 h-16 mr-4" src={`/assets/icons/${selectedFaction}-deck.png`} />
                    )
                }
                <DebouncedInput 
                    placeholder={`${factionInfo?.displayName || selectedFaction} Deck`}
                    className="rounded h-12 bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-accent3-500"/>
            </div>
        </div>
        <div className="grid grid-cols-3">
            <div>
                <h3 className="text-xl">Objectives ({Object.keys(currentDeck?.objectives).length} / 12):</h3>
                {
                    Object.values(currentDeck.objectives).map((card, i) => (
                        <Card key={card.id} {...card} even={i % 2 === 0} />
                    ))
                }
            </div>
            <div>
            <h3  className="text-xl">Gambits:</h3>
            {
                    Object.values(currentDeck.gambits).map((card, i) => (
                        <Card key={card.id} {...card} even={i % 2 === 0} />
                    ))
                }
            </div>
            <div>
            <h3  className="text-xl">Upgrades:</h3>
            {
                    Object.values(currentDeck.upgrades).map((card, i) => (
                        <Card key={card.id} {...card} even={i % 2 === 0} />
                    ))
                }
            </div>
        </div>
    </section>

    )
}

function usePersistedState(data, key) {
    const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) || data);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}

function DeckEditor() {
    const [selectedFaction, setSelectedFaction] = useState(
        "thorns-of-the-briar-queen"
    );
    const [selectedFormat] = useState(CHAMPIONSHIP_FORMAT);
    const [selectedSets, setSelectedSets] = useState([]);
    const { cards, sets, factions, cardsRanks } = useDexie("wudb");
    const [filteredCards, setFilteredCards] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [layout, setLayout] = useState("list");
    
    const [currentDeck, setCurrentDeck] = usePersistedState({
        objectives: {},
        gambits: {},
        upgrades: {}
    })

    const selectedCards = useMemo(() => {
        console.log('Changes')
        return [
            ...Object.keys(currentDeck.objectives).map(Number),
            ...Object.keys(currentDeck.gambits).map(Number),
            ...Object.keys(currentDeck.upgrades).map(Number),
        ]
    }, [currentDeck])

    const handleCardPicked = card => {
        console.log(card);
        switch(card.type) {
            case 'Objective': 
                setCurrentDeck(prev => ({ ...prev, objectives: {...prev.objectives, [card.id]: card }}))
                return;
            case 'Ploy': 
                setCurrentDeck(prev => ({ ...prev, gambits: {...prev.gambits, [card.id]: card }}))
                return;
            case 'Spell': 
                setCurrentDeck(prev => ({ ...prev, gambits: {...prev.gambits, [card.id]: card }}))
                return;
            case 'Upgrade': 
                setCurrentDeck(prev => ({ ...prev, upgrades: {...prev.upgrades, [card.id]: card }}))
                return;
            default: return;
        }
    }

    useEffect(() => {
        sets.where("id")
            .above(8)
            .toArray()
            .then((sets) => setSelectedSets(sets));
    }, []);

    useEffect(() => {
        console.log('changes', selectedCards)
        factions
            .where("name")
            .equals(selectedFaction)
            .first()
            .then((faction) => {
                return cards
                    .where("[factionId+setId]")
                    .anyOf(
                        selectedSets.flatMap((s) =>
                            [faction.id, 1].map((fid) => [fid, s.id])
                        )
                    )
                    .with({ set: "setId", faction: "factionId" });
            })
            .then((cards) => {
                return Promise.all(
                    cards.map(async (card) => {
                        let rank = await cardsRanks
                            .where("[factionId+cardId]")
                            .equals([card.factionId, card.id])
                            .first();
                        return {
                            ...card,
                            set: card.set,
                            faction: card.faction,
                            rank,
                        };
                    })
                );
            })
            .then((cards) => {
                setAllCards(cards);
            })
            .catch((e) => console.error(e));
    }, [selectedFaction, selectedFormat, selectedSets.length]);

    useEffect(() => {
        setFilteredCards(
            allCards
                .filter((card) => {
                    return card.name
                        .toUpperCase()
                        .includes(filterText.trim().toUpperCase());
                })
                .filter(card => {
                    if(!!card.duplicates) {
                        const [lastDuplicate] = card.duplicates.slice(-1);
                        return card.id == lastDuplicate;
                    }
                    
                    return !selectedCards.includes(card.id);
                })
                .sort(
                    (card, next) =>
                        card.type.localeCompare(next.type) ||
                        next.factionId - card.factionId ||
                        next.rank?.rank - card.rank?.rank
                )
                .map((i) => ({ ...i, setName: i.set?.name }))
        );
    }, [allCards.length, filterText, selectedCards.length])

    return (
        <div className="w-full bg-white lg:grid lg:grid-cols-8 lg:gap-2">
            <div
                className={`${
                    layout == "list"
                        ? "lg:col-span-3 xl:col-span-2"
                        : "lg:col-span-5 xl:col-span-6"
                }  box-border border-gray-300 border-r`}
            >
                <section className="flex p-2 items-center">
                    <DebouncedInput
                        placeholder="search for a card name..."
                        className="rounded bg-gray-200 box-border flex-1 mr-2 py-1 px-2 outline-none border-2 focus:border-accent3-500"
                        onChange={setFilterText}
                    />
                    <FullScreenOverlay
                        hasCloseButton
                        direction="to-right"
                        icon={() => <SlidersIcon className="mr-2" />}
                    >
                        <Filters
                            className="p-4 lg:opacity-100 lg:static sm:col-span-2"
                            selectedFaction={
                                <SelectedFaction
                                    className="my-4"
                                    faction={selectedFaction}
                                />
                            }
                            factionPicker={
                                <FactionsPicker
                                    className="my-4"
                                    selected={selectedFaction}
                                    onPicked={setSelectedFaction}
                                />
                            }
                            selectedFormat={selectedFormat}
                            selectedSets={selectedSets}
                        />
                    </FullScreenOverlay>

                    <div>
                        {layout == "list" ? (
                            <GridIcon onClick={() => setLayout("grid")} />
                        ) : (
                            <ListIcon onClick={() => setLayout("list")} />
                        )}
                    </div>
                </section>
                <FilterableCardsList
                    className="flex flex-wrap content-start"
                    cards={filteredCards}
                    layout={layout}
                    onCardPicked={handleCardPicked}
                />
            </div>
            
            <CurrentDeck 
                className={`${
                    layout == "list"
                        ? "lg:col-span-5 xl:col-span-6"
                        : "lg:col-span-3 xl:col-span-2"
                } opacity-0 lg:opacity-100 sm:static`}
                currentDeck={currentDeck}
                selectedFaction={selectedFaction} />
        </div>
    );
}

export default DeckEditor;
