import React, { Component, PureComponent } from "react";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import AvatarPicker from "../components/AvatarPicker";
import { setsIndex } from "../data/index";
import { withStyles } from "@material-ui/core/styles";
import ExpansionIcon from "../atoms/ExpansionIcon";
import AddIcon from "@material-ui/icons/Add";
import { UPDATE_EXPANSIONS } from "../reducers/userExpansions";
import { withFirebase } from "../firebase";
import keys from "lodash/keys";

const expansionCounterStyle = (theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        margin: ".3rem",
    },

    addBtn: {
        backgroundColor: "#3B9979",
        color: "white",
        width: "2rem",
        height: "2rem",
        marginLeft: ".3rem",
    },

    removeBtn: {
        backgroundColor: "#8A1C1C",
        color: "white",
        width: "2rem",
        height: "2rem",
        marginRight: ".3rem",
    },

    counter: {
        backgroundColor: "#3B9979",
        color: "white",
        display: "flex",
        border: "1px solid white",
        borderRadius: ".5rem",
        position: "absolute",
        fontSize: ".7rem",
        bottom: 0,
        right: 0,
        width: "1rem",
        height: "1rem",
    },

    removeIcon: {
        transform: "rotate(45deg)",
    },
});

class ExpansionCounter extends PureComponent {
    state = {
        count: !this.props.count ? 0 : this.props.count,
    };

    render() {
        const { classes, set } = this.props;
        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleDecrement}
                    style={{
                        backgroundColor: "#8A1C1C",
                        color: "white",
                        width: "2rem",
                        height: "2rem",
                        marginRight: ".3rem",
                        padding: 0,
                    }}
                >
                    <AddIcon className={classes.removeIcon} />
                </IconButton>
                <div
                    style={{
                        position: "relative",
                        opacity: this.state.count > 0 ? 1 : 0.2,
                    }}
                >
                    <ExpansionIcon set={set} variant="large" />
                    {this.state.count > 1 && (
                        <div className={classes.counter}>
                            <div style={{ margin: "auto" }}>
                                {this.state.count}
                            </div>
                        </div>
                    )}
                </div>
                <IconButton
                    onClick={this.handleIncrement}
                    style={{
                        backgroundColor: "#3B9979",
                        color: "white",
                        width: "2rem",
                        height: "2rem",
                        marginLeft: ".3rem",
                        padding: 0,
                    }}
                >
                    <AddIcon />
                </IconButton>
            </div>
        );
    }

    handleDecrement = () => {
        this.setState((state) => {
            const count = state.count > 0 ? state.count - 1 : 0;
            this.props.onCounterChange(this.props.set, count);
            return { count: count };
        });
    };

    handleIncrement = () => {
        this.setState((state) => {
            const count = state.count + 1;
            this.props.onCounterChange(this.props.set, count);
            return { count: count };
        });
    };
}

const StyledExpansionCounter = withStyles(expansionCounterStyle)(
    ExpansionCounter
);

class UserProfile extends Component {
    state = {
        userName:
            !this.props.userInfo !== null
                ? this.props.userInfo.displayName
                : "",
        avatar: this.props.userInfo.avatar,
        expansions: this.props.expansions,
    };

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    alignItems: "center",
                    maxWidth: "800px",
                    background: "white",
                }}
            >
                <div style={{ margin: "0 0 0 1rem" }}>
                    <div
                        style={{
                            margin: "0 0 0 .7rem",
                            fontSize: ".7rem",
                            color: "gray",
                        }}
                    >
                        Pick your avatar image:{" "}
                    </div>
                    <AvatarPicker
                        onSelectionChange={this.handleAvatarChange}
                        defaultAvatar={this.state.avatar}
                    />
                </div>
                <TextField
                    id="with-placeholder"
                    label="Profile name"
                    value={this.state.userName}
                    margin="none"
                    onChange={this.handleUseNameChange}
                    style={{ margin: "1rem auto", minWidth: "20rem" }}
                />
                <Typography
                    style={{ margin: "0 1rem 1rem 1.8rem", minWidth: "20rem" }}
                >
                    Note: Your profile name will be visible to others as an
                    author name for the decks you've made.
                </Typography>

                <Typography
                    variant="subtitle2"
                    style={{ margin: "0 1rem 0 1.8rem", minWidth: "20rem" }}
                >
                    Mark which sets and how many of them you own. This
                    information is required for you to use "Find conflicts in
                    your decks" feature.
                </Typography>
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "space-evenly",
                    }}
                >
                    {setsIndex.map((s, i) => (
                        <StyledExpansionCounter
                            key={s}
                            set={i}
                            count={this.state.expansions[i]}
                        />
                    ))}
                </div>
                <Button
                    style={{ margin: "1rem auto" }}
                    onClick={this.handleSave}
                >
                    Save
                </Button>

                <Button
                    style={{ color: "red" }}
                    onClick={this.handleDeleteCache}
                >
                    Delete Cache
                </Button>
                <Typography
                    variant="subtitle2"
                    style={{ margin: "0 1rem 0 1.8rem", minWidth: "20rem" }}
                >
                    Experimental attempt to make dirty clean up.
                </Typography>
            </div>
        );
    }

    handleUseNameChange = (e) => {
        this.setState({ userName: e.target.value });
    };

    handleAvatarChange = (avatar) => {
        this.setState({ avatar: avatar });
    };

    handleCounterChange = (set, count) => {
        this.setState(
            (state) => ({
                expansions: { ...state.expansions, ...{ [set]: count } },
            }),
            () => {}
        );
    };

    handleDeleteCache = () => {
        var yawudbKeys = keys(localStorage).filter((key) =>
            key.startsWith("yawudb")
        );
        for (let k of yawudbKeys) {
            localStorage.removeItem(k);
        }
        localStorage.removeItem("state");
    };

    handleSave = async () => {
        const userRef = this.props.firebase.db
            .collection("users")
            .doc(this.props.userInfo.uid);
        const cache = JSON.parse(localStorage.getItem("yawudb_decks")) || {};
        try {
            await userRef.update({
                displayName: this.state.userName,
                avatar: this.state.avatar,
                expansions: this.state.expansions,
            });
            for (let [key, value] of Object.entries(this.props.mydecks)) {
                const updatedDeck = {
                    ...value,
                    authorDisplayName: this.state.userName,
                    created: Date(),
                };
                localStorage.setItem(
                    "yawudb_decks",
                    JSON.stringify({ ...cache, [key]: updatedDeck })
                );
            }
            this.props.setUser({
                ...this.props.userInfo,
                displayName: this.state.userName,
                avatar: this.state.avatar,
            });
            this.props.updateUserExpansions(this.state.expansions);
        } catch (err) {
            console.error("ERROR_UPDATE_PROFILE", err);
        }
    };
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.auth,
        expansions: state.userExpansions,
        mydecks: state.mydecks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({ type: "SET_USER", user: user }),
        updateUserExpansions: (expansions) =>
            dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(UserProfile));
