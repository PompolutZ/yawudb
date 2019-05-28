import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { factionIndexes, factions, idPrefixToFaction, factionIdPrefix } from '../../data'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

function FactionDeckSelectMobile({
    classes,
    selectedFaction,
    onChange,
}) {
    const [faction, setFaction] = React.useState(selectedFaction);
    const values = [...factionIndexes.slice(1).map(fIdx => factionIdPrefix[fIdx])];

    const handleChange = e => {
        setFaction(e.target.value);
        onChange(e.target.value)();
    }

    React.useEffect(() => {
        setFaction(selectedFaction);
    }, [selectedFaction])

    const renderValue = value => value === 'all' ? <em>All</em> : factions[idPrefixToFaction[value]];

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor="faction-select" style={{ display: 'flex'}}>Show Faction Decks</InputLabel>
            <Select
                value={faction}
                onChange={handleChange}
                renderValue={renderValue}
                inputProps={{
                    id: 'faction-select',
                }}
            >
                <MenuItem value={'all'}><em>All</em></MenuItem>
                {
                    values.map(value => (
                        <MenuItem value={value} className={classes.menuItem} key={value}>
                            <img src={`/assets/icons/${idPrefixToFaction[value]}-deck.png`} style={{ width: '2rem', height: '2rem'}} />
                            <Typography>{factions[idPrefixToFaction[value]]}</Typography>
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

const styles = theme => ({
    root: {
        width: 'calc(100% - 1rem)',
        margin: '.5rem',
    },

    menuItem: {
        display: 'flex',
    },
})

export default withStyles(styles)(FactionDeckSelectMobile)
