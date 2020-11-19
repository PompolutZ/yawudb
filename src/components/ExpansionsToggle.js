import React, { Component, useState } from "react";
import { setInfos, rotatedOutSetsIndexes } from "../data/index";
import * as _ from "lodash";
import ToggableExpansionIcon from "../atoms/ToggableExpansionIcon";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Toggle from '../v2/components/HexToggle';
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    container: {
        display: "flex",
        flexFlow: "row wrap",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "25rem",
        },
    },
});

function ExpansionsToggle({ expansions = [],  selectedExpansions = [], onExpansionsChange, classes, ...rest }) {
    console.log(expansions, selectedExpansions);
    const [selectAllValidSets, setSelectAllValidSets] = useState(expansions.length == selectedExpansions.length);

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
                            key={expansion}
                            set={expansion}
                            variant="large"
                            isEnabled={selectedExpansions.includes(expansion)}
                            onClick={handleToggle(expansion)}
                        />
                ))}
            </div>
        </>
    );
}

// class ExpansionsToggle extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedExpansions: this.props.selectedSets
//                 ? this.props.selectedSets.map((x) => parseInt(x, 10))
//                 : [],
//         };

//         this.handleToggle = this.handleToggle.bind(this);
//     }

//     handleToggle(expansion) {
//         const exp = parseInt(expansion, 10);
//         let expansions = [];
//         const indexOf = this.state.selectedExpansions.indexOf(exp);
//         if (indexOf >= 0) {
//             expansions = [
//                 ...this.state.selectedExpansions.slice(0, indexOf),
//                 ...this.state.selectedExpansions.slice(indexOf + 1),
//             ];
//         } else {
//             expansions = [exp, ...this.state.selectedExpansions];
//         }

//         this.setState({ selectedExpansions: expansions });

//         if (this.timeoutId) {
//             clearTimeout(this.timeoutId);
//         }

//         this.timeoutId = setTimeout(
//             () => this.props.onExpansionsChange(expansions),
//             350
//         );
//     }

//     renderIndex(v) {
//         return (
//         );
//     }

//     render() {
//         const { classes } = this.props;
//         return (
//             <div className={classes.root}>
//                 {_.keys(setInfos)
//                     .slice(
//                         this.props.deckPlayFormat === "championship"
//                             ? rotatedOutSetsIndexes.length
//                             : 0
//                     )
//                     .map((v) => this.renderIndex(v))}
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     eligibleForOP: state.cardLibraryFilters.eligibleForOP,
//     deckPlayFormat: state.cardLibraryFilters.deckPlayFormat,
// });

// export default withStyles(styles)(connect(mapStateToProps)(ExpansionsToggle));
export default withStyles(styles)(ExpansionsToggle);
