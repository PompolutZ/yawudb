import React, { PureComponent } from 'react';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';
import { Typography, Button, IconButton, Menu, MenuItem, Paper } from '@material-ui/core';
import { setsIndex, cardTypeIcons, idPrefixToFaction, cardType } from '../data/index';
import AnimateHeight from 'react-animate-height';
import { Set } from 'immutable';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import * as jsPDF from 'jspdf';

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
            alt={cardTypeIcons[type]}
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

class DeckActionsMenu extends PureComponent {
    state = {
        anchorEl: null
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div style={this.props.style}>
                <IconButton style={{ backgroundColor: '#3B9979', color: 'white' }}
                    aria-owns={anchorEl ? 'actions-menu' : undefined }
                    aria-haspopup
                    onClick={this.handleClick}>
                    <MoreVerticalIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.handleExportReddit}>Save as PDF</MenuItem>
                </Menu>
            </div>

        );
    }

    handleExportReddit = () => {
        this.props.onSaveAsPdf();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }
}

class ReadonlyDeck extends PureComponent {
    render() {
        const { name, author, factionId, cards, sets, created } = this.props;
        const objectives = cards.filter(v => v.type === 0).sort((a, b) => a.name.localeCompare(b.name));
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((a, b) => a.name.localeCompare(b.name));
        const upgrades = cards.filter(v => v.type === 2).sort((a, b) => a.name.localeCompare(b.name));
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
                    margin: '1rem',
                }}>
                    <img id="factionDeckIcon" style={{width: '4rem', height: '4rem', margin: '0 .5rem 0 0'}} alt={`${idPrefixToFaction[factionId]}`} src={`/assets/icons/${idPrefixToFaction[factionId]}-deck.png`} />
                    <div style={{flex: '1 1 auto'}}>
                        <div style={{ fontFamily: 'roboto', fontSize: '1rem', fontWeight: 'bold'}}>{name}</div>
                        <div style={{ fontFamily: 'roboto', fontSize: '.7rem', }}>{`${author}${createdDate}`}</div>
                        <div style={{margin: '.2rem 0 0 0'}}>
                            {
                                sets.sort((a, b) => a - b).map(s => <SetIcon key={s * 31}  set={s} />)
                            }
                        </div>
                    </div>
                    <DeckActionsMenu onSaveAsPdf={this._handleSaveAsPdf} />
                </div>
    
                <MiniSectionHeader type={0}>
                    (<ObjectiveScoringOverview objectives={objectiveSummary} />)
                </MiniSectionHeader>
                { 
                    objectives.toJS().map((v, i) => <Card key={i} card={v} /> )//getReadOnlyWUCardByIdFromDb(v.id, v.id.slice(-3), v, i % 2 === 0))
                }
                <div style={{borderBottom: '1px solid gray', margin: '1rem .5rem 1rem .5rem', padding: '0 0 .3rem 0', display: 'flex', alignItems: 'center'}}>
                    <img src={`/assets/icons/${cardTypeIcons[1]}.png`}
                        alt={cardTypeIcons[1]}
                        style={{ margin: '0 0 0 .5rem', width: '1.5rem', height: '1.5rem'}} />
                    {
                        spellsCount > 0 && (
                            <img src={`/assets/icons/${cardTypeIcons[3]}.png`}
                                alt={cardTypeIcons[3]}
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
    }

    _handleSaveAsPdf = () => {
        const { name, author, created, cards } = this.props;
        const objectives = cards.filter(v => v.type === 0).sort((a, b) => a.name.localeCompare(b.name));
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((a, b) => a.name.localeCompare(b.name));
        const upgrades = cards.filter(v => v.type === 2).sort((a, b) => a.name.localeCompare(b.name));

        let doc = new jsPDF();
        doc.addImage(document.getElementById('factionDeckIcon'), 'png', 10, 6, 10, 10);
        doc.setFont('roboto', 'bold');
        doc.setFontSize(10);
        doc.text(name, 25, 10);
        doc.setFont('roboto', 'italic');
        doc.setFontSize(8);
        doc.setDrawColor('#7F0000');
        doc.text(`${author} ${created ? ` | ${created.toLocaleDateString()}` : ''}`, 25, 14);

        let yAxis = 24;
        doc.setFont('roboto', 'bold');
        doc.setFontSize(8);
        doc.text('Objectives (12):', 10, yAxis);
        
        yAxis += 4;
        doc.setFont('roboto', 'thin');
        doc.setFontSize(8);
        doc.setDrawColor('#7F0000');
        
        for(let objective of objectives) {
            doc.text(`${this.idToPrintId(objective.id)}`, 10, yAxis);
            doc.text(`${objective.name}`, 18, yAxis);
            yAxis += 4;
        }

        yAxis += 2;
        doc.setFont('roboto', 'bold');
        doc.setFontSize(8);
        doc.text(`Gambits (${gambits.count()}):`, 10, yAxis);

        yAxis += 4;
        doc.setFont('roboto', 'thin');
        doc.setFontSize(8);
        doc.setDrawColor('#7F0000');
        for(let gambit of gambits) {
            doc.text(`${this.idToPrintId(gambit.id)}`, 10, yAxis);
            doc.text(`${gambit.name}`, 18, yAxis);
            yAxis += 4;
        }

        yAxis += 2;
        doc.setFont('roboto', 'bold');
        doc.setFontSize(8);
        doc.text(`Upgrades (${upgrades.count()}):`, 10, yAxis);

        yAxis += 4;
        doc.setFont('roboto', 'thin');
        doc.setFontSize(8);
        doc.setDrawColor('#7F0000');
        for(let upgrade of upgrades) {
            doc.text(`${this.idToPrintId(upgrade.id)}`, 10, yAxis);
            doc.text(`${upgrade.name}`, 18, yAxis);
            yAxis += 4;
        }

        doc.save(`${name}.pdf`);
    }

    idToPrintId = id => {
        if(id.startsWith('01')) {
            return `${id.slice(-3)}.`;
        }

        if(id.startsWith('02')) {
            return `L${id.slice(-3)}.`;
        }

        if(id.startsWith('03')) {
            return `N${id.slice(-3)}.`;
        }
    }
}

export default ReadonlyDeck;