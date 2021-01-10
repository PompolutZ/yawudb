import React, { PureComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { cardsDb } from "../data/index";
import VirtualizedCardsList from "../components/VirtualizedCardsList";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { connect } from "react-redux";
import { SET_SCROLL_INDEX } from "../reducers/library";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Helmet } from "react-helmet";
// import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        margin: ".5rem",
        width: "calc(100% - 1rem)",
        height: "100%",
    },

    cardsContainer: {
        width: "100%",
        height: "100%",
    },

    formControl: {
        minWidth: 120,
        margin: "0 0 1rem 0",
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const VIEW_AS_SIMPLE_LIST = "VIEW_AS_SIMPLE_LIST";
const VIEW_AS_CARD_IMAGES = "VIEW_AS_CARD_IMAGES";

class LibraryViewVariantMenu extends PureComponent {
    state = {
        anchorEl: null,
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div style={this.props.style}>
                <IconButton
                    aria-owns={anchorEl ? "actions-menu" : undefined}
                    aria-haspopup
                    onClick={this.handleOpaneMenu}
                    style={{
                        backgroundColor: "#3B9979",
                        color: "white",
                        margin: "0 0 1rem 0",
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem
                        onClick={this.onSetViewVariant.bind(
                            this,
                            VIEW_AS_SIMPLE_LIST
                        )}
                    >
                        View As Simple List
                    </MenuItem>
                    <MenuItem
                        onClick={this.onSetViewVariant.bind(
                            this,
                            VIEW_AS_CARD_IMAGES
                        )}
                    >
                        View As Scans
                    </MenuItem>
                </Menu>
            </div>
        );
    }

    onSetViewVariant = (variant) => {
        this.props.onSetViewVariant(variant);
        this.setState({ anchorEl: null });
    };

    handleOpaneMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
}

function Library(props) {
    const classes = useStyles();
    const [cards, setCards] = React.useState([]);
    const [viewVariant, setViewVariant] = React.useState(VIEW_AS_SIMPLE_LIST);
    const cardsContainerRef = React.createRef();

    React.useEffect(() => {
        let cards = [];
        for (let c in cardsDb) {
            cards.push({ id: c, ...cardsDb[c] });
        }

        setCards(cards);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    Warhammer Underworlds: Nightvault (Shadespire) Cards Library
                </title>
                <link rel="canonical" href="https://yawudb.com/library" />
            </Helmet>

            <div className={classes.root}>
                <div className={classes.cardsContainer} ref={cardsContainerRef}>
                    {cards.length > 0 && (
                        <VirtualizedCardsList
                            cards={cards}
                            key={viewVariant}
                            containerRef={cardsContainerRef.current}
                            scrollIndex={props.scrollIndex}
                            setLastScrollIndex={props.setLastScrollIndex}
                            variant={viewVariant}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        scrollIndex: state.library.scrollIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLastScrollIndex: (index) =>
            dispatch({ type: SET_SCROLL_INDEX, payload: index }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
