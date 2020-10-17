import React from 'react'
import { factions, setsIndex } from '../../data'
import { ReactComponent as Logo } from '../../svgs/underworlds_logo.svg';
import { ReactComponent as Hex } from '../../svgs/hexagon-shape.svg';

function SectionTitle({ title, ...rest }) {
    return (
        <div className={`flex items-center ${rest.className}`}>
            <hr className="flex-grow" />
            <Logo className="mx-2" />
                <h3>{title}</h3>
            <Logo className="mx-2" />
            <hr className="flex-grow" />
        </div>
    )
}

function SelectedFaction({ faction = 'morgwaeths-blade-coven', ...rest }) {
    return (
        <div className={`flex flex-grow ${rest.className}`}>
            <div className="">
                <picture>
                    <img className="w-20 h-20" src={`/assets/icons/${faction}-deck.png`} />
                </picture>
            </div>
            <div className="flex-grow grid place-content-center text-gray-900 text-xl">
                {factions[faction]}
            </div>
        </div>
    )
}

function FactionsPicker({ ...rest }) {
    return (
        <div className={`flex flex-wrap align-middle ${rest.className}`}>
            {
                Object.keys(factions).slice(1).map(faction => (
                    <img key={faction} className="w-10 h-10 m-1" src={`/assets/icons/${faction}-icon.png`} />
                ))
            }
        </div>
    )
}

function Toggle({ checked, ...rest}) {
    return (
        <div className="flex w-6 h-6 relative">
        <Hex className="text-gray-900 stroke-current stroke-2 w-6 h-6" />
            <div className="absolute grid place-content-center inset-0">
                <Logo className="w-4 h-4" />
            </div>
        </div>
    )
}

function SetsPicker({ ...rest }) {
return (
    <>
    <div className="flex">
        <Toggle checked />
        <p className="ml-2">Select all sets available for selected format.</p>
    </div>
    <div className={`flex flex-wrap align-middle ${rest.className}`}>
        {
            setsIndex.map(set => (
                <img key={set} className="w-10 h-10 m-1" src={`/assets/icons/${set}-icon.png`} />
                ))
        }
    </div>
    </>

)
}

function Filters({ ...rest }) {
    return (
        <section className={`w-full h-full p-2 lg:w-1/4 ${rest.className}`}>
            <SectionTitle title="Warband" />
            <SelectedFaction className="my-4" />
            <FactionsPicker className="my-4" />

            <SectionTitle title="Format" className="mt-8" />
            <SectionTitle title="Sets" className="mt-8" />
            <div className="flex">
                <Toggle checked />
                <p className="ml-2">For dublicate cards show only newest one.</p>
            </div>
            <SetsPicker />
        </section>                
    )
}

function DeckEditor() {
    return (
        <div className="w-full bg-white flex lg:grid lg:grid-cols-a/fr/a">
            <Filters /> 
            {/* <section className="w-full h-full bg-green-500"></section>            
            <section className="w-full h-full bg-orange-500">
                Current Deck
            </section>             */}
        </div>
    )
}

export default DeckEditor
