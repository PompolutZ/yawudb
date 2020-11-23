import React, { Component } from "react";
import {
    restrictedCards,

    bannedCards
} from "../../../data/index";
import ExpandableWUCard from "../../../atoms/ExpandableWUCard";

export class CardsList extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.list.length !== this.props.list.length ||
            nextProps.restrictedCardsCount !== this.props.restrictedCardsCount
        );
    }
    render() {
        return (
            <div>
                {this.props.list.map((props, i) => (
                    <ExpandableWUCard
                        {...props}
                        withAnimation
                        inDeck
                        key={i}
                        restrictedCardsCount={this.props.restrictedCardsCount}
                        isRestricted={this.props.isEligibleForOP &&
                            Boolean(restrictedCards[props.id])}
                        isBanned={this.props.isEligibleForOP &&
                            Boolean(bannedCards[props.id])}
                        isAlter={i % 2 === 0}
                        toggleCardInDeck={this.props.toggle}
                        editMode={this.props.editMode} />
                ))}
            </div>
        );
    }
}
