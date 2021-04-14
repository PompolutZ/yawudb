import React, { PureComponent, lazy } from "react";
import classnames from "classnames";
import {
    idPrefixToFaction,
    factions,
    restrictedCards,
    bannedCards,
} from "../../../data/index";
import {
    checkDeckValidFormats,
    ignoreAsDublicate,
} from "../../../utils/functions";
import { Set } from "immutable";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import ScoringOverview from "../../../atoms/ScoringOverview";
import b64toBlob from "b64-to-blob";
import Card from "./atoms/Card";
import * as ROUTES from "../../../constants/routes";
import DetailedPlayStyleValidity from "../../../atoms/DetailedPlayStyleValidity";
import * as clipboard from "clipboard-polyfill";
import {
    checkCardIsObjective,
    checkCardIsPloy,
    checkCardIsUpgrade,
    compareObjectivesByScoreType,
} from "../../../data/wudb";
import CardListSectionHeader from "../../../v2/components/CardListSectionHeader";
import { ReactComponent as EditIcon } from "../../../svgs/edit-2.svg";
import DeckSummary from "./DeckSummary";

const DeckActionsMenu = lazy(() => import("./atoms/DeckActionsMenu"));
const DeckActionMenuLarge = lazy(() => import("./atoms/DeckActionsMenuLarge"));

const cardWidthPx = 532 / 2;
const cardHeightPx = 744 / 2;

const calcCanvasSize = (cards) => {
    const objectives = cards.filter(checkCardIsObjective);
    const gambits = cards.filter(checkCardIsPloy);
    const upgrades = cards.filter(checkCardIsUpgrade);

    const objectivesWidth = 4 * (cardWidthPx + 10);
    const gambitsWidth = 4 * (cardWidthPx + 10);
    const upgradesWidth = 4 * (cardWidthPx + 10);

    const width = objectivesWidth + 21 + gambitsWidth + 21 + upgradesWidth;

    const objectivesHeight =
        Math.ceil(objectives.length / 4) * (cardHeightPx + 10);
    const gambitsHeight = Math.ceil(gambits.length / 4) * (cardHeightPx + 10);
    const upgradesHeight = Math.ceil(upgrades.length / 4) * (cardHeightPx + 10);

    const height =
        Math.max(objectivesHeight, gambitsHeight, upgradesHeight) + 20;

    return {
        width: width,
        height: height,
    };
};

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

class ReadonlyDeck extends PureComponent {
    state = {
        isDraft: false,
    };

    componentDidMount = () => {
        const cards = this.props.cards;
        const objectives = cards.filter(checkCardIsObjective);
        const gambits = cards.filter(checkCardIsPloy);
        const upgrades = cards.filter(checkCardIsUpgrade);

        this.setState({
            isDraft:
                objectives.length < 12 ||
                upgrades.length + gambits.length < 20 ||
                gambits.length > upgrades.length,
        });
    };

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
            authorDisplayName,
            isNarrow,
        } = this.props;

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
        const draft = this.state.isDraft ? ` | Draft` : "";
        const objectiveSummary = new Set(objectives)
            .groupBy((c) => c.scoreType)
            .reduce(
                (r, v, k) => {
                    r[k] = v.count();
                    return r;
                },
                [0, 0, 0, 0]
            );

        const restrictedCount = cards
            .map((c) => Boolean(restrictedCards[c.id]))
            .filter((c) => c === true).length;
        const bannedCount = cards
            .map((c) => Boolean(bannedCards[c.id]))
            .filter((c) => c === true).length;
        const rotatedOutCount = cards.filter(
            (c) =>
                c.faction === 0 &&
                Number(c.id) < 3000 &&
                !ignoreAsDublicate(c.name)
        ).length;

        const amount = {
            objectives: objectives.length,
            gambits: gambits.length,
            upgrades: upgrades.length,
            restricted: restrictedCount,
            banned: bannedCount,
            rotatedOut: rotatedOutCount,
        };

        const totalGlory = objectives.reduce(
            (acc, c) => acc + Number(c.glory),
            0
        );

        const playFormats = checkDeckValidFormats(cards.map((c) => c.id));

        return (
            <div className="flex-1 w-screen">
                <div className="flex px-4">
                    <DeckSummary
                        factionPrefix={factionId}
                        name={name}
                        author={authorDisplayName}
                        date={createdDate}
                        draft={draft}
                        sets={sets}
                    >
                        <DetailedPlayStyleValidity
                            className="relative -mx-1"
                            validFormats={playFormats}
                            cards={cards.map((c) => c.id)}
                        />
                    </DeckSummary>
                    <>
                        <div className="lg:hidden">
                            <DeckActionsMenu
                                onSaveAsPdf={this._handleSaveAsPdf}
                                onSaveText={this._handleSaveText}
                                onSaveImage={this._handleSaveImage}
                                onSaveVassalFiles={this._handleSaveVassalFiles}
                                canUpdateOrDelete={this.props.canUpdateOrDelete}
                                onEdit={
                                    <Link
                                        className="px-2"
                                        to={{
                                            pathname: `/deck/edit/${id}`,
                                            state: {
                                                deck,
                                            },
                                        }}
                                    >
                                        Edit
                                    </Link>
                                }
                                exportToUDB={this._handleExportToUDB}
                                exportToUDS={this._handleExportToUDS}
                                exportToClub={this._handleExportToClub}
                                onDelete={this.props.onDelete}
                            />
                        </div>
                        <div className="hidden lg:flex items-center">
                            <DeckActionMenuLarge
                                cardsView={this.props.cardsView}
                                onCardsViewChange={this.props.onCardsViewChange}
                                onSaveAsPdf={this._handleSaveAsPdf}
                                onSaveText={this._handleSaveText}
                                onSaveImage={this._handleSaveImage}
                                onSaveVassalFiles={this._handleSaveVassalFiles}
                                canUpdateOrDelete={this.props.canUpdateOrDelete}
                                edit={
                                    <Link
                                        className="px-4 flex hover:text-purple-800"
                                        to={{
                                            pathname: `/deck/edit/${id}`,
                                            state: {
                                                deck,
                                            },
                                        }}
                                    >
                                        <EditIcon className="mr-2" /> Edit
                                    </Link>
                                }
                                exportToUDB={this._handleExportToUDB}
                                exportToUDS={this._handleExportToUDS}
                                exportToClub={this._handleExportToClub}
                                onDelete={this.props.onDelete}
                            />
                        </div>
                    </>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-2 mb-8">
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
                        <ul className="px-3">
                            {objectives.map((v) => (
                                <Card
                                    key={v.id}
                                    card={v}
                                    asImage={this.props.cardsView}
                                />
                            ))}
                        </ul>
                    </section>
                    <section className="mt-4 lg:mt-0 px-4">
                        <CardListSectionHeader
                            className="px-2"
                            type={"Gambits"}
                            amount={gambits.length}
                        />
                        <ul className="px-3">
                            {gambits.map((v) => (
                                <Card
                                    key={v.id}
                                    card={v}
                                    asImage={this.props.cardsView}
                                />
                            ))}
                        </ul>
                    </section>
                    <section className="mt-4 lg:mt-0 px-4">
                        <CardListSectionHeader
                            className="px-2"
                            type={"Upgrades"}
                            amount={upgrades.length}
                        />
                        <ul className="px-3">
                            {upgrades.map((v) => (
                                <Card
                                    key={v.id}
                                    card={v}
                                    asImage={this.props.cardsView}
                                />
                            ))}
                        </ul>
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

    _handleSaveText = (link) => {
        const { id, name, cards } = this.props;
        let newLineChar;
        if (navigator.platform.startsWith("Win")) {
            newLineChar = "\r\n";
        } else {
            newLineChar = "\n";
        }

        const header = `Faction: ${
            factions[idPrefixToFaction[id.split("-")[0]]]
        }`;
        const cardsjs = cards.toJS();
        const objectives = cardsjs.filter((c) => c.type === 0);
        const totalGlory = objectives.reduce(
            (acc, c) => (acc += Number(c.glory)),
            0
        );
        const objectivesAsText = objectives
            .map(
                (c) =>
                    `${this._convertCardIdToPrintFormat(c.id)}${` - `}${
                        c.name
                    }${` - `}${c.glory} glory${newLineChar}`
            )
            .reduce((acc, el) => (acc += el), "");
        const objectivesSection = `Objectives - Total glory: ${totalGlory}${newLineChar}-----------------------------${newLineChar}${objectivesAsText}`;

        const gambits = cardsjs.filter((c) => c.type === 1 || c.type === 3);
        const gambitsAsText = gambits
            .map(
                (c) =>
                    `${this._convertCardIdToPrintFormat(c.id)}${` - `}${
                        c.name
                    }${newLineChar}`
            )
            .reduce((acc, el) => (acc += el), "");
        const gambitsSection = `Gambits (${gambits.length})${newLineChar}-----------------------------${newLineChar}${gambitsAsText}`;

        const upgrades = cardsjs.filter((c) => c.type === 2);
        const upgradesAsText = upgrades
            .map(
                (c) =>
                    `${this._convertCardIdToPrintFormat(c.id)}${` - `}${
                        c.name
                    }${newLineChar}`
            )
            .reduce((acc, el) => (acc += el), "");
        const upgradesSection = `Upgrades (${upgrades.length})${newLineChar}-----------------------------${newLineChar}${upgradesAsText}`;

        const location = window.location.href.endsWith(id)
            ? window.location.href
            : `${window.location.href}view/deck/${id}`;
        const footer = `-----------------------------${newLineChar}Deck URL: ${location}`;

        const content = [
            header,
            `${newLineChar}${newLineChar}`,
            objectivesSection,
            `${newLineChar}${newLineChar}`,
            gambitsSection,
            `${newLineChar}${newLineChar}`,
            upgradesSection,
            `${newLineChar}${newLineChar}`,
            footer,
        ];
        const file = new Blob(content, { type: "text/plain" });
        link.href = URL.createObjectURL(file);
        link.download = `${name}.txt`;
    };

    _handleSaveImage = (link) => {
        const { cards, name } = this.props;

        const canvas = document.getElementById("deckCanvas");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const objectives = cards
            .toJS()
            .filter((c) => c.type === 0)
            .reduce((acc, el, i, arr) => {
                if (i % 4 === 0) {
                    acc.push(arr.slice(i, i + 4));
                }
                return acc;
            }, []);

        const gambits = cards
            .toJS()
            .filter((c) => c.type === 1 || c.type === 3)
            .reduce((acc, el, i, arr) => {
                if (i % 4 === 0) {
                    acc.push(arr.slice(i, i + 4));
                }
                return acc;
            }, []);

        const upgrades = cards
            .toJS()
            .filter((c) => c.type === 2)
            .reduce((acc, el, i, arr) => {
                if (i % 4 === 0) {
                    acc.push(arr.slice(i, i + 4));
                }
                return acc;
            }, []);

        try {
            let cursorX = 10;
            let cursorY = 10;
            for (let row of objectives) {
                for (let c of row) {
                    if (restrictedCards[c.id]) {
                        ctx.fillStyle = "Goldenrod";
                        ctx.fillRect(
                            cursorX - 5,
                            cursorY - 5,
                            cardWidthPx + 10,
                            cardHeightPx + 10
                        );
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(
                        image,
                        cursorX,
                        cursorY,
                        cardWidthPx,
                        cardHeightPx
                    );
                    cursorX += cardWidthPx + 10;
                }

                cursorX = 10;
                cursorY += cardHeightPx + 10;
            }

            ctx.beginPath();
            ctx.moveTo(4 * (cardWidthPx + 10) + 10, 5);
            ctx.lineTo(
                4 * (cardWidthPx + 10) + 10,
                3 * (cardHeightPx + 10) + 10
            );
            ctx.stroke();

            cursorY = 10;
            cursorX = 4 * (cardWidthPx + 10) + 21;
            for (let row of gambits) {
                for (let c of row) {
                    if (restrictedCards[c.id]) {
                        ctx.fillStyle = "Goldenrod";
                        ctx.fillRect(
                            cursorX - 5,
                            cursorY - 5,
                            cardWidthPx + 10,
                            cardHeightPx + 10
                        );
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(
                        image,
                        cursorX,
                        cursorY,
                        cardWidthPx,
                        cardHeightPx
                    );
                    cursorX += cardWidthPx + 10;
                }

                cursorX = 4 * (cardWidthPx + 10) + 21;
                cursorY += cardHeightPx + 10;
            }

            ctx.beginPath();
            ctx.moveTo(8 * (cardWidthPx + 10) + 20, 5);
            ctx.lineTo(
                8 * (cardWidthPx + 10) + 20,
                3 * (cardHeightPx + 10) + 10
            );
            ctx.stroke();

            cursorY = 10;
            cursorX = 8 * (cardWidthPx + 10) + 31;
            for (let row of upgrades) {
                for (let c of row) {
                    if (restrictedCards[c.id]) {
                        ctx.fillStyle = "Goldenrod";
                        ctx.fillRect(
                            cursorX - 5,
                            cursorY - 5,
                            cardWidthPx + 10,
                            cardHeightPx + 10
                        );
                    }

                    const image = document.getElementById(`card_${c.id}`);
                    ctx.drawImage(
                        image,
                        cursorX,
                        cursorY,
                        cardWidthPx,
                        cardHeightPx
                    );
                    cursorX += cardWidthPx + 10;
                }

                cursorX = 8 * (cardWidthPx + 10) + 31;
                cursorY += cardHeightPx + 10;
            }

            const dataUrl = canvas.toDataURL();
            const contentType = "image/png";
            const b64Data = dataUrl.slice("data:image/png;base64,".length);
            const blob = b64toBlob(b64Data, contentType);
            link.href = URL.createObjectURL(blob);
            link.download = `${name}.png`;
        } catch (err) {
            console.error(err);
        }
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
            .map(card => Number(card.id) - 1000)
            .join();
        
        window.open(
            `https://www.underworlds-deckers.com/en/tournament-decks/?Deck=https://yawudb.com/cards,${udsEncodedCards}`
        );
    };
}

export default withRouter(withStyles(styles)(ReadonlyDeck));
