import React, { Component, PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { cardsDb, restrictedCards, factionIdPrefix, bannedCards } from '../data/index';
import { Set } from 'immutable';
// import { toggleCardInDeck } from './DeckBuiilder/components/CardsLibrary';
import DeckIcon from '../atoms/DeckIcon';
import WUButton from '../atoms/Button';
import WUTextField from '../atoms/WUTextField';
import ExpandableWUCard from '../atoms/ExpandableWUCard';
import ScoringOverview from '../atoms/ScoringOverview';
import { connect } from 'react-redux';

class SectionHeader extends PureComponent {
    render() {
        return (
            <div style={{borderBottom: '1px solid gray', margin: '0 .5rem 1rem .5rem'}}>
                <Typography variant="h6">
                    { this.props.children }
                </Typography>
            </div>
       );
    }
}

class CardsList extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.list.length !== this.props.list.length ||
            nextProps.restrictedCardsCount !== this.props.restrictedCardsCount;
    }
    render() {
        return (
            <div style={{ }}>
                {
                    this.props.list.map((props, i) => 
                        <ExpandableWUCard {...props} 
                            withAnimation inDeck
                            key={i}
                            restrictedCardsCount={this.props.restrictedCardsCount}
                            isRestricted={this.props.isEligibleForOP && Boolean(restrictedCards[props.id])}
                            isBanned={this.props.isEligibleForOP && Boolean(bannedCards[props.id])} 
                            isAlter={i % 2 === 0} 
                            toggleCardInDeck={this.props.toggle} 
                            editMode={this.props.editMode}
                            /> )
                }                
            </div>
        );
    }
}

class Deck extends PureComponent {
    state = {
        name: this.props.currentName,
        source: this.props.currentSource,
        desc: this.props.currentDescription,
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
        const { faction, onSave, onRemoveAll, onCancel, onUpdate, editMode, deckPlayFormat } = this.props;
        const objectivesCount = editMode ? this.props.editObjectivesCount : this.props.objectivesCount;
        const gambitsCount = editMode ? this.props.editGambitsCount : this.props.gambitsCount;
        const upgradesCount = editMode ? this.props.editUpgradesCount : this.props.upgradesCount;
        
        const strippedFaction = faction.startsWith('n_') ? faction.substr(2) : faction;
        const factionPrefix = factionIdPrefix[strippedFaction];
        console.log(factionPrefix);
        const cards = new Set(this.props.selectedCards.map(id => {
            const universalRank = this.props.cardsRanking && this.props.cardsRanking['universal'][id] ? this.props.cardsRanking['universal'][id] : 0;
            const rank = this.props.cardsRanking && this.props.cardsRanking[factionPrefix] && this.props.cardsRanking[factionPrefix][id] ? this.props.cardsRanking[factionPrefix][id] * 10000 : universalRank;

            return {id: id, ...cardsDb[id], ranking: rank };
        }));
        
        const objectives = cards.filter(v => v.type === 0).sort((c1, c2) => c1.id - c2.id).toJS(); //c1.name.localeCompare(c2.name)
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((c1, c2) => c1.id - c2.id).toJS();
        const upgrades = cards.filter(v => v.type === 2).sort((c1, c2) => c1.id - c2.id).toJS();
        const surgesCount = objectives.filter(x => x.scoreType === 0).length;
        const isValidForSave = deckPlayFormat === 'open' ? objectivesCount === 12 && (gambitsCount + upgradesCount) >= 20 : objectivesCount === 12 && (gambitsCount + upgradesCount) >= 20 && surgesCount < 7;
        const isObjectiveCardsSectionValid = deckPlayFormat === 'open' ? objectivesCount === 12 : objectivesCount === 12 && surgesCount < 7;
        const isPowerCardsSectionValid = gambitsCount + upgradesCount >= 20 && (gambitsCount <= upgradesCount);

        const objectiveSummary = objectives.reduce((acc, c) => {
            acc[c.scoreType] += 1;
            return acc;
        }, [0, 0, 0, 0]);

        const totalGlory = objectives.reduce((acc, c) => acc + Number(c.glory), 0);
        return (
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '.5rem'
                }}>
                    <DeckIcon faction={faction} width="3rem" height="3rem" />
                    <WUTextField label="Deck name" value={this.state.name} onValueChange={this.handleChangeName} />
                </div>
                <div style={{ display: 'flex', margin: '.5rem' }}>
                    <WUTextField label="Description" value={this.state.desc} onValueChange={this.handleChangeDescription} />
                </div>

                <div style={{ background: isObjectiveCardsSectionValid ? 'rgba(0, 255, 0, .1)' : 'rgba(255, 0, 0, .2)', padding: '.5rem 0 .5rem 0', marginBottom: '.2rem'}}>
                    <SectionHeader>
                        <div style={{ display: 'flex'}}>
                            <div style={{ marginRight: '.3rem'}}>{objectivesCount} Objectives</div>
                            <ScoringOverview summary={objectiveSummary} glory={totalGlory} />
                        </div>
                        {
                            !isObjectiveCardsSectionValid && (
                                <div>
                                    <Typography style={{ color: 'darkred'}}>- You must have exactly 12 objective cards.</Typography>
                                    <Typography style={{ color: 'darkred'}}>{deckPlayFormat !== 'open' && surgesCount > 6 ? '- You cannot have more than 6 Surge (score immediately) cards' : ''}</Typography>
                                </div>
                            )
                        }
                    </SectionHeader>
                    <CardsList editMode={editMode} isEligibleForOP={this.props.isEligibleForOP} list={objectives} toggle={this._toggleCardInDeck} />
                </div>                

                <div style={{ background: isPowerCardsSectionValid ? 'rgba(0, 255, 0, .1)' : 'rgba(255, 0, 0, .2)', padding: '.5rem 0 .5rem 0', marginBottom: '.2rem'}}>
                    <SectionHeader>
                        <div>
                            <div>{gambitsCount} Gambits</div>
                            {
                                gambitsCount + upgradesCount < 20 && (
                                    <Typography style={{ color: 'darkred'}}>- You must have at least 20 power cards. Power cards are ploys, gambit spells and upgrades.</Typography>
                                )
                            }
                            {
                                gambitsCount > upgradesCount && (
                                    <Typography style={{ color: 'darkred'}}>- You cannot have more gambit cards than upgrade cards.</Typography>
                                )
                            }
                        </div>
                    </SectionHeader>
                    <CardsList editMode={editMode} isEligibleForOP={this.props.isEligibleForOP} list={gambits} toggle={this._toggleCardInDeck} />
                </div>
                
                <div style={{ background: isPowerCardsSectionValid ? 'rgba(0, 255, 0, .1)' : 'rgba(255, 0, 0, .2)', padding: '.5rem 0 .5rem 0'}}>
                    <SectionHeader>
                        <div>
                            <div>{upgradesCount} Upgrades</div>
                            {
                                gambitsCount + upgradesCount < 20 && (
                                    <Typography style={{ color: 'darkred'}}>- You must have at least 20 power cards. Power cards are ploys, spells and upgrades.</Typography>
                                )
                            }
                        </div>

                    </SectionHeader>
                    <CardsList editMode={editMode} isEligibleForOP={this.props.isEligibleForOP} list={upgrades} toggle={this._toggleCardInDeck} />
                </div>            
                {
                    !this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '10rem'}}>
                            <WUButton style={{margin: 'auto', color: 'red'}} onClick={onRemoveAll}>
                                Remove all
                            </WUButton>
                            {
                                this.props.isAuth && (
                                    <WUButton style={{margin: 'auto'}} onClick={onSave} args={{isDraft: !isValidForSave}}>
                                        { isValidForSave ? 'Save' : 'Save Draft' }
                                    </WUButton>
                                )
                            }
                            {
                                !this.props.isAuth && (
                                    <WUButton style={{margin: 'auto'}} disabled={!isValidForSave} onClick={onSave} args={{isDraft: !isValidForSave}}>
                                        Save
                                    </WUButton>
                                )
                            }
                        </div>
                    )
                }
                {
                    this.props.editMode && (
                        <div style={{display: 'flex', paddingBottom: '10rem'}}>
                            <WUButton style={{margin: 'auto', color: 'red'}} onClick={onCancel}>
                                Cancel
                            </WUButton>
                            <WUButton style={{margin: 'auto'}} onClick={onUpdate} args={{isDraft: !isValidForSave}}>
                            { isValidForSave ? 'Update' : 'Update Draft' }
                            </WUButton>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cardsRanking: state.cardLibraryFilters.cardsRanking,

        isEligibleForOP: state.cardLibraryFilters.eligibleForOP,
        deckPlayFormat: state.cardLibraryFilters.deckPlayFormat,
        restrictedCardsCount: state.deckUnderBuild.restrictedCardsCount,
        objectivesCount: state.deckUnderBuild.objectivesCount,
        gambitsCount: state.deckUnderBuild.gambitsCount,
        upgradesCount: state.deckUnderBuild.upgradesCount,

        editRestrictedCardsCount: state.deckUnderEdit.restrictedCardsCount,
        editObjectivesCount: state.deckUnderEdit.objectivesCount,
        editGambitsCount: state.deckUnderEdit.gambitsCount,
        editUpgradesCount: state.deckUnderEdit.upgradesCount,
    }
}

export default connect(mapStateToProps, null)(Deck);