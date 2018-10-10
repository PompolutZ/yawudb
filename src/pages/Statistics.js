import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable'
import { cardsDb, setsIndex } from '../data/index';
import * as _ from 'lodash';
import { Typography, CircularProgress } from '@material-ui/core';
import AnimateHeight from 'react-animate-height';

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
        const query = await db.collection('decks').where('tags', 'array-contains', '1st place').get();
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
        }, _.keys(setsIndex).fill(0));

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
                    which <b>won</b> in tournaments since the release of <b>Warhammer Underworlds: Shadespire</b>.
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

class Card extends Component {
    state = {
        isExpanded: false
    }

    render() {
        const {id, name, set, percentage} = this.props;
        const animateHeight = this.state.isExpanded ? 'auto' : 0;
        return (
            <div style={{display: 'flex', flexFlow: 'column wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
                    <img src={`/assets/icons/${setsIndex[set]}-icon.png`} alt={`${setsIndex[set]}`} width="24" height="24" style={{marginRight: '.5rem'}} />
                    <Typography variant="body2" 
                        color="default" 
                        style={{marginRight: '.5rem', fontSize: `${0.5 + percentage}rem`}}
                        onClick={() => this.setState(state => ({isExpanded: !state.isExpanded}))}>
                        <u>{`${name}`}</u>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{fontSize: `${0.5 + percentage}rem`}}>{`${percentage * 100}%`}</Typography>
                </div>
                <AnimateHeight
                    height={animateHeight}
                    duration={250}
                    easing="ease-out">
                    <img src={`/assets/cards/${id}.png`} alt={id} style={{width: '100%'}} />
                </AnimateHeight>
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