import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { cardTypeIcons, cardType, cardsDb } from '../data/index';
import { getWUCardByIdFromDB } from './WUCard';
import TextField from '@material-ui/core/TextField';
import { Set } from 'immutable';
import { toggleCardInDeck } from './DeckBuiilder/components/CardsLibrary';

const DeckFaction = ({ faction, defaultName, onChange }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '.5rem'
    }}>
        <Avatar style={{margin: '0 1rem 0 2rem'}} src={`/assets/icons/${faction}-icon.png`} />
        <TextField
          id="with-placeholder"
          label="Deck name"
          value={defaultName}  
          margin="none"
          style={{flex: '1 1 auto'}}
          onChange={onChange}
        />
        {/* <Typography variant="title">{`${factions[faction]}`}</Typography> */}
    </div>
);

const DeckDescription = ({ onChange, defaultDescription }) => (
    <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        margin: '.5rem',
    }}>
        <TextField
          id="with-placeholder"
          label="Description"
          value={defaultDescription}
          margin="none"
          style={{flex: '1 1 auto'}}
          onChange={onChange}
        />
    </div>
);

const CardsTypeCounter = ({ types, counts, isValidCount }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '2rem'
    }}>
        { types.map((t, i) => {
            if(counts[i] >= 0) {
                return <Avatar key={t} style={{marginRight: '.5rem'}} src={`/assets/icons/${cardTypeIcons[t]}.png`} />;
            }

            return <span key={t}></span>;
        })}
        <Typography variant="title" color={isValidCount ? 'default' : 'error'}>{`${counts.reduce((total, num) => total + num)}`}</Typography>
    </div>
);

const SectionHeader = ({ type }) => (
    <div style={{borderBottom: '1px solid gray', margin: '0 .5rem 1rem .5rem'}}>
        <Typography variant="headline">{`${cardType[type]}s`}</Typography>
    </div>
);

class Deck extends Component {
    state = {
        name: this.props.currentName,
        source: this.props.currentSource,
        desc: this.props.currentDescription
    }

    handleChangeName = e => {
        this.setState({ name: e.target.value });

        if(this.changeNameTimeout) {
            clearTimeout(this.changeDescTimeout);
        }

        this.changeNameTimeout = setTimeout(() => this.props.changeName(this.state.name), 250);
    }

    handleChangeSource = e => {
        this.props.changeSource(e.target.value);
        this.setState({ source: e.target.value });
    }

    handleChangeDescription = e => {
        this.setState({ desc: e.target.value });

        if(this.changeDescTimeout) {
            clearTimeout(this.changeDescTimeout);
        }

        this.changeDescTimeout = setTimeout(() => this.props.changeDescription(this.state.desc), 250);
    }

    render() {
        const { selectedCards, faction, onSave, onRemoveAll, onCancel, onUpdate } = this.props;
        
        const cards = new Set(selectedCards.map(id => ({id: id, ...cardsDb[id] })));
        const objectives = cards.filter(v => v.type === 0);
        const gambits = cards.filter(v => v.type === 1 || v.type === 3);
        const upgrades = cards.filter(v => v.type === 2);
        const objectivesCount = objectives.count();
        const gambitsCount = gambits.count();
        const spellsCount = gambits.filter(v => v.type === 3).count();
        const upgradesCount = upgrades.count();
        const isValidForSave = objectivesCount === 12 && ((gambitsCount + upgradesCount) >= 20);

        return (
            <div>
                <DeckFaction faction={faction.startsWith('n_') ? faction.slice(2) : faction} defaultName={this.state.name} onChange={this.handleChangeName} />
                <DeckDescription defaultDescription={this.state.desc} onChange={this.handleChangeDescription} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginBottom: '1.5rem',
                    marginTop: '1.5rem'
                }}>
                    <CardsTypeCounter types={[0]} counts={[objectivesCount]} isValidCount={objectivesCount === 12} />
                    <CardsTypeCounter types={[1, 3]} counts={[gambitsCount - spellsCount, spellsCount]} isValidCount={(gambitsCount + upgradesCount) >= 20} />
                    <CardsTypeCounter types={[2]} counts={[upgradesCount]} isValidCount={(gambitsCount + upgradesCount) >= 20} />
                </div>
                
                <SectionHeader type={0} />
                { 
                    objectives.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                }
                <div style={{borderBottom: '1px solid gray', margin: '0 .5rem 1rem .5rem'}}>
                    <Typography variant="headline">Gambits</Typography>
                </div>
                {
                    gambits.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                }
                <SectionHeader type={2} />
                {
                    upgrades.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                }
                {
                    !this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '5rem'}}>
                            <Button style={{margin: 'auto', color: 'red'}} onClick={onRemoveAll}>
                                Remove all
                            </Button>
                            <Button style={{margin: 'auto'}} disabled={!isValidForSave} onClick={onSave}>
                                Save
                            </Button>
                        </div>
                    )
                }
                {
                    this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '5rem'}}>
                            <Button style={{margin: 'auto', color: 'red'}} onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button style={{margin: 'auto'}} disabled={!isValidForSave} onClick={onUpdate}>
                                Update
                            </Button>
                        </div>
                    )
                }
            </div>
        );
    }

    _toggleCardInDeck = id => {
        toggleCardInDeck(id, this.props.selectedCards, this.props.addCard, this.props.removeCard);
    }
}
export default Deck;