import React, { Component } from 'react';
import { db, realdb } from '../firebase/firebase';
import ReadonlyDeck from '../components/ReadonlyDeck/index';
import { OrderedSet } from 'immutable';
import { cardsDb, warbandsWithDefaultSet, idPrefixToFaction, PREFIX_LENGTH } from '../data/index';
import { CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import FloatingActionButton from '../components/FloatingActionButton';
import { withRouter } from 'react-router-dom';
import { SET_EDIT_MODE_SETS, SET_CREATE_MODE_SETS } from '../reducers/cardLibraryFilters';
import { EDIT_ADD_CARD, EDIT_DECK_NAME, EDIT_DECK_DESCRIPTION, EDIT_FACTION, EDIT_RESET_DECK } from '../reducers/deckUnderEdit';
import { ADD_CARD, CHANGE_NAME, CHANGE_DESCRIPTION, SET_FACTION, RESET_DECK } from '../reducers/deckUnderBuild';
import { removeMyDeck } from '../reducers/mydecks';
import DeleteConfirmationDialog from '../atoms/DeleteConfirmationDialog';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from '../firebase';

class Deck extends Component {
    state = {
        deck: null,
        isEditAllowed: false,
        isDeleteDialogVisible: false,
        cardsView: false,
    }

    componentDidMount = async () => {
        try {
            if(this.props.mydecks[this.props.match.params.id]) {
                this.setState(state => ({ deck: this.props.mydecks[this.props.match.params.id], isEditAllowed: true }));
            } else {
                const snapshot = await this.props.firebase.realdb.ref('/decks/' + this.props.match.params.id).once('value');
                const data = snapshot.val();
                let author = data.author;
                if(author !== 'Anonymous') {
                    this.setState({ isEditAllowed: this.props.uid === data.author });
                }

                let created = new Date(0);
                if(data.created && data.created.seconds) {
                    created.setSeconds(data.created.seconds);
                } else {
                    created = new Date(data.created);
                }

                this.setState({deck: {...data, id: this.props.match.params.id, created: created }}); //, author:this.props.userInfo.displayName
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if(!this.state.deck) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <CircularProgress style={{color: '#3B9979'}} />
                        <div>Fetching last added deck...</div>
                    </div>
                </div>
            );
        }

        const { classes } = this.props;
        const { id, name, desc, cards, sets, created, authorDisplayName } = this.state.deck;
        const cardsSet = !cards ? new OrderedSet() : new OrderedSet(cards.map(c => ({id: c, ...cardsDb[c]})));
        return(
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <ReadonlyDeck 
                    onCardsViewChange={this.handleChangeView}
                    cardsView={this.state.cardsView}
                    id={id}
                    author={authorDisplayName} 
                    name={name}
                    desc={desc} 
                    created={created} 
                    sets={sets} 
                    factionId={id.substr(0, id.length - 13)} 
                    cards={cardsSet}
                    canUpdateOrDelete={this.state.isEditAllowed}
                    onEdit={this._editDeck}
                    onCopy={this._copyDeck}
                    onDelete={this._deleteDeck} />

                <DeleteConfirmationDialog title="Delete deck"
                    description={`Are you sure you want to delete deck: '${name}'`}
                    open={this.state.isDeleteDialogVisible}
                    onCloseDialog={this.handleCloseDeleteDialog}
                    onDeleteConfirmed={this.handleDeleteDeck}
                    onDeleteRejected={this.handleCloseDeleteDialog} />     
                {
                    this.state.isEditAllowed && (
                        <FloatingActionButton isEnabled onClick={this._editDeck}>
                            <EditIcon />
                        </FloatingActionButton>
                    )
                }
            </div>
        );
    }

    handleChangeView = () => {
        this.setState(state => ({ cardsView: !state.cardsView}));
    }

    handleCloseDeleteDialog = () => {
        this.setState({ isDeleteDialogVisible: false });
    }

    handleDeleteDeck = async () => {
        try {
            const { id } = this.state.deck;
            this.props.removeDeck(id);
            
            const userRef = await this.props.firebase.db.collection('users').doc(this.props.uid).get();
            const userDecks = userRef.data().mydecks.filter(deckId => deckId !== id);
            await this.props.firebase.db.collection('users').doc(this.props.uid).update({
                mydecks: userDecks
            });

            await this.props.firebase.realdb.ref(`/decks/${id}`).remove();

            const prefix = id.split('-')[0];
            await this.props.firebase.realdb.ref('/decks_meta/all').transaction(meta => {
                if(meta) {
                    const ids = meta.ids.filter(deckId => deckId !== id);
                    meta.ids = ids;
                    meta.count = ids.length;
                }

                return meta;
            });

            await this.props.firebase.realdb.ref(`/decks_meta/${prefix}`).transaction(meta => {
                if(meta) {
                    const ids = meta.ids.filter(deckId => deckId !== id);
                    meta.ids = ids;
                    meta.count = ids.length;
                }

                return meta;
            });

            this.handleCloseDeleteDialog();
            this.props.history.push('/mydecks');

        } catch (err) {
            console.error("ERROR deleting deck: ", err);
        }
    }

    _editDeck = () => {
        this.props.resetDeck();
        const { id, name, cards, sets, desc } = this.state.deck;
        const strippedId = id.substring(0, id.length - 13);
        const faction = strippedId.length > PREFIX_LENGTH ? strippedId : idPrefixToFaction[strippedId];
        const defaultSet = warbandsWithDefaultSet.filter(a => a.includes(faction));
        this.props.setFaction(faction, defaultSet[0][1]);
        this.props.setEditModeSets(sets);
        if(cards) {
            for(let c of cards) {
                this.props.addCard(c);
            }
        }
        
        this.props.setName(name);
        this.props.setDescription(desc);
        this.props.history.push(`/deck/edit/${id}`);
    }

    _deleteDeck = async () => {
        this.setState({ isDeleteDialogVisible: true });
    }

    _copyDeck = () => {
        this.props.copyResetDeck();
        const { id, name, cards, sets } = this.state.deck;
        const strippedId = id.substring(0, id.length - 13);
        const faction = strippedId.length > PREFIX_LENGTH ? strippedId : idPrefixToFaction[strippedId];
        const defaultSet = warbandsWithDefaultSet.filter(a => a.includes(faction));
        this.props.copySetFaction(faction, defaultSet[0][1]);
        this.props.copyCreateModeSets(sets);
        if(cards) {
            for(let c of cards) {
                this.props.copyAddCard(c);
            }
        }

        this.props.copyChangeName(`${name} - COPY`);
        this.props.copyChangeDescription();
        this.props.history.push(`/deck/create`);
    }
}

const mapStateToProps = state => {
    return {
        uid: state.auth !== null ? state.auth.uid : null,
        mydecks: state.mydecks,
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
        removeDeck: id => dispatch(removeMyDeck(id)),

        copyAddCard: card => dispatch({ type: ADD_CARD, card: card }),
        copyChangeName: name => dispatch({ type: CHANGE_NAME, name: name }),
        copyChangeDescription: () => dispatch({ type: CHANGE_DESCRIPTION, desc: '' }),
        copySetFaction: (faction, defaultSet) => dispatch({ type: SET_FACTION, faction: faction, defaultSet: defaultSet }),
        copyCreateModeSets: value => dispatch({ type: SET_CREATE_MODE_SETS, payload: value }),
        copyResetDeck: () => dispatch({ type: RESET_DECK }),
    }
}

const styles = theme => ({
    viewAsBtn: {
        display: 'none',
        [theme.breakpoints.up('lg')] : {
            display: 'flex',
        }
    }
});

export default withFirebase(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Deck))));