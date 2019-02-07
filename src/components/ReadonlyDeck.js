import React, { PureComponent } from 'react';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { setsIndex, cardTypeIcons, idPrefixToFaction, cardType, totalCardsPerWave, factions } from '../data/index';
import { pickCardColor } from '../utils/functions';
import AnimateHeight from 'react-animate-height';
import { Set } from 'immutable';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import DeckIcon from '../atoms/DeckIcon';
import { withStyles } from '@material-ui/core/styles';
import SetsList from '../atoms/SetsList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_EDIT_MODE_SETS } from '../reducers/cardLibraryFilters';
import ScoringOverview from '../atoms/ScoringOverview';
import Divider from '@material-ui/core/Divider';
import { EDIT_ADD_CARD, EDIT_DECK_NAME, EDIT_DECK_DESCRIPTION, EDIT_FACTION, EDIT_RESET_DECK } from '../reducers/deckUnderEdit';

const SetIcon = ({ id, set }) => (
    <img id={id} style={{margin: 'auto .1rem', width: '1.2rem', height: '1.2rem'}} src={`/assets/icons/${setsIndex[set]}-icon.png`} alt="icon" />
)

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

const cardStyles = theme => ({
    img: {
        width: '90%',
        margin: '.5rem 5%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '20rem'
        }
    }
});

class Card extends PureComponent {
    state = {
        expanded: false
    }

    render() {
        const { card, classes } = this.props;
        const animateHeight = this.state.expanded ? 'auto' : 0;

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 .5rem 1rem' }}
                    onClick={this._toggleExpanded}>
                    <SetIcon id={`${card.id}`} set={card.set} />
                    <div style={{ color: pickCardColor(card.id)}}><u>{card.name}</u></div>
                    {
                        card.glory && (
                            <div style={{ marginLeft: '.3rem'}}>({card.glory})</div>                        
                        )
                    }
                    {
                        card.scoreType >= 0 && (
                            <ObjectiveScoreTypeIcon type={card.scoreType} style={{width: '.8rem', height: '.8rem'}} />
                        )
                    }
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '.3rem', color: 'gray', fontSize: '.7rem'}}>
                        <div>(</div>
                        { idToPrintId(card.id) }
                        <img id={idToPrintId(card.id)} alt={`wave-${card.id.substr(0,2)}`} src={`/assets/icons/wave-${card.id.substr(0,2)}-icon.png`} 
                            style={{ width: '.7rem', height: '.7rem'}} />
                        <div>)</div>
                    </div>
                </div>
                <AnimateHeight
                    height={animateHeight}
                    duration={250}
                    easing="ease-out">
                    <img className={classes.img} src={`/assets/cards/${card.id}.png`} alt={card.id} />
                </AnimateHeight>
            </div>
        );
    }

    _toggleExpanded = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }
}

const StyledCard = withStyles(cardStyles)(Card);

class DeckActionsMenu extends PureComponent {
    state = {
        anchorEl: null
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div style={this.props.style}>
                <IconButton 
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
                    {
                        this.props.canUpdateOrDelete && (
                            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        )
                    }
                    <MenuItem onClick={this.handleExportToTextFile}>
                        <a id="deckTextLink" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Text</a>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToPdf}>Download as PDF</MenuItem>
                    {
                        this.props.canUpdateOrDelete && (
                            <div>
                                <Divider />
                                <MenuItem onClick={this.handleDelete} style={{ color: 'darkred' }}>Delete</MenuItem>
                            </div>
                        )
                    }
                </Menu>
            </div>

        );
    }

    handleEdit = () => {
        this.props.onEdit();
        this.handleClose();
    }

    handleDelete = () => {
        this.props.onDelete();
        this.handleClose();
    }

    handleExportToPdf = () => {
        this.props.onSaveAsPdf();
        this.handleClose();
    }

    handleExportToTextFile = () => {
        this.props.onSaveText(document.getElementById('deckTextLink'));
        this.handleClose();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }
}

const idToPrintId = id => {
    const wavePrefix = id.substr(0, 2);
    return `${id.slice(-3)}/${totalCardsPerWave[parseInt(wavePrefix, 10)]}`;
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        }
    }
});

class ReadonlyDeck extends PureComponent {
    render() {
        const { classes, name, author, factionId, cards, sets, created } = this.props;
        const objectives = cards.filter(v => v.type === 0).sort((a, b) => a.name.localeCompare(b.name));
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((a, b) => a.name.localeCompare(b.name));
        const upgrades = cards.filter(v => v.type === 2).sort((a, b) => a.name.localeCompare(b.name));
        const spellsCount = gambits.filter(v => v.type === 3).count();
    
        const createdDate = created ? ` | ${new Date(created).toLocaleDateString()}` : '';
        const objectiveSummary = new Set(objectives).groupBy(c => c.scoreType).reduce((r, v, k) => {
            r[k] = v.count();
            return r;
        }, [0, 0, 0, 0]);

        const totalGlory = objectives.reduce((acc, c) => acc + c.glory, 0);
        return (    
            <div className={classes.root}>
                <div style={{
                    display: 'flex',
                    margin: '0 0 0 .5rem',
                }}>
                    <DeckIcon width="4rem" height="4rem" faction={idPrefixToFaction[factionId]} />
                    <div style={{flex: '1 1 auto'}}>
                        <div style={{ fontFamily: 'roboto', fontSize: '1rem', fontWeight: 'bold'}}>{name}</div>
                        <div style={{ fontFamily: 'roboto', fontSize: '.7rem', }}>{`${author}${createdDate}`}</div>
                        <div style={{margin: '.2rem 0 0 0'}}>
                            {
                                <SetsList sets={sets} />
                            }
                        </div>
                    </div>
                    <DeckActionsMenu onSaveAsPdf={this._handleSaveAsPdf}
                        onSaveText={this._handleSaveText} 
                        canUpdateOrDelete={this.props.canUpdateOrDelete} 
                        onEdit={this.props.onEdit}
                        onDelete={this.props.onDelete} />
                </div>
    
                <MiniSectionHeader type={0}>
                    <div style={{ display: 'flex'}}>
                        <div style={{ display: 'flex'}}>
                            <ScoringOverview summary={objectiveSummary} glory={totalGlory} />
                        </div>
                    </div>
                </MiniSectionHeader>
                { 
                    objectives.toJS().map((v, i) => <StyledCard key={i} card={v} /> )
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
                    gambits.toJS().map((v, i) => <StyledCard key={i} card={v} /> )
                }
                <MiniSectionHeader type={2} />
                {
                    upgrades.toJS().map((v, i) => <StyledCard key={i} card={v} /> )
                }
                {/* for pdf export */}
                <div id="pdf-export-elements" style={{ position: 'fixed', left: 50000, top: 0, zIndex: 100}}>
                    <img id="factionDeckIcon" src={`/assets/icons/${idPrefixToFaction[factionId]}-deck.png`} alt="factionDeckIcon" />
                    <img id="wave-01" src={`/assets/icons/wave-01-icon.png`} alt="wave-01" />
                    <img id="wave-02" src={`/assets/icons/wave-02-icon.png`} alt="wave-02" />
                    <img id="wave-03" src={`/assets/icons/wave-03-icon.png`} alt="wave-03" />
                    <div id="textMeasureContainer" style={{ display: 'inline-flex', backgroundColor: 'magenta', flexFlow: 'column', width: 'auto'}}>
                        {
                            cards.map(c => {
                                return <div key={`card-${c.id}`} style={{ fontFamily: 'Helvetica', fontSize: '.5rem', width: 'auto'}} id={`card-${c.id}`}>{c.type === 0 ? ` - ${c.name} (${c.glory})` : `- ${c.name}`}</div>
                            })
                            
                        }
                    </div>
                    <div id="cardNumberMeasurer" style={{ display: 'inline-flex', backgroundColor: 'magenta', flexFlow: 'column', fontFamily: 'Helvetica', fontSize: '.5rem'}}>
                        000/000
                    </div>
                </div>
            </div>
        );        
    }

    _handleSaveAsPdf = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const { name, author, created, cards } = this.props;
            const objectives = cards.filter(v => v.type === 0).sort((a, b) => a.name.localeCompare(b.name));
            const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((a, b) => a.name.localeCompare(b.name));
            const upgrades = cards.filter(v => v.type === 2).sort((a, b) => a.name.localeCompare(b.name));
    
            let doc = new jsPDF({
                unit: 'px'
            });
    
            let docX = 10;
            let docY = 10;
            const rem = 16;
            doc.addImage(document.getElementById('factionDeckIcon'), 'png', docX, docY, rem * 1.5, rem * 1.5, '', 'SLOW');
            
            // Header
            docX = docX + rem * 2;
            docY = docY + 10;
            doc.setFont('Helvetica', '');
            doc.setFontSize(rem);
            doc.text(name, docX, docY);
            doc.setFontSize(rem * .5);
            docY = docY + (rem * .5);
            doc.setTextColor('#BCBDC0');
            doc.text(`${author} ${created ? ` | ${new Date(created).toLocaleDateString()}` : ''}`, docX, docY);
    
            let coords = this.addToPdf(doc, 'Objectives (12):', objectives, docX, docY, rem);
            coords = this.addToPdf(doc, `Gambits (${gambits.count()}):`, gambits, coords.x, coords.y, rem);
            this.addToPdf(doc, `Upgrades (${upgrades.count()}):`, upgrades, coords.x, coords.y, rem);
    
            doc.save(`${name}.pdf`);
        })
    }

    addToPdf = (doc, header, cards, docX, docY, rem) => {
        docX = 10;
        docY = docY + rem * 2;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(rem * .8);
        doc.setTextColor('black');
        doc.text(header, docX, docY);
        
        docX = 10;
        docY = docY + rem *.5;
        doc.setFont('Helvetica', '');
        doc.setFontSize(rem * .6);
        // doc.setTextColor('black');
        for(let card of cards) {
            doc.addImage(document.getElementById(card.id), 'png', docX, docY - 2, 8, 8)
            doc.setTextColor(pickCardColor(card.id));
            const text = card.hasOwnProperty('glory') ? ` - ${card.name} (${card.glory})` : ` - ${card.name}`;
            doc.text(text, docX + 10, docY + 5);
            doc.setTextColor('#BCBDC0');
            const measuredWidth = document.getElementById(`textMeasureContainer`).clientWidth;
            doc.text(`${idToPrintId(card.id)}`, docX + 10 + measuredWidth, docY + 5);
            const otherMeasuredWidth = document.getElementById(`cardNumberMeasurer`).clientWidth;
            doc.addImage(document.getElementById(`wave-${card.id.substr(0, 2)}`), 'png', docX + 10 + measuredWidth + otherMeasuredWidth, docY - 2, 8, 8);
            docY += 10;
            doc.setTextColor('black');
        }

        const coords = { x: docX, y: docY };
        return coords;
    }

    _handleSaveText = link => {
        const { id, name, cards } = this.props;
        console.log(this.props);
        let newLineChar; 
        if(navigator.platform.startsWith('Win')) {
            newLineChar = '\r\n';
        } else {
            newLineChar = '\n';
        }

        const header = `Faction: ${factions[idPrefixToFaction[id.split('-')[0]]]}`;
        const cardsjs = cards.toJS();
        console.log(cardsjs);
        const objectives = cardsjs.filter(c => c.type === 0);
        const totalGlory = objectives.reduce((acc, c) => acc += c.glory, 0);
        const objectivesAsText = objectives
            .map(c => `${this._convertCardIdToPrintFormat(c.id)}${` - `}${c.name}${` - `}${c.glory} glory${newLineChar}`)
            .reduce((acc, el) => acc += el, '');
        const objectivesSection = `Objectives - Total glory: ${totalGlory}${newLineChar}-----------------------------${newLineChar}${objectivesAsText}`;

        const gambits = cardsjs.filter(c => c.type === 1 || c.type === 3);
        const gambitsAsText = gambits
            .map(c => `${this._convertCardIdToPrintFormat(c.id)}${` - `}${c.name}${newLineChar}`)
            .reduce((acc, el) => acc += el, '');
        const gambitsSection = `Gambits (${gambits.length})${newLineChar}-----------------------------${newLineChar}${gambitsAsText}`;
        
        const upgrades = cardsjs.filter(c => c.type === 2);
        const upgradesAsText = upgrades
            .map(c => `${this._convertCardIdToPrintFormat(c.id)}${` - `}${c.name}${newLineChar}`)
            .reduce((acc, el) => acc += el, '');
        const upgradesSection = `Upgrades (${upgrades.length})${newLineChar}-----------------------------${newLineChar}${upgradesAsText}`;

        const footer = `-----------------------------${newLineChar}Deck URL: ${window.location.href}`
        
        const content = [
            header, 
            `${newLineChar}${newLineChar}`, 
            objectivesSection,
            `${newLineChar}${newLineChar}`,
            gambitsSection,
            `${newLineChar}${newLineChar}`,
            upgradesSection,
            `${newLineChar}${newLineChar}`,
            footer
        ];
        const file = new Blob(content, { type: 'text/plain'});
        link.href = URL.createObjectURL(file);
        link.download = `${name}.txt`;
    }

    _convertCardIdToPrintFormat = cardId => {
        switch(cardId.slice(0,2)) {
            case '02':
                return `L${cardId.slice(-3)}`;
            case '03':
                return `N${cardId.slice(-3)}`;
            default: 
                return cardId.slice(-3);
        }
    }        
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: EDIT_ADD_CARD, card: card}),
        setName: name => dispatch({ type: EDIT_DECK_NAME, name: name}),
        setDescription: desc => dispatch({ type: EDIT_DECK_DESCRIPTION, desc: desc }),
        setFaction: (faction, defaultSet) => dispatch({ type: EDIT_FACTION, faction: faction, defaultSet: defaultSet }),
        setEditModeSets: value => dispatch({ type: SET_EDIT_MODE_SETS, payload: value }),
        resetDeck: () => dispatch({ type: EDIT_RESET_DECK }),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(ReadonlyDeck)));