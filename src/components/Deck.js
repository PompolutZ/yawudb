import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { cardTypeIcons, cardType, factions } from '../data/index';
import { getWUCardByIdFromDB } from './WUCard';
import TextField from '@material-ui/core/TextField';

const DeckFaction = ({ faction, defaultName, onChange }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '1rem'
    }}>
        <Avatar className="typeicon headerItem" src={`/assets/icons/${faction}-icon.png`} />
        <TextField
          id="with-placeholder"
          label="Deck name"
          value={`${defaultName}`}
          margin="none"
          style={{width: '100%'}}
          onChange={onChange}
        />
        {/* <Typography variant="title">{`${factions[faction]}`}</Typography> */}
    </div>
);

const CardsTypeCounter = ({ type, count }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}>
        <Avatar className="typeicon headerItem" src={`/assets/icons/${cardTypeIcons[type]}.png`} />
        <Typography variant="title">{`${count}`}</Typography>
    </div>
);

const SectionHeader = ({ type }) => (
    <div style={{borderBottom: '1px solid gray', margin: '0 1rem 1rem 1rem'}}>
        <Typography variant="headline">{`${cardType[type]}s`}</Typography>
    </div>
);

class Deck extends Component {
    state = {
        name: ""
    }

    render() {
        const { cards, faction, onToggleCardInDeck, onSave } = this.props;
        const objectives = cards.filter(v => v.type === 0);
        const ploys = cards.filter(v => v.type === 1);
        const upgrades = cards.filter(v => v.type === 2);
        return (
            <div>
                <DeckFaction faction={faction} defaultName={`${factions[this.props.faction]} Deck`} onChange={e => this.setState({name: e.target.value})} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    maxWidth: '20rem',
                    marginBottom: '1.5rem',
                    marginTop: '1.5rem'
                }}>
                    <CardsTypeCounter type={0} count={objectives.count()} />
                    <CardsTypeCounter type={1} count={ploys.count()} />
                    <CardsTypeCounter type={2} count={upgrades.count()} />
                </div>
                
                <SectionHeader type={0} />
                { 
                    objectives.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, onToggleCardInDeck, true))
                }
                <SectionHeader type={1} />
                {
                    ploys.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, onToggleCardInDeck, true))
                }
                <SectionHeader type={2} />
                {
                    upgrades.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, onToggleCardInDeck, true))
                }
                <div style={{display: 'flex', paddingBottom: '3rem'}}>
                    <Button style={{margin: 'auto'}} onClick={() => onSave(this.state.name)}>
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

export default Deck;