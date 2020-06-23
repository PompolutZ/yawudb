import React, { Component } from 'react'
import {
    warbandsWithDefaultSet,
    factionIdPrefix,
    factionIndexes,
} from '../data'
import FloatingActionButton from '../components/FloatingActionButton'
import AddIcon from '@material-ui/icons/Add'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import changelog from '../changelog'
import uuid4 from 'uuid/v4'
import { connect } from 'react-redux'
import { addOrUpdateLastDeck } from '../reducers/lastDeck'
import { SET_DECKS_META } from '../reducers/decksMeta'
import { SET_FACTION } from '../reducers/deckUnderBuild'
import DeckMetaSummary from '../molecules/DecksMetaSummary'
import { withFirebase } from '../firebase'
import AutosuggestSearch from '../components/AutosuggestSearch'

const getChangeLogItemsByKey = key => {
    return Object.keys(changelog[key]).reduce(
        (acc, v) => [...acc, { name: v, description: changelog[key][v] }],
        []
    )
}

class Home extends Component {
    componentDidMount = () => {
        this.unsubscribe = this.props.firebase
            .decksMetaDb()
            .doc('all')
            .onSnapshot(async doc => {
                // const lastItem = doc.data().ids.slice(-1).reduce((_, deckId) => deckId);
                // if(lastItem) {
                //     try {
                //         const lastDeckSnapshot = await this.props.firebase.realdb
                //             .ref(`/decks/${lastItem}`)
                //             .once('value')
                //         const data = lastDeckSnapshot.val()
                //         let created = new Date(0)
                //         if (data.created && data.created.seconds) {
                //             created.setSeconds(data.created.seconds)
                //         } else {
                //             created = new Date(data.created)
                //         }
                //         this.props.addOrUpdate(lastItem, created, {
                //             ...data,
                //             id: lastItem,
                //             created: created,
                //         })
                //     } catch (err) {
                //         console.error('ERROR updating last added deck', err)
                //     }
                // }
            })
    }

    componentWillUnmount = () => {
        if (this.unsubscribe) {
            this.unsubscribe()
            this.unsubscribe = null
        }

        // this.props.firebase.realdb
        //     .ref('/decks_meta/all/ids/0')
        //     .off();
    }

    render() {
        const { classes } = this.props
        const lastUpdateKey = Object.keys(changelog)[0]
        const lastUpdate = getChangeLogItemsByKey(lastUpdateKey)

        return (
            <div className={classes.root}>
                <div className={classes.columnOne}>
                    <div
                        style={{
                            margin: '1rem',
                            backgroundColor: '#3B9979',
                            padding: '.3rem',
                            borderRadius: '1rem',
                        }}
                    >
                        <Typography className={classes.item}>
                            {`What's new?`}
                        </Typography>

                        <div>
                            {lastUpdate.map(entry => (
                                <div
                                    key={uuid4()}
                                    className={classes.changeLogItem}
                                >
                                    <b>{`${entry.name}:`}</b>
                                    {entry.description
                                        .split('/n')
                                        .map(line => `${line}`)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ margin: '1rem', display: 'flex' }}>
                        <AutosuggestSearch
                            onClick={this.handleGlobalSearchClick}
                        />
                    </div>

                    <div className={classes.metaSummary}>
                        {[
                            ...factionIndexes.slice(19),
                            ...factionIndexes.slice(9, 17),
                            ...factionIndexes.slice(1, 9),
                            ...factionIndexes.slice(17, 19),
                        ].map(faction => (
                            <DeckMetaSummary
                                key={factionIdPrefix[faction]}
                                prefix={factionIdPrefix[faction]}
                                onAddNewDeckClick={this.handleAddDeckClicked}
                                onDecksCountClick={
                                    this.handleNavigateToDecksByPrefix
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* <div className={classes.columnTwo}>
                    <div
                        style={{
                            margin: '1rem auto 1rem 1rem',
                            fontSize: '2rem',
                        }}
                    >
                        Last added deck:
                    </div>
                    {!this.props.lastDeck.id && (
                        <div style={{ display: 'flex', height: '100vh' }}>
                            <div
                                style={{
                                    margin: 'auto',
                                    display: 'flex',
                                    flexFlow: 'column nowrap',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress
                                    style={{ color: '#3B9979' }}
                                />
                                <div>Fetching last added deck...</div>
                            </div>
                        </div>
                    )}
                    {this.props.lastDeck.id && (
                        <ReadonlyDeck
                            isNarrow={window.screen.width >= 1280}
                            id={this.props.lastDeck.id}
                            name={this.props.lastDeck.data.name}
                            desc={this.props.lastDeck.data.desc}
                            author={this.props.lastDeck.data.authorDisplayName}
                            created={this.props.lastDeck.data.created}
                            sets={this.props.lastDeck.data.sets}
                            scoringSummary={
                                this.props.lastDeck.data.scoringSummary
                            }
                            factionId={this.props.lastDeck.id.substr(
                                0,
                                this.props.lastDeck.id.length - 13
                            )}
                            cards={
                                new OrderedSet(
                                    this.props.lastDeck.data.cards.map(c => ({
                                        id: c,
                                        ...cardsDb[c],
                                    }))
                                )
                            }
                        />
                    )}
                </div> */}

                <FloatingActionButton
                    isEnabled
                    onClick={this.handleNavigateToDeckCreate}
                >
                    <AddIcon />
                </FloatingActionButton>
            </div>
        )
    }

    handleGlobalSearchClick = payload => {
        this.props.history.push(`/view/card/${payload.id}`)
    }

    handleAddDeckClicked = faction => {
        const defaultSet = warbandsWithDefaultSet.reduce(
            (acc, [f, defaultSet]) => {
                if (f === faction) {
                    return defaultSet
                }
                return acc
            },
            -1
        )

        this.props.setFactionForNewDeck(faction, defaultSet)
        this.handleNavigateToDeckCreate()
    }

    handleNavigateToDeckCreate = () => {
        this.props.history.push('/deck/create')
    }

    handleNavigateToDecksByPrefix = prefix => {
        this.props.history.push(`/decks/${prefix}`)
    }
}

const mapStateToProps = state => {
    return {
        lastDeck: state.lastDeck,
        userInfo: state.auth,
        decksMeta: state.decksMeta,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOrUpdate: (id, timestamp, data) =>
            dispatch(addOrUpdateLastDeck(id, timestamp, data)),
        addDecksMeta: (key, value) =>
            dispatch({
                type: SET_DECKS_META,
                payload: { key: key, value: value },
            }),
        setFactionForNewDeck: (faction, defaultSet) =>
            dispatch({
                type: SET_FACTION,
                faction: faction,
                defaultSet: defaultSet,
            }),
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
    },

    columnOne: {
        flex: '1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '1 50%',
            order: 1,
        },
    },

    columnTwo: {
        flex: '1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '1 30%',
            order: 0,
        },
    },

    item: {
        fontFamily: 'roboto',
        fontSize: '1rem',
        color: 'white',
        marginLeft: '1rem',
    },

    changeLogItem: {
        fontFamily: 'roboto',
        fontSize: '.7rem',
        color: 'white',
        display: 'flex',
        flexFlow: 'column wrap',
        marginLeft: '1rem',
        alignItems: 'flex-start',
        marginBottom: '.5rem',
    },

    entry: {
        fontFamily: 'roboto',
    },

    metaSummary: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        },
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(Home))))
