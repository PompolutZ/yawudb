import React from 'react';
import { FirebaseContext } from '../firebase';

function CardsRating(props) {
    const firebase = React.useContext(FirebaseContext);

    React.useEffect(() => {
        firebase.decks().once('value').then(snap => {
            const data = Object.entries(snap.val());
            const fixedDate = data.map(([id, value]) => {
                let lastModified = new Date(0)
                if (value.created && value.created.seconds) {
                    lastModified.setSeconds(value.created.seconds)
                } else {
                    lastModified = new Date(value.created)
                }

                return [id, {...value, lastModified: lastModified }];
            });

            //const filteredByDate = fixedDate.filter(([id, value]) => value.lastModified > new Date(2019, 6, 23));
            const groupedByFactions = fixedDate.reduce((acc, [id, value]) => {
                if(id === 'undefined' || !value.cards) return acc;

                const factionPrefix = id.split('-')[0];
                //console.log(id, value.cards);
                //const cards = [];
                //const cards = acc[factionPrefix] ? [...acc[factionPrefix], ...value.cards] : [...value.cards];
                const decks = acc[factionPrefix] ? [...acc[factionPrefix], value] : [value]
                return {...acc, [factionPrefix]: decks};
            }, {})
            
            const factionsWithMaxSetsCount = Object.entries(groupedByFactions).reduce((acc, [prefix, value]) => {
                return {...acc, [prefix]: {data: value, maxSets: Math.max(...value.map(x => x.sets.length))}}
            }, {});

            console.log(Object.entries(factionsWithMaxSetsCount).reduce((acc, [faction, {data, maxSets}]) => {
                console.log(acc, faction, data, maxSets)
                // const summary = data.reduce((acc, deck) => {
                //     const ratings = deck.cards.reduce((acc, card) => {
                //         return {...acc, [card]: 1}
                //     }, {})

                //     console.log(ratings);

                //     return acc;
                // }, {});

                return acc;
            }, {}));
        });
    }, []);

    return (
        <div>
            Card Rating
        </div>
    )
}

export default CardsRating;