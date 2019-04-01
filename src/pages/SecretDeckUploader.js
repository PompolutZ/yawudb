import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FactionToggle from '../components/FactionToggle';
import { Button } from '@material-ui/core';
import { cardsDb, factionIdPrefix } from '../data/index';
import { Set } from 'immutable';
import { withFirebase } from '../firebase';

const uuid4 = require('uuid/v4');

class SecretDeckUploader extends Component {
    state = {
        name: localStorage.getItem('sdb.name') || '',
        faction: localStorage.getItem('sdb.faction') || 'garreks-reavers',
        source: localStorage.getItem('sdb.source') || '',
        desc: localStorage.getItem('sdb.desc') || '',
        cards: JSON.parse(localStorage.getItem('sdb.cards')) || [],
        sets: JSON.parse(localStorage.getItem('sdb.sets')) || [],
        scoringSummary: JSON.parse(localStorage.getItem('sdb.scoringSummary')) || [],
        tags: JSON.parse(localStorage.getItem('sdb.tags')) || [],
        created: new Date(localStorage.getItem('sdb.created')) || new Date(),
    }
    
    setFaction = faction => {
        this.setState({ faction: faction });
        localStorage.setItem('sdb.faction', faction);
    }

    handleChangeName = name => {
        this.setState({ name: name });
        localStorage.setItem('sdb.name', name);
    }

    handleChangeSource = source => {
        this.setState({ source: source });
        localStorage.setItem('sdb.source', source);
    }

    handleChangeDescription = desc => {
        this.setState({ desc: desc });
        localStorage.setItem('sdb.desc', desc);
    }

    handleChangeCardsList = list => {
        const result = list.split(',').map(x => {
            if(x.startsWith('L')) {
                return '02' + ('000' + x.slice(1)).slice(-3);
            }

            if(x.startsWith('N')) {
                return '03' + ('000' + x.slice(1)).slice(-3);
            }

            return '01' + ('000' + x).slice(-3);
        });

        const sets = new Set(result.map(x => {
            console.log(x, cardsDb[x]);
            return cardsDb[x].set;
        }));
        const objectiveScoringSummary = result.map(x => {
            const { type, scoreType } = cardsDb[x];
            if(type === 0) {
                return scoreType;
            }

            return -1;
        }).reduce((acc, x) => {
            if(x < 0) return acc;
            acc[x] += 1;
            return acc;
        }, [0, 0, 0, 0]);

        console.log('CARDS LIST', result);
        localStorage.setItem('sdb.cards', JSON.stringify(result));

        console.log('CARDS SETS', sets.toJS());
        localStorage.setItem('sdb.sets', JSON.stringify(sets.toJS()));

        console.log('SCORING', objectiveScoringSummary);
        localStorage.setItem('sdb.scoringSummary', JSON.stringify(objectiveScoringSummary));

        this.setState({ cards: result, sets: sets, scoringSummary: objectiveScoringSummary });
    }

    handleChangeTags = tags => {
        const result = tags.split('/').map(s => s.trim());

        console.log('TAGS', result);
        localStorage.setItem('sdb.tags', JSON.stringify(result));

        this.setState({ tags: result });
    }

    handleChangeDate = date => {
        const dateData = date.split('/');
        const created = new Date(dateData[0], dateData[1] - 1, dateData[2]);

        console.log('CREATED', created);
        this.setState({ created: created });
        localStorage.setItem('sdb.created', JSON.stringify(created));
    }

    handleSave = () => {
        console.log(this.state);
        localStorage.removeItem('sdb.name');
        localStorage.removeItem('sdb.source');
        localStorage.removeItem('sdb.desc');
        localStorage.removeItem('sdb.cards');
        localStorage.removeItem('sdb.sets');
        localStorage.removeItem('sdb.scoringSummary');
        localStorage.removeItem('sdb.tags');
        localStorage.removeItem('sdb.created');

        const deckId = `${factionIdPrefix[this.state.faction]}-${uuid4().slice(-12)}`;  
        const deckPayload = {
            name: this.state.name,
            source: this.state.source,
            desc: this.state.desc,
            cards: this.state.cards,
            sets: this.state.sets.toJS(),
            scoringSummary: this.state.scoringSummary,
            tags: this.state.tags,
            created: this.state.created,
            author: 'Anonymous'
        }

        console.log(deckId, deckPayload);
        this.props.firebase.db.collection('decks')
        .doc(deckId)
        .set(deckPayload)
        .then(() => {
            console.log('SAVED!')
        })
        .catch(error => console.log('ERROR', error));    
    }

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap', maxWidth: '40rem', margin: '2rem'}}>
                <FactionToggle selectedFaction={this.state.faction} setFaction={this.setFaction} />
                <TextField
                    id="with-placeholder"
                    label="Deck name"
                    value={this.state.name}
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeName(e.target.value)}
                    />

                <TextField
                    id="with-placeholder"
                    label="Source"
                    value={this.state.source}
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeSource(e.target.value)}
                    />

                <TextField
                    id="with-placeholder"
                    label="Description"
                    value={this.state.desc}
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeDescription(e.target.value)}
                    />

                <TextField
                    id="with-placeholder"
                    label="CardsList"
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeCardsList(e.target.value)}
                    />

                <TextField
                    id="with-placeholder"
                    label="Tags(tag/otherTag)"
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeTags(e.target.value)}
                    />

                <TextField
                    id="with-placeholder"
                    label="Date (yyyy/mm/dd)"
                    margin="none"
                    style={{flex: '1 1 auto'}}
                    onChange={e => this.handleChangeDate(e.target.value)}
                    />

                <Button onClick={this.handleSave}>SAVE</Button>    
            </div>
        );
    }
}

export default withFirebase(SecretDeckUploader);