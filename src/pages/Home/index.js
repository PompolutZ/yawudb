import React, { Component } from 'react'
import {
    warbandsWithDefaultSet,
    factionIdPrefix,
    factionIndexes,
} from '../../data'
import FloatingActionButton from '../../components/FloatingActionButton'
import AddIcon from '@material-ui/icons/Add'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import changelog from '../../changelog'
import uuid4 from 'uuid/v4'
import { connect } from 'react-redux'
import { addOrUpdateLastDeck } from '../../reducers/lastDeck'
import { SET_DECKS_META } from '../../reducers/decksMeta'
import { SET_FACTION } from '../../reducers/deckUnderBuild'
import DeckMetaSummary from '../../molecules/DecksMetaSummary'
import { withFirebase } from '../../firebase'
import AutosuggestSearch from '../../components/AutosuggestSearch'

const getChangeLogItemsByKey = key => {
    return Object.keys(changelog[key]).reduce(
        (acc, v) => [...acc, { name: v, description: changelog[key][v] }],
        []
    )
}

class Home extends Component {

    render() {
        const { classes } = this.props
        const lastUpdateKey = Object.keys(changelog)[0]
        const lastUpdate = getChangeLogItemsByKey(lastUpdateKey)

        return (
            <div className="flex flex-col mx-2 sm:mx-4">
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
        margin: '0 auto',
        flex: '0 1 75%',
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: "space-around",
        justifyContent: "flex-start",
        minWidth: "375px",
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(Home))))
