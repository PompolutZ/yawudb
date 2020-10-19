import React, { useEffect, useState } from "react";
import { cardsDb, factions, setsIndex } from "../../data";
import { ReactComponent as Logo } from "../../svgs/underworlds_logo.svg";
import { ReactComponent as Hex } from "../../svgs/hexagon-shape.svg";
import { useInView } from "react-intersection-observer";

function SectionTitle({ title, ...rest }) {
    return (
        <div className={`flex items-center ${rest.className}`}>
            <hr className="flex-grow" />
            <Logo className="mx-2 text-gray-500 fill-current" />
            <h3>{title}</h3>
            <Logo className="mx-2 text-gray-500 fill-current" />
            <hr className="flex-grow" />
        </div>
    );
}

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
            <div className="flex-grow grid place-content-center text-gray-900 text-xl">
                {factions[faction]}
            </div>
        </div>
    );
}

function FactionsPicker({ ...rest }) {
    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {Object.keys(factions)
                .slice(1)
                .map((faction) => (
                    <img
                        key={faction}
                        className="w-10 h-10 m-1"
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

function Filters({ ...rest }) {
    return (
        <section className={`${rest.className}`}>
            <SectionTitle title="Warband" />
            <SelectedFaction className="my-4" />
            <FactionsPicker className="my-4" />

            <SectionTitle title="Format" className="mt-8" />
            <SectionTitle title="Sets" className="mt-8" />
            <div className="flex">
                <Toggle checked />
                <p className="ml-2">
                    For dublicate cards show only newest one.
                </p>
            </div>
            <SetsPicker />
        </section>
    );
}

function Card({ id, ...rest }) {
    return (
        <div className="w-1/4 p-2">
            <img className="rounded-md hover:filter-shadow-sm" src={`/assets/cards/${id}.png`}/>
        </div>
    )
}

function CardsList({ cards, ...rest }) {
    return (
        <div className={`${rest.className}`}>
            {
                cards.map(card => <Card key={card.id} {...card} />)
            }
        </div>
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
        <div className={`${rest.className} h-screen overflow-y-auto`}>
            {
                visibleCards.map(card => <Card key={card.id} {...card} />)
            }
            <div ref={ref}>Loading...</div>
        </div>
    )    
}

function DeckEditor() {


    return (
        <div className="w-full bg-white grid grid-cols-8 gap-2">
            <Filters className="col-span-2" />
            {/* <div className="bg-gray-500 col-span-4 h-48"></div> */}
            <FilterableCardsList className="bg-orange-600 col-span-4 flex flex-wrap content-start" />
            {/* <div className="bg-yellow-500 h-48"></div> */}
            <section className="w-full h-full bg-orange-500 col-span-2">
                Current Deck
            </section>            
        </div>
    );
}

export default DeckEditor;
