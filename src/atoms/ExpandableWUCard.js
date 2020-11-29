import React, { Component } from "react";
import WUCard from "./WUCard";

export default class ExpandableWUCard extends Component {
    state = {
        expanded: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.id !== this.props.id ||
            nextProps.type !== this.props.type ||
            nextProps.scoreType !== this.props.scoreType ||
            nextProps.name !== this.props.name ||
            nextProps.isAlter !== this.props.isAlter ||
            nextProps.inDeck !== this.props.inDeck ||
            nextState.expanded !== this.state.expanded
        );
    }

    handleExpandChange = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };

    render() {
        return (
            <WUCard
                card={this.props}
                expanded={this.state.expanded}
                onExpandChange={this.handleExpandChange}
            />
        );
    }
}
