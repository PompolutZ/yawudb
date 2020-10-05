import React, { Component, PureComponent } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';
import { setsIndex, setsNames, cardTypeIcons } from '../data/index';
import { withRouter } from 'react-router-dom';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';
import { Typography } from '@material-ui/core';
import { pickCardColor, pickCardBackgroundColor } from '../utils/functions';

const cardNameViewStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    setImage: {
        width: '1.5rem',
        height: '1.5rem'
    }
});

class CardNameView extends PureComponent {
    render() {
        const { classes, set, name, type, scoreType, id } = this.props;
        return (
            <div className={classes.root} onClick={this._navitateToCard}>
                <img src={`/assets/icons/${setsIndex[set]}-icon.png`} 
                    alt={`${setsIndex[set]}`}
                    className={classes.setImage} />
                <img src={`/assets/icons/${cardTypeIcons[type]}.png`} 
                    alt={`${cardTypeIcons[type]}`}
                    className={classes.setImage}
                    style={{ margin: '0 0 0 .2rem' }} />
                <div style={{ margin: '0 0 0 .2rem', fontSize: '.8rem', color: pickCardColor(id)}}>{name.toUpperCase()}</div>
                {
                    scoreType >= 0 && (
                        <ObjectiveScoreTypeIcon type={scoreType} style={{ color: '#3B9979', width: '1rem', height: '1rem'}} />                        
                    )
                }
            </div>
        );
    }

    _navitateToCard = () => {
        this.props.setLastScrollIndex(this.props.index);
        this.props.history.push(`/view/card/${this.props.id}`)
    }
}

const cardImageViewStyles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: '1rem auto',
    },
    setImage: {
        width: '1.5rem',
        height: '1.5rem'
    },

    cardImage: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')] : {
            maxWidth: '20rem'
        },
        margin: '0 0 .3rem 0'
    },

    cardInfoItem: {
        margin: '0 0 1rem 0',
        width: '100%',
        borderBottom: '1px solid gray',
        [theme.breakpoints.up('sm')] : {
            maxWidth: '20rem'
        },
    },

    row: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 .5rem 0'
    },

    setName: {
        margin: '0 0 0 .5rem'
    }

});

class CardImageView extends PureComponent {
    render() {
        const { classes, set, id } = this.props;
        return (
            <div className={classes.root}>
                <img src={`/assets/cards/${id}.png`} 
                    alt={`${id}`}
                    className={classes.cardImage} />
                <div className={classes.cardInfoItem}>
                    <Typography>Card location: </Typography>
                    <div className={classes.row} style={{ backgroundColor: pickCardBackgroundColor(id) }}>
                        <img src={`/assets/icons/${setsIndex[set]}-icon.png`} 
                            alt={`${setsIndex[set]}`}
                            className={classes.setImage} />
                        <Typography variant="subheading" className={classes.setName}>{setsNames[set]}</Typography>
                    </div>    
                </div>
            </div>
        );
    }
}

const ratio = 744 / 532;
const minOptimalWidth = 200;

class VirtualizedCardsList extends Component {
    state = {
        cardRows: [],
        cardRenderWidth: 0,
        cardRenderHeight: 0,
        width: document.getElementById('yawudb_main').offsetWidth,
        height: document.getElementById('yawudb_main').offsetHeight,
    }

    componentDidMount(){
        const itemsPerRow = Math.floor(this.state.width / minOptimalWidth);
        const rows = this.props.cards.reduce((result, item, index, array) => {
            if(index % itemsPerRow === 0) {
                result.push(array.slice(index, index + itemsPerRow));
            }

            return result;
        }, []);
        
        this.setState({ cardRows: rows, cardRenderWidth: this.state.width / itemsPerRow, cardRenderHeight: this.state.width / itemsPerRow * ratio });
    }

    _rowRenderer = params => {
        const renderedItem = this._renderItem(params.index)
        return (
            <div key={params.key} style={params.style} >
                { renderedItem }
            </div>
        );
    }

    _renderItem = index => {
        if (!this.props.cards[index].hasOwnProperty('name')) {
            return <span></span>
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    this.state.cardRows[index] && this.state.cardRows[index].map(card => (
                        <div key={card.id} style={{ width: this.state.cardRenderWidth, height: this.state.cardRenderHeight, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <img style={{ width: 'calc(100% - 1rem)' }} alt={card.name} src={`/assets/cards/${card.id}.png`} />
                        </div>
                    ))
                }
            </div>
        )
    }

    _setRef = ref => {
        this.List = ref;
    }

    _handleExpanded = item => {
        item.expanded = !item.expanded;
        this.List.recomputeRowHeights();
        this.List.forceUpdate();
    }

    render() {
        return (
            <AutoSizer disableHeight>
                {
                    () => (
                        <List
                        ref={this._setRef}
                        width={this.state.width}
                        height={this.state.height}
                        rowCount={this.state.cardRows.length}
                        rowHeight={this.state.cardRenderHeight}
                        rowRenderer={this._rowRenderer}
                        scrollToIndex={this.props.scrollIndex} />
                    )
                }
            </AutoSizer>
        );
    }
}

export default VirtualizedCardsList;