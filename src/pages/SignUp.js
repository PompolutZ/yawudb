import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import EmailAndPasswordForm from "../components/EmailAndPasswordForm";
import { TextField } from "@material-ui/core";
import AvatarPicker from "../components/AvatarPicker";
import { connect } from "react-redux";
import { withFirebase } from "../firebase";

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        background: "white"
    },

    innerContainer: {
        margin: "auto",
    },

    title: {
        margin: "0 0 1rem 0",
        fontFamily: "roboto",
    },
});

const ErrorMessage = ({ error }) => {
    if (!error) {
        return <span></span>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "center",
                maxWidth: "20rem",
            }}
        >
            <div style={{ color: "red", margin: "1rem" }}>{error}</div>
        </div>
    );
};

class SignUp extends PureComponent {
    state = {
        signUpError: null,
        displayName: "",
        avatar: `/assets/icons/garreks-reavers-icon.png`,
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <div className={classes.title}>
                        Create new account for YAWUDB:{" "}
                    </div>
                    <div>Pick your avatar image: </div>
                    <AvatarPicker onSelectionChange={this.handleAvatarChange} />
                    <TextField
                        id="with-placeholder"
                        label="Profile name"
                        value={this.state.displayName}
                        margin="none"
                        onChange={this.handleUseNameChange}
                        style={{ margin: "1rem auto", minWidth: "20rem" }}
                    />
                    <EmailAndPasswordForm
                        purpose="Sign up"
                        onUseCredentials={this.handleSignUp}
                    />
                    <ErrorMessage error={this.state.signUpError} />
                </div>
            </div>
        );
    }

    handleUseNameChange = (e) => {
        this.setState({ displayName: e.target.value });
    };

    handleAvatarChange = (avatar) => {
        this.setState({ avatar: avatar });
    };

    handleSignUp = async (username, password) => {
        try {
            this.setState({ signUpError: null });
            const result = await this.props.firebase.createUserWithEmailAndPassword(
                username,
                password
            );
            const payload = {
                displayName: this.state.displayName,
                mydecks: [],
                role: "soul",
                avatar: this.state.avatar,
            };

            const uid = result.user.uid;

            await this.props.firebase.db
                .collection("users")
                .doc(uid)
                .set(payload);
            this.props.onSignUp({
                displayName: payload.displayName,
                role: payload.role,
                avatar: payload.avatar,
                uid,
            });
            this.props.history.push("/mydecks");
        } catch (err) {
            this.setState({ signUpError: err.message });
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    onSignUp: (user) => dispatch({ type: "SET_USER", user: user }),
});

export default connect(
    null,
    mapDispatchToProps
)(withFirebase(withRouter(withStyles(styles)(SignUp))));
