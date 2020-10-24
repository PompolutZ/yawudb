import React, { useEffect, useState } from "react";
import { cardsDb, factions, getValidSets, setsIndex, CHAMPIONSHIP_FORMAT } from "../../data";
import { ReactComponent as Logo } from "../../svgs/underworlds_logo.svg";
import { ReactComponent as Hex } from "../../svgs/hexagon-shape.svg";
import { useInView } from "react-intersection-observer";
import { animated, useTransition } from 'react-spring';
import { ReactComponent as SlidersIcon } from "../../svgs/sliders.svg";
import SectionTitle from '../components/SectionTitle';
import FullScreenOverlay from "../components/FullScreenOverlay";
import useDexie from "../../hooks/useDexie";

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

function FactionsPicker({ selected, onPicked,...rest }) {
    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.keys(factions)            
                .slice(1)
                .filter(f => f != selected )
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

function Toggle({ checked, ...rest }) {
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
                {setsIndex.map((set) => (
                    <img
                        key={set}
                        className="w-10 h-10 m-1"
                        src={`/assets/icons/${set}-icon.png`}
                    />
                ))}
            </div>
        </>
    );
}

function Filters({ selectedFaction, factionPicker, selectedFormat, selectedSets,...rest }) {
    return (
        <section className={`${rest.className}`}>
            <SectionTitle title="Warband" />
            { selectedFaction }
            { factionPicker }

            <SectionTitle title="Format" className="mt-8" />
            { selectedFormat }
            <SectionTitle title="Sets" className="mt-8" />
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

function Card({ image, id, name, set, ...rest }) {
    return (
        <>
            {
                image ? (
                    <div className="w-1/4 p-2">
                        <img className="rounded-md hover:filter-shadow-sm" src={`/assets/cards/${id}.png`}/>
                    </div>
                ) : (
                    <div className="w-full mb-2 flex">
                        <img className="w-12 h-12" src={`/assets/icons/${setsIndex[set]}-icon.png`} />
                        <div>{name}</div>
                    </div>
                )
            }
        </>
    )
}

function FilterableCardsList({ ...rest }) {
    const { ref, inView, entry } = useInView();
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState([])

    useEffect(() => {
        const cards = Object.entries(cardsDb).map(([id, data]) => ({ ...data, id}));
        setCards(cards);
    }, []);

    useEffect(() => {
        setVisibleCards((current) => cards.slice(current.length, 20));
      }, [cards]);

      useEffect(() => {
        console.log(inView);
        if (inView) {
            setVisibleCards((current) => {
            console.log("I Will Try to Add more");
            return [
              ...current,
              ...cards.slice(current.length, current.length + 20)
            ];
          });
        }
      }, [inView, cards]);
    
    return (
        <div className={`lg:max-h-screen lg:overflow-y-auto ${rest.className}`}>
            {
                visibleCards.map(card => <Card key={card.id} image={window.innerWidth > 640} {...card} />)
            }
            <div ref={ref}>Loading...</div>
        </div>
    )    
}

function DeckEditor() {
    const [selectedFaction, setSelectedFaction] = useState("thorns-of-the-briar-queen");
    const [selectedFormat, setSelectedFormat] = useState(CHAMPIONSHIP_FORMAT);
    const [selectedSets, setSelectedSets] = useState(getValidSets(CHAMPIONSHIP_FORMAT));
    const { cards } = useDexie('wudb');

    useEffect(() => {
        console.log(selectedFaction, selectedFormat, selectedSets);
    }, [])

    useEffect(() => {
        cards
        .where('name').startsWith('J') // can be replaced with your custom query
        .with({ set: 'setId', faction: 'factionId' }) // makes referred items included
        .then(items => {
            // Let's print the result:
            items.forEach(item => {
                console.log(item);
                console.log(item.set.name)
                console.log(item.faction.displayName);
            })
            // cards.forEach (card => {
            //     console.log (`Card: ${card}`)
            //     console.log (`Set: ${card.set.name}`)
            //     console.log (`Faction: ${JSON.stringify(card.faction, null, 4)}`)
            // });
        }).catch(e => console.error(e));
    }, [cards])

    return (
        <div className="w-full bg-white lg:grid grid-cols-8 gap-2">
            <FullScreenOverlay 
                hasCloseButton
                icon={() => <SlidersIcon className="" />}
            >
                <Filters 
                    className="p-4 lg:opacity-100 lg:static sm:col-span-2"
                    selectedFaction={
                        <SelectedFaction className="my-4" faction={selectedFaction} />
                    }
                    factionPicker={
                        <FactionsPicker className="my-4" selected={selectedFaction}
                            onPicked={setSelectedFaction} />
                    }
                    selectedFormat={selectedFormat}
                    selectedSets={selectedSets} />
            </FullScreenOverlay>

            <FilterableCardsList className="bg-orange-600 col-span-4 flex flex-wrap content-start" />
            
            <section className="w-full h-full bg-orange-500 opacity-0 lg:opacity-100 sm:static lg:col-span-2">
                Current Deck
            </section>            
        </div>
    );
}

export default DeckEditor;
