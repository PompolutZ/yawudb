import React, { useEffect, useState } from "react";
import ToggableExpansionIcon from "../atoms/ToggableExpansionIcon";
import { withStyles } from "@material-ui/core/styles";
import Toggle from '../v2/components/HexToggle';

const styles = (theme) => ({
    container: {
        display: "flex",
        flexFlow: "row wrap",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "25rem",
        },
    },
});

function ExpansionsToggle({ expansions = [],  selectedExpansions = [], onExpansionsChange, classes }) {
    const [selectAllValidSets, setSelectAllValidSets] = useState(true);

    useEffect(() => {
        setSelectAllValidSets(expansions.length == selectedExpansions.length)
    }, [expansions.length, selectedExpansions.length]);

    const handleToggle = expansion => () => {
        const next = selectedExpansions.includes(expansion)
            ? selectedExpansions.filter(e => e != expansion)
            : [...selectedExpansions, expansion];

        setSelectAllValidSets(next.length == selectedExpansions.length);
        onExpansionsChange(next);
    }

    const toggleAllSelectedSets = () => {
        if(selectAllValidSets) {
            setSelectAllValidSets(false);
            onExpansionsChange([]);
        } else {
            setSelectAllValidSets(true);
            onExpansionsChange([...expansions]);
        }
    }

    return (
        <>
            <div className="flex my-4">
                <Toggle checked={selectAllValidSets} onChange={toggleAllSelectedSets} />
                <p className="ml-2">
                    Use all sets valid for selected format.
                </p>
            </div>
            <div className={classes.container}>
                {   expansions.map(expansion => (
                        <ToggableExpansionIcon
                            key={expansion.id}
                            set={expansion.name}
                            variant="large"
                            isEnabled={selectedExpansions.includes(expansion)}
                            onClick={handleToggle(expansion)}
                        />
                ))}
            </div>
        </>
    );
}

export default withStyles(styles)(ExpansionsToggle);
