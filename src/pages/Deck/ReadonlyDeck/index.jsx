import React, { PureComponent, lazy } from "react";
import { Set } from "immutable";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ScoringOverview from "../../../atoms/ScoringOverview";
import Card from "./atoms/Card";
import DetailedPlayStyleValidity from "../../../atoms/DetailedPlayStyleValidity";
import * as clipboard from "clipboard-polyfill";
import {
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    compareObjectivesByScoreType,
} from "../../../data/wudb";
import CardListSectionHeader from "../../../v2/components/CardListSectionHeader";
import DeckSummary from "./DeckSummary";

const DeckActionsMenu = lazy(() => import("./atoms/DeckActionsMenu"));
const DeckActionMenuLarge = lazy(() => import("./atoms/DeckActionsMenuLarge"));

const cardWidthPx = 532 / 2;
const cardHeightPx = 744 / 2;

const styles = (theme) => ({
    deckHeader: {
        display: "flex",
        margin: "1rem 0 0 .5rem",
    },

    deckHeaderMenu: {
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
    },

    deckHeaderButtons: {
        display: "none",
        [theme.breakpoints.up("lg")]: {
            display: "flex",
            margin: "0 1rem 0 0",
        },
    },

    sectionItems: {
        display: "flex",
        flexFlow: "column nowrap",
    },

    cardsSectionItems: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
    },

    cardsSection: {
        flex: "1 100%",
    },
});

function CardsSectionContent({ cards, listView }) {
    return listView ? (
        <ul className="px-3">
            {cards.map((v) => (
                <Card key={v.id} card={v} />
            ))}
        </ul>
    ) : (
        <div className="flex flex-wrap max-w-7xl mx-auto">
            {cards.map((v) => (
                <Card asImage key={v.id} card={v} />
            ))}
        </div>
    );
}

class ReadonlyDeck extends PureComponent {
    render() {
        const {
            id,
            name,
            author,
            faction,
            factionId,
            cards,
            sets,
            created,
            createdutc,
            updatedutc,
        } = this.props;

        const [userInfo] = this.props.userInfo || [];
        const authorDisplayName = userInfo ? userInfo.displayName : 'Anonymous';        

        const objectives = cards
            .filter(checkCardIsObjective)
            .sort((a, b) =>
                compareObjectivesByScoreType(a.scoreType, b.scoreType)
            );

        const gambits = cards
            .filter(checkCardIsPloy)
            .sort((a, b) => a.name.localeCompare(b.name));

        const upgrades = cards
            .filter(checkCardIsUpgrade)
            .sort((a, b) => a.name.localeCompare(b.name));

        const deck = {
            id,
            name,
            author,
            faction,
            factionId,
            sets,
            created,
            createdutc,
            updatedutc,
            objectives,
            gambits,
            upgrades,
        };

        const createdDate = updatedutc
            ? ` | ${new Date(updatedutc).toLocaleDateString()}`
            : created
            ? ` | ${new Date(created).toLocaleDateString()}`
            : "";

        const objectiveSummary = new Set(objectives)
            .groupBy((c) => c.scoreType)
            .reduce(
                (r, v, k) => {
                    r[k] = v.count();
                    return r;
                },
                [0, 0, 0, 0]
            );

        const totalGlory = objectives.reduce(
            (acc, c) => acc + Number(c.glory),
            0
        );

        return (
            <div className="flex-1 w-screen">
                <div className="flex px-4">
                    <DeckSummary
                        factionPrefix={factionId}
                        name={name}
                        author={authorDisplayName}
                        date={createdDate}
                        sets={sets}
                    >
                        <DetailedPlayStyleValidity
                            className="relative -mx-1"
                            cards={cards.map((c) => c.id)}
                        />
                    </DeckSummary>
                    <>
                        <div className="lg:hidden">
                            <DeckActionsMenu
                                deck={deck}
                                deckId={id}
                                canUpdateOrDelete={this.props.canUpdateOrDelete}
                                exportToUDB={this._handleExportToUDB}
                                exportToUDS={this._handleExportToUDS}
                                exportToClub={this._handleExportToClub}
                                createShareableLink={this._handleCreateShareableLink}
                                onDelete={this.props.onDelete}
                            />
                        </div>
                        <div className="hidden lg:flex items-center">
                            <DeckActionMenuLarge
                                cardsView={this.props.cardsView}
                                onCardsViewChange={this.props.onCardsViewChange}
                                onSaveVassalFiles={this._handleSaveVassalFiles}
                                canUpdateOrDelete={this.props.canUpdateOrDelete}
                                deck={deck}
                                deckId={id}
                                exportToUDB={this._handleExportToUDB}
                                exportToUDS={this._handleExportToUDS}
                                exportToClub={this._handleExportToClub}
                                createShareableLink={this._handleCreateShareableLink}
                                onDelete={this.props.onDelete}
                            />
                        </div>
                    </>
                </div>

                <div
                    className={`lg:grid lg:gap-2 mb-8 ${
                        this.props.cardsView
                            ? ""
                            : "lg:grid-cols-3"
                    }`}
                >
                    <section className="px-4">
                        <CardListSectionHeader
                            className="px-2"
                            type={"Objectives"}
                            amount={objectives.length}
                        >
                            <ScoringOverview
                                summary={objectiveSummary}
                                glory={totalGlory}
                            />
                        </CardListSectionHeader>
                        <CardsSectionContent
                            cards={objectives}
                            listView={!this.props.cardsView}
                        />
                    </section>
                    <section className="mt-4 lg:mt-0 px-4">
                        <CardListSectionHeader
                            className="px-2"
                            type={"Gambits"}
                            amount={gambits.length}
                        />
                        <CardsSectionContent
                            cards={gambits}
                            listView={!this.props.cardsView}
                        />
                    </section>
                    <section className="mt-4 lg:mt-0 px-4">
                        <CardListSectionHeader
                            className="px-2"
                            type={"Upgrades"}
                            amount={upgrades.length}
                        />
                        <CardsSectionContent
                            cards={upgrades}
                            listView={!this.props.cardsView}
                        />{" "}
                    </section>
                </div>
            </div>
        );
    }

    _handleSaveVassalFiles = () => {
        const { name, cards } = this.props;
        const objectives = cards
            .filter(({ type }) => type === "Objective")
            .map((c) => [`${c.id}`.padStart(5, "0"), c.name])
            .map(
                ([cardId, name]) =>
                    String.fromCharCode(27) +
                    `+/1600466341244/mark;RealCardName\tmacro;Puts back;;;DeckName = OBJECTIVE CARDS LEFT WIDE || DeckName = OBJECTIVE CARDS RIGHT WIDE;74\\,715;74\\,585;false;;;counted;;;;false;;1;1\\\treport;74\\,585;$PlayerName$ puts back an OBJECTIVE CARD;;;Puts back\\\\\tmacro;Location is not offboard;;;OldLocationName = OBJECTIVE CARDS LEFT WIDE || OldLocationName = OBJECTIVE CARDS RIGHT WIDE;74\\,715;74\\,195;false;;;counted;;;;false;;1;1\\\\\\\tmacro;Make playerside 2;;74,715;PlayerSide = PLAYER 2 && PlayerOwnership = NONE;;40\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\tmacro;Make playerside 1;;74,715;PlayerSide = PLAYER 1 && PlayerOwnership = NONE;;35\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\treport;74\\,195;$PlayerName$ draws an OBJECTIVE CARD;;;\\\\\\\\\\\\\tPROP;PlayerOwnership;false,0,100,false;:35\\,130:P\\,PLAYER1,:40\\,130:P\\,PLAYER2\\\\\\\\\\\\\\\tmacro;p2 return to deck;;72,130;PlayerOwnership = PLAYER2;;98\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\\\\\\\tmacro;p1 return to deck;;72,130;PlayerOwnership = PLAYER1;;97\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\\\\\\\\\treturn;;98,130;OBJECTIVE CARDS RIGHT WIDE;Select destination\\\\\\\\\\\\\\\\\\\\\treturn;;97,130;OBJECTIVE CARDS LEFT WIDE;Select destination\\\\\\\\\\\\\\\\\\\\\\\tobs;70,130;Objectives background.png;REVEAL;GHiddnoverlay 2.png;?;player:;Peek\\\\\\\\\\\\\\\\\\\\\\\\\treport;68\\,195;$PlayerName$ Deleted: $PieceName$;;;INFORME TIRADA\\\\\\\\\\\\\\\\\\\\\\\\\\\timmob;g;N\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tmark;MapLayers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tdelete;Delete;68,195\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tpiece;;;${cardId}.png;${cardId}/${name}\t\\\t-1\\\\\t\\\\\\\t\\\\\\\\\t\\\\\\\\\\\t-1\\\\\\\\\\\\\tNONE\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\tnull;\\\\\\\\\\\\\\\\\\\\\\\\\t-1\\\\\\\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tCardsLayers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tnull;2852;244;0;6;OldZone;;OldLocationName;offboard;OldX;2256;OldY;832;OldBoard;BOARD WIDE;OldMap;MESA - BOARD`
            );

        const powers = cards
            .filter(({ type }) => type !== "Objective")
            .map((c) => [`${c.id}`.padStart(5, "0"), c.name])
            .map(
                ([cardId, name]) =>
                    String.fromCharCode(27) +
                    `+/1600453884603/mark;RealCardName\tmacro;Puts back;;;DeckName = POWER CARDS LEFT WIDE || DeckName = POWER CARDS RIGHT WIDE;74\\,715;74\\,585;false;;;counted;;;;false;;1;1\\\treport;74\\,585;$PlayerName$ puts back a POWER CARD;;;Puts back\\\\\tmacro;Location is not offboard;;;OldLocationName = POWER CARDS LEFT WIDE || OldLocationName = POWER CARDS RIGHT WIDE;74\\,715;74\\,195;false;;;counted;;;;false;;1;1\\\\\\\tmacro;Make playerside 2;;74,715;PlayerSide = PLAYER 2 && PlayerOwnership = NONE;;40\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\tmacro;Make playerside 1;;74,715;PlayerSide = PLAYER 1 && PlayerOwnership = NONE;;35\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\treport;74\\,195;$PlayerName$ draws a POWER CARD;;;\\\\\\\\\\\\\tPROP;PlayerOwnership;false,0,100,false;:35\\,130:P\\,PLAYER1,:40\\,130:P\\,PLAYER2\\\\\\\\\\\\\\\tmacro;p2 return to deck;;72,130;PlayerOwnership = PLAYER2;;98\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\\\\\\\tmacro;p1 return to deck;;72,130;PlayerOwnership = PLAYER1;;97\\,130;false;;;counted;;;;false;;1;1\\\\\\\\\\\\\\\\\\\treturn;;98,130;POWER CARDS RIGHT WIDE;Select destination\\\\\\\\\\\\\\\\\\\\\treturn;;97,130;POWER CARDS LEFT WIDE;Select destination\\\\\\\\\\\\\\\\\\\\\\\tobs;70,130;powercardsback.png;REVEAL;GHiddnoverlay 2.png;?;player:;Peek\\\\\\\\\\\\\\\\\\\\\\\\\treport;68\\,195;$PlayerName$ Deleted: $PieceName$;;;INFORME TIRADA\\\\\\\\\\\\\\\\\\\\\\\\\\\timmob;g;N\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tmark;MapLayers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tdelete;Delete;68,195\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tpiece;;;${cardId}.png;${cardId}/${name}\t\\\t-1\\\\\t\\\\\\\t\\\\\\\\\t\\\\\\\\\\\t-1\\\\\\\\\\\\\tNONE\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\tnull;\\\\\\\\\\\\\\\\\\\\\\\\\t-1\\\\\\\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tCardsLayers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\t\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\tnull;2543;244;0;6;OldZone;;OldLocationName;offboard;OldX;2204;OldY;1108;OldBoard;BOARD WIDE;OldMap;MESA - BOARD`
            );

        this.downloadVassalDeckWithTempLink(
            objectives,
            `${name}_OBJECTIVES.txt`
        );
        this.downloadVassalDeckWithTempLink(powers, `${name}_POWERS.txt`);
    };

    downloadVassalDeckWithTempLink = (deck, fileName) => {
        const tempDownloadLink = document.createElement("a");
        tempDownloadLink.style.display = "none";
        document.body.appendChild(tempDownloadLink);

        const content = ["DECK\t\r", ...deck];

        const file = new Blob(content, { type: "text/plain" });
        tempDownloadLink.href = URL.createObjectURL(file);
        tempDownloadLink.download = fileName;
        tempDownloadLink.click();

        document.body.removeChild(tempDownloadLink);
    };

    _convertCardIdToPrintFormat = (cardId) => {
        switch (cardId.slice(0, 2)) {
            case "02":
                return `L${cardId.slice(-3)}`;
            case "03":
                return `N${cardId.slice(-3)}`;
            default:
                return cardId.slice(-3);
        }
    };

    _handleExportToUDB = () => {
        const encodeToUDB = (card) => {
            if (card.startsWith("02")) return `L${Number(card.slice(-3))}`;
            if (card.startsWith("03")) return `N${Number(card.slice(-3))}`;
            if (card.startsWith("04")) return `P${Number(card.slice(-3))}`;
            if (card.startsWith("05")) return `D${Number(card.slice(-3))}`;
            if (card.startsWith("06")) return `B${Number(card.slice(-3))}`;
            if (card.startsWith("07")) return `G${Number(card.slice(-3))}`;
            if (card.startsWith("08")) return `A${Number(card.slice(-3))}`;
            if (card.startsWith("09")) return `DC${Number(card.slice(-3))}`;
            if (card.startsWith("10")) return `S${Number(card.slice(-3))}`;
            if (card.startsWith("11")) return `E${Number(card.slice(-3))}`;

            return Number(card.slice(-3));
        };

        const udbEncodedCards = this.props.cards
            .map((card) => `${card.id}`.padStart(5, "0"))
            .map(encodeToUDB)
            .sort()
            .join();
        window.open(
            `https://www.underworldsdb.com/shared.php?deck=0,${udbEncodedCards}`
        );
    };

    _handleExportToClub = () => {
        const objectives = this.props.cards
            .filter(checkCardIsObjective)
            .map((card) => `${card.id}`.padStart(5, "0"));

        const powers = this.props.cards
            .filter((c) => !checkCardIsObjective(c))
            .map((card) => `${card.id}`.padStart(5, "0"));

        const deck = JSON.stringify([objectives, powers]);
        clipboard.writeText(deck);
    };

    _handleExportToUDS = () => {
        const udsEncodedCards = this.props.cards
            .map((card) => Number(card.id) - 1000)
            .join();

        window.open(
            `https://www.underworlds-deckers.com/en/tournament-decks/?Deck=https://yawudb.com/cards,${udsEncodedCards}`
        );
    };

    _handleCreateShareableLink = () => {
        const link = `${import.meta.env.VITE_BASE_URL}/deck/transfer/wuc,${this.props.cards.map(card => card.id).join(',')}`
        clipboard.writeText(link);
        this.props.showToast('Link copied to clipboard!')
    }
}

export default withRouter(withStyles(styles)(ReadonlyDeck));
