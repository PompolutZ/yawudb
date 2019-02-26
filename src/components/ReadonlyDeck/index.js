import React, { PureComponent, lazy } from 'react';
import classnames from 'classnames';
import { cardTypeIcons, idPrefixToFaction, cardType, totalCardsPerWave, factions, restrictedCards } from '../../data/index';
import { pickCardColor } from '../../utils/functions';
import { Set } from 'immutable';
import DeckIcon from '../../atoms/DeckIcon';
import { withStyles } from '@material-ui/core/styles';
import SetsList from '../../atoms/SetsList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_EDIT_MODE_SETS } from '../../reducers/cardLibraryFilters';
import ScoringOverview from '../../atoms/ScoringOverview';
import { EDIT_ADD_CARD, EDIT_DECK_NAME, EDIT_DECK_DESCRIPTION, EDIT_FACTION, EDIT_RESET_DECK } from '../../reducers/deckUnderEdit';
import b64toBlob from 'b64-to-blob';
import Card from './atoms/Card';

const DeckActionsMenu = lazy(() => import('./atoms/DeckActionsMenu'));
const DeckActionMenuLarge = lazy(() => import('./atoms/DeckActionsMenuLarge'));

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

const idToPrintId = id => {
    const wavePrefix = id.substr(0, 2);
    return `${id.slice(-3)}/${totalCardsPerWave[parseInt(wavePrefix, 10)]}`;
}

const cardWidthPx = 532 / 2;
const cardHeightPx = 744 / 2;

const calcCanvasSize = cards => {
    const objectives = cards.toJS().filter(c => c.type === 0);
    const gambits = cards.toJS().filter(c => c.type === 1 || c.type === 3);
    const upgrades = cards.toJS().filter(c => c.type === 2);

    const objectivesWidth = 4 * (cardWidthPx + 10); 
    const gambitsWidth = 4 * (cardWidthPx + 10); 
    const upgradesWidth = 4 * (cardWidthPx + 10);
    
    const width = objectivesWidth + 21 + gambitsWidth + 21 + upgradesWidth;

    const objectivesHeight = Math.ceil(objectives.length / 4) * (cardHeightPx + 10); 
    const gambitsHeight = Math.ceil(gambits.length / 4) * (cardHeightPx + 10); 
    const upgradesHeight = Math.ceil(upgrades.length / 4) * (cardHeightPx + 10);

    const height = Math.max(objectivesHeight, gambitsHeight, upgradesHeight) + 20;

    return {
        width: width,
        height: height
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '30rem'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '100%'
        }
    },

    deckHeader: {
        display: 'flex',
        margin: '1rem 0 0 .5rem',
    },

    deckHeaderMenu: {
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },

    deckHeaderButtons: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            margin: '0 1rem 0 0',
        }
    },

    deckBody: {
        display: 'flex',
        flexFlow: 'row wrap',
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
        }
    },

    section: {
        flex: '1 100%',
        [theme.breakpoints.up('lg')]: {
            flex: '1 1 calc(100% / 3)',
        },
    },

    sectionItems: {
        display: 'flex', 
        flexFlow: 'column nowrap', 
    },

    cardsSectionItems: {
        display: 'flex', 
        flexFlow: 'row wrap', 
        justifyContent: 'center'
    },

    cardsSection: {
        flex: '1 100%',
    }
});

class ReadonlyDeck extends PureComponent {
    state = {
        deckCanvasSize: { width: 0, height: 0 },
        isDraft: false,
    }

    componentDidMount = () => {
        const cards = this.props.cards.toJS();
        const counts = cards.reduce((acc, el) => {
            switch(el.type) {
                case 0: 
                    acc.objectives += 1;
                    return acc;

                case 2: 
                    acc.upgrades += 1;
                    return acc;

                default: 
                    acc.gambits += 1;
                    return acc;
            }
        }, {
            objectives: 0,
            gambits: 0,
            upgrades: 0
        });

        this.setState({ 
            deckCanvasSize: calcCanvasSize(this.props.cards ), 
            isDraft: counts.objectives < 12 || (counts.upgrades + counts.gambits < 20) || counts.gambits > counts.upgrades 
        });
    }

    render() {
        const { classes, name, author, factionId, cards, sets, created, isNarrow } = this.props;
        const objectives = cards.filter(v => v.type === 0).sort((a, b) => a.name.localeCompare(b.name));
        const gambits = cards.filter(v => v.type === 1 || v.type === 3).sort((a, b) => a.name.localeCompare(b.name));
        const upgrades = cards.filter(v => v.type === 2).sort((a, b) => a.name.localeCompare(b.name));
        const spellsCount = gambits.filter(v => v.type === 3).count();
    
        const createdDate = created ? ` | ${new Date(created).toLocaleDateString()}` : '';
        const draft = this.state.isDraft ? ` | Draft` : '';
        const objectiveSummary = new Set(objectives).groupBy(c => c.scoreType).reduce((r, v, k) => {
            r[k] = v.count();
            return r;
        }, [0, 0, 0, 0]);

        const totalGlory = objectives.reduce((acc, c) => acc + c.glory, 0);
        return (    
            <div className={classes.root} style={{ maxWidth: isNarrow ? '30rem' : '' }}>
                <div className={classes.deckHeader}>
                    <DeckIcon width="4rem" height="4rem" faction={idPrefixToFaction[factionId]} />
                    <div style={{flex: '1 1 auto'}}>
                        <div style={{ fontFamily: 'roboto', fontSize: '1rem', fontWeight: 'bold'}}>{name}</div>
                        <div style={{ fontFamily: 'roboto', fontSize: '.7rem', }}>
                            <span>{author}</span>
                            <span>{createdDate}</span>
                            <span style={{ color: 'darkorange' }}>{draft}</span>
                        </div>
                        <div style={{margin: '.2rem 0 0 0'}}>
                            {
                                <SetsList sets={sets} />
                            }
                        </div>
                    </div>
                    {
                        isNarrow && (
                            <div>
                                <DeckActionsMenu onSaveAsPdf={this._handleSaveAsPdf}
                                    onSaveText={this._handleSaveText}
                                    onSaveImage={this._handleSaveImage} 
                                    canUpdateOrDelete={this.props.canUpdateOrDelete} 
                                    onEdit={this.props.onEdit}
                                    onCopy={this.props.onCopy}
                                    onDelete={this.props.onDelete} />
                            </div>
                        )
                    }
                    {
                        !isNarrow && (
                            <React.Fragment>
                                <div className={classes.deckHeaderMenu}>
                                    <DeckActionsMenu onSaveAsPdf={this._handleSaveAsPdf}
                                        onSaveText={this._handleSaveText}
                                        onSaveImage={this._handleSaveImage} 
                                        canUpdateOrDelete={this.props.canUpdateOrDelete} 
                                        onEdit={this.props.onEdit}
                                        onCopy={this.props.onCopy}
                                        onDelete={this.props.onDelete} />
                                </div>
                                <div className={classes.deckHeaderButtons}>
                                    <DeckActionMenuLarge
                                        cardsView={this.props.cardsView} 
                                        onCardsViewChange={this.props.onCardsViewChange}
                                        onSaveAsPdf={this._handleSaveAsPdf}
                                        onSaveText={this._handleSaveText}
                                        onSaveImage={this._handleSaveImage} 
                                        canUpdateOrDelete={this.props.canUpdateOrDelete} 
                                        onEdit={this.props.onEdit}
                                        onCopy={this.props.onCopy}
                                        onDelete={this.props.onDelete} />
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
                <div className={classes.deckBody}>
                    <div className={classnames(classes.section, {[classes.cardsSection] : this.props.cardsView})} style={{ flex: isNarrow ? '1 100%' : ''}}>
                        <MiniSectionHeader type={0}>
                            <div style={{ display: 'flex'}}>
                                <div style={{ display: 'flex'}}>
                                    <ScoringOverview summary={objectiveSummary} glory={totalGlory} />
                                </div>
                            </div>
                        </MiniSectionHeader>
                        <div className={classnames(classes.sectionItems, {[classes.cardsSectionItems] : this.props.cardsView})}>
                            { 
                                objectives.toJS().map((v, i) => <Card key={i} card={v} asImage={this.props.cardsView} /> )
                            }
                        </div>
                    </div>

                    <div className={classnames(classes.section, {[classes.cardsSection] : this.props.cardsView})}  style={{ flex: isNarrow ? '1 100%' : ''}}>
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
                        <div className={classnames(classes.sectionItems, {[classes.cardsSectionItems] : this.props.cardsView})}>
                            {
                                gambits.toJS().map((v, i) => <Card key={i} card={v} asImage={this.props.cardsView} /> )
                            }
                        </div>
                    </div>
                    <div className={classnames(classes.section, {[classes.cardsSection] : this.props.cardsView})}  style={{ flex: isNarrow ? '1 100%' : ''}}>
                        <MiniSectionHeader type={2} />
                        <div className={classnames(classes.sectionItems, {[classes.cardsSectionItems] : this.props.cardsView})}>
                            {
                                upgrades.toJS().map((v, i) => <Card key={i} card={v} asImage={this.props.cardsView} /> )
                            }
                        </div>
                    </div>    
                </div>
                
                {/* for exports */}
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
                    <div id="cardsPreloadedImages">
                        {
                            cards.map(c => <img key={c.id} id={`card_${c.id}`} src={`/assets/cards/${c.id}.png`} />)
                        }
                    </div>
                    <div>
                        <canvas id="deckCanvas" width={this.state.deckCanvasSize.width} height={this.state.deckCanvasSize.height}>
                        </canvas>
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

        const location = window.location.href.endsWith(id) ? window.location.href : `${window.location.href}view/deck/${id}`;
        const footer = `-----------------------------${newLineChar}Deck URL: ${location}`;
        
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

    _handleSaveImage = link => {
        const { cards, name } = this.props;

        const canvas = document.getElementById('deckCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const objectives = cards.toJS().filter(c => c.type === 0).reduce((acc, el, i, arr) => {
            if(i % 4 === 0) {
                acc.push(arr.slice(i, i + 4));
            }
            return acc;
        }, []);

        const gambits = cards.toJS().filter(c => c.type === 1 || c.type === 3).reduce((acc, el, i, arr) => {
            if(i % 4 === 0) {
                acc.push(arr.slice(i, i + 4));
            }
            return acc;
        }, []);

        const upgrades = cards.toJS().filter(c => c.type === 2).reduce((acc, el, i, arr) => {
            if(i % 4 === 0) {
                acc.push(arr.slice(i, i + 4));
            }
            return acc;
        }, []);

        try {
            let cursorX = 10;
            let cursorY = 10;
            for(let row of objectives) {
                for(let c of row) {
                    if(restrictedCards[c.id]) {
                        ctx.fillStyle = 'Goldenrod';
                        ctx.fillRect(cursorX - 5, cursorY - 5, cardWidthPx + 10, cardHeightPx + 10);
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(image, cursorX, cursorY, cardWidthPx, cardHeightPx);
                    cursorX += cardWidthPx + 10;
                }
    
                cursorX = 10;
                cursorY += cardHeightPx + 10;
            }

            ctx.beginPath();
            ctx.moveTo(4 * (cardWidthPx + 10) + 10, 5);
            ctx.lineTo(4 * (cardWidthPx + 10) + 10, 3 * (cardHeightPx + 10) + 10);
            ctx.stroke();

            cursorY = 10;
            cursorX = 4 * (cardWidthPx + 10) + 21;
            for(let row of gambits) {
                for(let c of row) {
                    if(restrictedCards[c.id]) {
                        ctx.fillStyle = 'Goldenrod';
                        ctx.fillRect(cursorX - 5, cursorY - 5, cardWidthPx + 10, cardHeightPx + 10);
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(image, cursorX, cursorY, cardWidthPx, cardHeightPx);
                    cursorX += cardWidthPx + 10;
                }
    
                cursorX = 4 * (cardWidthPx + 10) + 21;
                cursorY += cardHeightPx + 10;
            }

            ctx.beginPath();
            ctx.moveTo(8 * (cardWidthPx + 10) + 20, 5);
            ctx.lineTo(8 * (cardWidthPx + 10) + 20, 3 * (cardHeightPx + 10) + 10);
            ctx.stroke();

            cursorY = 10;
            cursorX = 8 * (cardWidthPx + 10) + 31;
            for(let row of upgrades) {
                for(let c of row) {
                    if(restrictedCards[c.id]) {
                        ctx.fillStyle = 'Goldenrod';
                        ctx.fillRect(cursorX - 5, cursorY - 5, cardWidthPx + 10, cardHeightPx + 10);
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(image, cursorX, cursorY, cardWidthPx, cardHeightPx);
                    cursorX += cardWidthPx + 10;
                }
    
                cursorX = 8 * (cardWidthPx + 10) + 31;
                cursorY += cardHeightPx + 10;
            }

            const dataUrl = canvas.toDataURL();
            const contentType = 'image/png';
            const b64Data = dataUrl.slice('data:image/png;base64,'.length);
            const blob = b64toBlob(b64Data, contentType);
            link.href = URL.createObjectURL(blob);
            link.download = `${name}.png`;
        } catch(err) {
            console.error(err);
        }
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