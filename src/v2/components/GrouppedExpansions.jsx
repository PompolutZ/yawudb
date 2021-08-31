import React from 'react';
import { wusets } from '../../data/wudb';
import { sortByIdAsc } from '../../utils/sort';
import SectionTitle from './SectionTitle';

const createExpansionGroups = () => {
    const season1 = [1,2,3,4,5,6,7,8];
    const season2 = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const season3 = [21, 22, 23, 24, 25, 26, 27, 28, 29];
    const season4 = [30, 31, 32, 33, 34, 35, 36, 39];
    const noSeason = [20, 37, 38];

    return [
        {
            title: 'Season 4',
            expansions: Object.values(wusets).filter(exp => season4.includes(exp.id))
        },
        {
            title: 'Season 3',
            expansions: Object.values(wusets).filter(exp => season3.includes(exp.id))
        },
        {
            title: 'Season 2',
            expansions: Object.values(wusets).filter(exp => season2.includes(exp.id))
        },
        {
            title: 'Season 1',
            expansions: Object.values(wusets).filter(exp => season1.includes(exp.id))
        },
        {
            title: 'Extras',
            expansions: Object.values(wusets).filter(exp => noSeason.includes(exp.id))
        },
    ]
}

function ExpansionPicture({ setName, ...rest }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${setName}-icon.webp`}
            />
            <img
                src={`/assets/icons/${setName}-icon-24.png`}
                alt={`${setName}`}
                {...rest}
            />
        </picture>
    );
}

function FactionToggleButton({ children, className }) {
    return <button className={className}>{children}</button>;
}

const GrouppedExpansions = ({ selectedExpansions = [] }) => {
    const expansionGroups = createExpansionGroups();
    return (
        <section className="flex flex-col space-y-2 mx-4">
            <SectionTitle title="Expansions" />
            {expansionGroups.map(({ title, expansions }) => (
                <article key={title}>
                    <h6 className="text-xs font-bold text-gray-500">{title}</h6>
                    <div className="m-2 flex flex-wrap content-start items-center">
                        {expansions.map((expansion) => (
                            <FactionToggleButton className="mb-2 mr-2" key={expansion.id}>
                                <ExpansionPicture
                                    setName={expansion.name}
                                    className={`w-8 h-8 ${
                                        selectedExpansions.includes(expansion.id)
                                            ? "drop-shadow-md opacity-100"
                                            : "drop-shadow-md opacity-75"
                                    }  hover:scale-105`}
                                />
                            </FactionToggleButton>
                        ))}
                    </div>
                </article>
            ))}
        </section>
    )
}

export { GrouppedExpansions }