import React from 'react'
import { FirebaseContext } from '../firebase'
import { withStyles } from '@material-ui/core/styles'
import { idPrefixToFaction, factions } from '../data/index'

const init = {}

function Query(props) {
    const { classes, match } = props
    const [data, setData] = React.useState(init)
    const [status, setStatus] = React.useState('IDLE')
    const firebase = React.useContext(FirebaseContext)

    React.useEffect(() => {
        setStatus('LOADING')
        const type = match.params.type
        const faction = match.params.arg
        console.log('QUERY', type, faction)

        firebase
            .decks()
            .once('value')
            .then(s => {
                const decksData = Object.entries(s.val())
                    .filter(([id]) => id && id.startsWith(faction))
                    .map(([id, value]) => {
                        let lastModified = new Date(0)
                        if (value.created && value.created.seconds) {
                            lastModified.setSeconds(value.created.seconds)
                        } else {
                            lastModified = new Date(value.created)
                        }

                        return {
                            author: value.authorDisplayName,
                            cards: value.cards,
                            lastModified: lastModified,
                            name: value.name,
                            source: `https://yawudb.com/view/deck/${id}`,
                        }
                    })

                setData(decksData)
                setStatus('LOADED')
            })
    }, [])

    return (
        <div className={classes.root}>
            <div>
                <h2>How to guide:</h2>
                <p>
                    To retrieve decks make a request to the url:{' '}
                    <span className={classes.accent}>
                        https://yawudb.com/query/:type?/:arg?
                    </span>
                </p>
                <p>
                    <span className={classes.accent}>:type?</span> - could only
                    be <span className={classes.accent}>decks</span> at the
                    moment
                </p>
                <p>
                    <span className={classes.accent}>:arg?</span> - specify
                    faction using one of the following faction prefixes:
                </p>
                <ul>
                    {Object.entries(idPrefixToFaction).map(
                        ([prefix, faction]) => (
                            <li key={prefix} className={classes.listItem}>
                                <span className={classes.accent}>{prefix}</span>{' '}
                                - {factions[faction]}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <p className={classes.secondary}>Example:</p>
            <div>
            <p><span className={classes.accent}>https://yawudb.com/query/decks/tp</span> - will return all decks for Thundrik Profiteers.</p>
            </div>                
            <br />
            <h3>Response</h3>
            <p>There are two HTML elements of interest: Status and Data.</p>
            <h5>Status</h5>
            <p>You can get status of the query by retrieving <span className={classes.secondary}>"query_status"</span> element like this: <span className={classes.accent}>document.getElementById('query_status').innerText</span></p>
            <p>It can be one of the following values: </p>
            <ul>
                <li className={classes.listItem}><span className={classes.accent}>IDLE</span> - Default. You rarely see this status, but it means that nothing is hapenning.</li>
                <li className={classes.listItem}><span className={classes.accent}>LOADING</span> - The url has been parsed and we are fetching data from the database.</li>
                <li className={classes.listItem}><span className={classes.accent}>LOADED</span> - The data has been fetched from the database.</li>
            </ul>
            <h5>Data</h5>
            <p>You can get data result of the query by retrieving <span className={classes.secondary}>"query_data"</span> element like this: <span className={classes.accent}>document.getElementById('query_data').innerText</span></p>
            <p>You can later parse that data using: <span className={classes.accent}>JSON.parse(document.getElementById('query_data').innerText)</span></p>
            <p>The result is an array of objects with the following properties:</p>
            <ul>
                <li className={classes.listItem}><span className={classes.accent}>author</span> - User friendly name of the user who has created the deck.</li>
                <li className={classes.listItem}><span className={classes.accent}>cards</span> - Array with cards' ids  in yawudb format: '01001', '02060', '03557', etc.</li>
                <li className={classes.listItem}><span className={classes.accent}>lastModified</span> - The date when the deck was last modified.</li>
                <li className={classes.listItem}><span className={classes.accent}>name</span> - Name of the deck user has given it.</li>
                <li className={classes.listItem}><span className={classes.accent}>source</span> - Link to view this deck on <span className={classes.secondary}>https://yawudb.com</span>.</li>
            </ul>
            <br />
            <div style={{minWidth: '20rem', borderBottom: '1px solid maroon'}}></div>
            <pre id="query_status">{status}</pre>
            <pre id="query_data">{JSON.stringify(data, null, 4)}</pre>
        </div>
    )
}

const styles = theme => ({
    root: {
        margin: '1rem',
    },

    accent: {
        color: theme.palette.primary.main,
        backgroundColor: 'black',
        padding: '.3rem',
    },

    listItem: {
        marginBottom: '.7rem'
    },

    secondary: {
        color: theme.palette.secondary.main,
        maxWidth: '10rem',
    },
})

export default withStyles(styles)(Query)
