import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable'
import { cardsDb, setsIndex, bannedCards, restrictedCards } from '../data/index';
import keys from 'lodash/keys';
import { Typography, CircularProgress } from '@material-ui/core';
import { pickCardColor } from '../utils/functions';
import Card from '../atoms/StatisticsCard';

class Statistics extends Component {
    state = {
        loading: false,
        decksCount: 0,
        cards: [],
        sets: []
    }

    componentDidMount = async () => {
        this.setState({loading: true});
        let data = [];
        let decksCount = 0;
        const query = await db.collection('decks').where('tags', 'array-contains', '1st place').where('created', '>=', new Date('2018-11-14')).get();
        query.forEach(doc => {
            data = [...data, ...doc.data().cards];
            decksCount++;
        });

        let cardsWithWeight = new List(data)
            .groupBy(x => x)
            .mapEntries(([k, v]) => [k, v.count()])
            .filter((_, k) => {
                if(k.startsWith('01')) {
                    return k.slice(-3) >= '233';
                };

                if(k.startsWith('02')) {
                    return k.slice(-3) >= '017';
                }

                if(k.startsWith('03')) {
                    return k.slice(-3) >= '294';
                }

                return false;
            })
            .map((v, k) => ({id: k, weight: v}))
            .sort((v1, v2) => v2.weight - v1.weight)
            .toArray();
        
        let setsWithWeight = cardsWithWeight.map(c => {
            const card = cardsDb[c.id];
            return ({set: card.set, weight: c.weight});
        }).reduce((acc, x) => {
            acc[x.set] += x.weight;
            return acc;
        }, keys(setsIndex).fill(0));

        this.setState({
            loading: false,
            cards: cardsWithWeight.map(c => ({id: c.id, name: cardsDb[c.id].name, set: cardsDb[c.id].set, weight: c.weight})),
            sets: setsWithWeight,
            decksCount: decksCount
        });
    }

    render() {
        return (
            <div style={{margin: '.5rem'}}>
                <Typography style={{marginBottom: '1rem'}}>
                    This page shows the statistics of cards and sets popularity based upon all decks 
                    which <b>won</b> in tournaments since the addition of Banned and Restricted list.
                </Typography>
                <Typography style={{marginBottom: '1rem'}}>{`Total amount of decks in the statistics: ${this.state.decksCount}`}</Typography>
                <Typography variant="title" style={{marginBottom: '.5rem'}}>{`Sets popularity:`}</Typography>
                <div style={{display: 'flex', flexFlow: 'row wrap', marginLeft: '1rem', marginBottom: '.5rem'}}>
                {
                    this.state.loading && (
                        <div style={{display: 'flex', margin: 'auto'}}>
                            <CircularProgress style={{color: '#3B9979'}} />
                        </div>
                    ) 
                }
                {
                    this.state.sets.map((s, i) => <SetWeight key={i} set={i} weight={s} />)
                }
                </div>
                <Typography variant="body1" color="textSecondary" style={{marginBottom: '1rem'}}>
                    Image size of the set corresponds to it's weight, which is weight of all cards belonging to this set.
                    <br />
                    Card weight stands for how many decks contains that card.
                </Typography>
                <Typography variant="title" style={{marginBottom: '.5rem'}}>{`Cards popularity:`}</Typography>
                <Typography color="textSecondary" style={{marginBottom: '.5rem'}}>
                    Percentage next to the card shows the percentage of decks which includes that card.
                </Typography>
                <Typography style={{marginBottom: '.5rem', color: pickCardColor(Object.keys(bannedCards)[0])}}>
                    Note! Cards marked with this color are in the banned list for Organized Play. 
                    You cannot include banned cards in your decks for Organized Play anymore.
                </Typography>
                <Typography style={{marginBottom: '.5rem', color: pickCardColor(Object.keys(restrictedCards)[0])}}>
                    Note! Cards marked with this color are in the restricted list for Organized Play. 
                    You can have only up to 5 restricted cards in your decks for Organized Play.
                </Typography>
                <div style={{marginLeft: '1rem', marginRight: '1rem'}}>
                {
                    this.state.loading && (
                        <div style={{display: 'flex'}}>
                            <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                                <CircularProgress style={{color: '#3B9979'}} />
                            </div>
                        </div>
                    ) 
                }
                {
                    this.state.cards.map(c => <Card key={c.id} id={c.id} name={c.name} set={c.set} percentage={c.weight / this.state.decksCount} />)
                }
                </div>
            </div>
        );
    }
}

const SetWeight = ({ set, weight}) => (
    <div>
        <img 
            src={`/assets/icons/${setsIndex[set]}-icon.png`} 
            alt={`${setsIndex[set]}`} 
            style={{marginRight: '.5rem', width: `${2 + (weight / 100)}rem`, height: `${2 + (weight / 100)}rem`}} />
    </div>
);

export default Statistics;