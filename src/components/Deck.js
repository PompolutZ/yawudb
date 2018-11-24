import React, { Component, PureComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { cardTypeIcons, cardsDb } from '../data/index';
import { Set } from 'immutable';
import { toggleCardInDeck } from './DeckBuiilder/components/CardsLibrary';
import DeckIcon from '../atoms/DeckIcon';
import WUButton from '../atoms/Button';
import WUTextField from '../atoms/WUTextField';
import isEqual from 'lodash/isEqual';
import ExpandableWUCard from '../atoms/ExpandableWUCard';

class CardsTypeCounter extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextProps, this.props);
    }

    render() {
        const { types, counts, isValidCount } = this.props;
        return (
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
    }
}

class SectionHeader extends PureComponent {
    render() {
        return (
            <div style={{borderBottom: '1px solid gray', margin: '0 .5rem 1rem .5rem'}}>
                <Typography variant="headline">
                    { this.props.children }
                </Typography>
            </div>
       );
    }
}

class CardsList extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.list.length !== this.props.list.length;
    }
    render() {
        return (
            <div style={{ margin: '.5rem'}}>
                {
                    this.props.list.map((v, i) => <ExpandableWUCard key={i} {...v} isAlter={i % 2 === 0} toggleCardInDeck={this.props.toggle} inDeck /> )
                }                
            </div>
        );
    }
}

class Deck extends PureComponent {
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
        const objectives = cards.filter(v => v.type === 0).sort((c1, c2) => c1.name.localeCompare(c2.name)).toJS();
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((c1, c2) => c1.name.localeCompare(c2.name)).toJS();
        const upgrades = cards.filter(v => v.type === 2).sort((c1, c2) => c1.name.localeCompare(c2.name)).toJS();
        const objectivesCount = objectives.length;
        const gambitsCount = gambits.length;
        const spellsCount = gambits.filter(v => v.type === 3).length;
        const upgradesCount = upgrades.length;
        const isValidForSave = objectivesCount === 12 && ((gambitsCount + upgradesCount) >= 20);

        return (
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '.5rem'
                }}>
                    <DeckIcon faction={faction} width="3rem" height="3rem" />
                    <WUTextField label="Deck name" value={this.state.name} onValueChange={this.handleChangeName} />
                    {/* <TextField
                        id="with-placeholder"
                        label="Deck name"
                        value={this.state.name}  
                        margin="none"
                        style={{flex: '1 1 auto'}}
                        onChange={this.handleChangeName}
                        /> */}
                    {/* <Typography variant="title">{`${factions[faction]}`}</Typography> */}
                </div>
                <div style={{ display: 'flex', margin: '.5rem' }}>
                    <WUTextField label="Description" value={this.state.desc} onValueChange={this.handleChangeDescription} />
                </div>
                {/* <DeckDescription defaultDescription={this.state.desc} onChange={this.handleChangeDescription} /> */}
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
                
                <SectionHeader>
                    Objectives
                </SectionHeader>
                <CardsList list={objectives} toggle={this._toggleCardInDeck} />
                {/* {

                    objectives.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                } */}
                <SectionHeader>
                    Gambits
                </SectionHeader>
                <CardsList list={gambits} toggle={this._toggleCardInDeck} />

                {/* // <div style={{borderBottom: '1px solid gray', margin: '0 .5rem 1rem .5rem'}}>
                //     <Typography variant="headline"></Typography>
                // </div> */}
                {/* {
                    gambits.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                } */}
                <SectionHeader>
                    Upgrades
                </SectionHeader>
                <CardsList list={upgrades} toggle={this._toggleCardInDeck} />

                {/* {
                    upgrades.toJS().map((v, i) => getWUCardByIdFromDB(v.id, v.id.slice(-3), v, i % 2 === 0, this._toggleCardInDeck.bind(this, v.id), true))
                } */}
                {
                    !this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '5rem'}}>
                            <WUButton style={{margin: 'auto', color: 'red'}} onClick={onRemoveAll}>
                                Remove all
                            </WUButton>
                            <WUButton style={{margin: 'auto'}} disabled={!isValidForSave} onClick={onSave}>
                                Save
                            </WUButton>
                        </div>
                    )
                }
                {
                    this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '5rem'}}>
                            <WUButton style={{margin: 'auto', color: 'red'}} onClick={onCancel}>
                                Cancel
                            </WUButton>
                            <WUButton style={{margin: 'auto'}} disabled={!isValidForSave} onClick={onUpdate}>
                                Update
                            </WUButton>
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