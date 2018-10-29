import React, { PureComponent } from 'react';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';
import { Typography } from '@material-ui/core';
import { setsIndex, cardTypeIcons, idPrefixToFaction, cardType } from '../data/index';
import AnimateHeight from 'react-animate-height';
import { Set } from 'immutable';


const SetIcon = ({ set }) => (
    <img style={{margin: 'auto .1rem', width: '1.2rem', height: '1.2rem'}} src={`/assets/icons/${setsIndex[set]}-icon.png`} alt="icon" />
)

const ObjectiveScoringOverview = ({ objectives }) => {
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        <div style={{ order: 0}}>
          { objectives[0] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
              <ObjectiveScoreTypeIcon type={0} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[0]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 1}}>
          { objectives[3] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={3} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[3]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 2}}>
          { objectives[1] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={1} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[1]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 3}}>
          { objectives[2] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={2} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[2]}</Typography>
            </div>
          )}
        </div>
      </div>
    );
}

const MiniSectionHeader = ({ type, children }) => (
    <div style={{borderBottom: '1px solid gray', margin: '1rem .5rem 1rem .5rem', padding: '0 0 .3rem 0', display: 'flex', alignItems: 'center'}}>
        <img src={`/assets/icons/${cardTypeIcons[type]}.png`}
            style={{ margin: '0 .3rem 0 .5rem', width: '1.5rem', height: '1.5rem'}} />
        <div style={{ fontFamily: 'roboto', fontSize: '1.2rem', margin: '0 .3rem 0 0'}}>
            {`${cardType[type]}s`}
        </div>
        <div style={{ display: 'flex', margin: '0 0 0 0'}}>
            { children }
        </div>
    </div>
);

class Card extends PureComponent {
    state = {
        expanded: false
    }

    render() {
        const { card } = this.props;
        const animateHeight = this.state.expanded ? 'auto' : 0;

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 .5rem 1rem' }}
                    onClick={this._toggleExpanded}>
                    <SetIcon set={card.set} />
                    <div><u>{card.name}</u></div>
                    {
                        card.glory && (
                            <div>({card.glory})</div>                        
                        )
                    }
                    {
                        card.scoreType >= 0 && (
                            <ObjectiveScoreTypeIcon type={card.scoreType} style={{width: '.8rem', height: '.8rem'}} />
                        )
                    }
                </div>
                <AnimateHeight
                    height={animateHeight}
                    duration={250}
                    easing="ease-out">
                    <img className="card" src={`/assets/cards/${card.id}.png`} alt={card.id} style={{ width: '90%', margin: 'auto' }} />
                </AnimateHeight>
            </div>
        );
    }

    _toggleExpanded = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }
}

const ReadonlyDeck = ({ name, author, factionId, cards, sets, created, scoringSummary }) => {
    const objectives = cards.filter(v => v.type === 0);
    const gambits = cards.filter(v => v.type === 1 || v.type === 3);
    const upgrades = cards.filter(v => v.type === 2);
    const spellsCount = gambits.filter(v => v.type === 3).count();

    const createdDate = created ? ` | ${created.toLocaleDateString()}` : '';
    const objectiveSummary = new Set(objectives).groupBy(c => c.scoreType).reduce((r, v, k) => {
        r[k] = v.count();
        return r;
    }, [0, 0, 0, 0]);

    return (    
        <div style={{}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '1rem'
            }}>
                <img style={{width: '4rem', height: '4rem', margin: '0 .5rem 0 0'}} alt={`${idPrefixToFaction[factionId]}`} src={`/assets/icons/${idPrefixToFaction[factionId]}-icon.png`} />
                <div>
                    <div style={{ fontFamily: 'roboto', fontSize: '1rem', fontWeight: 'bold'}}>{name}</div>
                    <div style={{ fontFamily: 'roboto', fontSize: '.7rem', }}>{`${author}${createdDate}`}</div>
                    <div style={{margin: '.2rem 0 0 0'}}>
                        {
                            sets.sort((a, b) => a - b).map(s => <SetIcon key={s * 31}  set={s} />)
                        }
                    </div>
                </div>
            </div>


            {/* <div style={{
                display: 'flex',
                maxWidth: '20rem',
                margin: '1rem'
            }}>
                <CardsTypeCounter types={[0]} counts={[objectivesCount]} isValidCount />
                <CardsTypeCounter types={[1, 3]} counts={[gambitsCount - spellsCount, spellsCount]} isValidCount />
                <CardsTypeCounter types={[2]} counts={[upgradesCount]} isValidCount />
            </div> */}
            
            <MiniSectionHeader type={0}>
                (<ObjectiveScoringOverview objectives={objectiveSummary} />)
            </MiniSectionHeader>
            { 
                objectives.toJS().map((v, i) => <Card key={i} card={v} /> )//getReadOnlyWUCardByIdFromDb(v.id, v.id.slice(-3), v, i % 2 === 0))
            }
            <div style={{borderBottom: '1px solid gray', margin: '1rem .5rem 1rem .5rem', padding: '0 0 .3rem 0', display: 'flex', alignItems: 'center'}}>
                <img src={`/assets/icons/${cardTypeIcons[1]}.png`}
                    style={{ margin: '0 0 0 .5rem', width: '1.5rem', height: '1.5rem'}} />
                {
                    spellsCount > 0 && (
                        <img src={`/assets/icons/${cardTypeIcons[3]}.png`}
                        style={{ margin: '0 .3rem 0 .3rem', width: '1.5rem', height: '1.5rem'}} />
                    )                    
                }
                <div style={{ fontFamily: 'roboto', fontSize: '1.2rem', margin: '0 .3rem 0 .3rem'}}>
                    {`Gambits`}
                </div>
            </div>
            {
                gambits.toJS().map((v, i) => <Card key={i} card={v} /> )//getReadOnlyWUCardByIdFromDb(v.id, v.id.slice(-3), v, i % 2 === 0))
            }
            <MiniSectionHeader type={2} />
            {
                upgrades.toJS().map((v, i) => <Card key={i} card={v} /> )//getReadOnlyWUCardByIdFromDb(v.id, v.id.slice(-3), v, i % 2 === 0))
            }
        </div>
    );        
};

export default ReadonlyDeck;