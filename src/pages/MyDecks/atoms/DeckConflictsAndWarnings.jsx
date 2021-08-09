import React, { PureComponent, Component } from "react";
import ExpansionIcon from "../../../atoms/ExpansionIcon";
import { cardsDb } from "../../../data/index";
import { Set } from "immutable";

class DeckConflictsAndWarningsItem extends PureComponent {
    state = {
        expanded: false,
    };

    render() {
        const { conflict, warning, deckName } = this.props;
        return (
            <div
                style={{
                    margin: "0 0 .5rem 1rem",
                    fontSize: ".8rem",
                    fontFamily: `'Roboto', sans-serif`,
                    cursor: "pointer",
                }}
                onClick={this.handleClick}
            >
                {!this.state.expanded && (
                    <div style={{ display: "flex" }}>
                        <div>Has</div>
                        {conflict && (
                            <div
                                style={{
                                    marginLeft: ".3rem",
                                    color: "crimson",
                                }}
                            >
                                <u>{conflict.length} conflict(s)</u>
                            </div>
                        )}
                        {conflict && (
                            <div style={{ marginLeft: ".3rem" }}>and</div>
                        )}
                        {warning && (
                            <div
                                style={{ marginLeft: ".3rem", color: "orange" }}
                            >
                                <u>{warning.length} warning(s)</u>
                            </div>
                        )}
                    </div>
                )}
                {this.state.expanded && (
                    <div>
                        <div style={{ display: "flex" }}>
                            {conflict && <div>Has</div>}
                            {conflict && (
                                <div
                                    style={{
                                        marginLeft: ".3rem",
                                        color: "crimson",
                                    }}
                                >
                                    {conflict.length} conflict(s):
                                </div>
                            )}
                        </div>
                        {conflict &&
                            conflict.map((id) => {
                                return (
                                    <div
                                        key={id}
                                        style={{
                                            display: "flex",
                                            marginBottom: ".2rem",
                                        }}
                                    >
                                        <ExpansionIcon
                                            set={cardsDb[id].set}
                                            variant="small"
                                        />
                                        <div style={{ marginLeft: ".3rem" }}>
                                            - {cardsDb[id].name}
                                        </div>
                                    </div>
                                );
                            })}
                        <div style={{ display: "flex" }}>
                            {conflict && <div>and</div>}
                            {!conflict && <div>Has</div>}
                            {warning && (
                                <div
                                    style={{
                                        marginLeft: ".3rem",
                                        color: "orange",
                                    }}
                                >
                                    {warning.length} warning(s):
                                </div>
                            )}
                        </div>
                        {warning &&
                            warning.map((id) => {
                                return (
                                    <div
                                        key={id}
                                        style={{
                                            display: "flex",
                                            marginBottom: ".2rem",
                                        }}
                                    >
                                        <ExpansionIcon
                                            set={cardsDb[id].set}
                                            variant="small"
                                        />
                                        <div style={{ marginLeft: ".3rem" }}>
                                            - {cardsDb[id].name}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
                <div style={{ display: "flex" }}>
                    <div>with</div>
                    <div style={{ marginLeft: ".3rem", fontWeight: "500" }}>
                        {deckName}
                    </div>
                </div>
            </div>
        );
    }

    handleClick = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };
}

class DeckConflictsAndWarnings extends Component {
    render() {
        const hasConflicts = Boolean(this.props.conflicts);
        const conflicts = hasConflicts ? Object.keys(this.props.conflicts) : [];
        const hasWarnings = Boolean(this.props.warnings);
        const warnings = hasWarnings ? Object.keys(this.props.warnings) : [];
        const mergedKeys = new Set(conflicts).union(new Set(warnings));
        // console.log(mergedKeys.toJS());
        const decks = this.props.decks.reduce((acc, [key, val]) => {
            acc[key] = val;
            return acc;
        }, {});

        // for(let id of mergedKeys.toJS()) {
        //     const conflict = hasConflicts ? this.props.conflicts[id] : null;
        //     const warning = hasWarnings ? this.props.warnings[id] : null;
        //     // console.log(conflict, warning);
        //     console.log(`Has ${!conflict ? `` : `${conflict.length} conflicts and `}${!warning ? `` : `${warning.length} warnings`} with ${decks[id].name}.`)
        // }

        return (
            <div style={{ paddingBottom: ".5rem" }}>
                {mergedKeys.toJS().map((id, i) => {
                    const conflict = hasConflicts
                        ? this.props.conflicts[id]
                        : null;
                    const warning = hasWarnings
                        ? this.props.warnings[id]
                        : null;

                    return (
                        <DeckConflictsAndWarningsItem
                            key={i}
                            conflict={conflict}
                            warning={warning}
                            deckName={decks[id].name}
                        />
                    );
                })}
            </div>
        );
    }
}

export default DeckConflictsAndWarnings;
