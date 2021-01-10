import React, { PureComponent } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../firebase";

class PasswordResetRequest extends PureComponent {
    state = {
        emailSent: false,
        email: "",
        redirectCountdown: 3,
        errorMessage: "",
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {!this.state.emailSent && (
                    <React.Fragment>
                        <TextField
                            id="username"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            margin="normal"
                        />

                        <Button
                            className={classes.button}
                            onClick={this.handleClick}
                        >
                            Request password reset
                        </Button>
                        <div className={classes.errorMsg}>
                            {this.state.errorMessage}
                        </div>
                    </React.Fragment>
                )}
                {this.state.emailSent && (
                    <React.Fragment>
                        <div style={{ margin: "5rem auto 1rem auto" }}>
                            Email with a link to reset your password has been
                            sent.
                        </div>
                        <div style={{ margin: "0 auto 5rem auto" }}>
                            Back to the gates in {this.state.redirectCountdown}{" "}
                            seconds...
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    handleClick = async () => {
        try {
            await this.props.firebase.auth.sendPasswordResetEmail(
                this.state.email
            );
            this.setState({ emailSent: true });
            const intervalHook = setInterval(() => {
                this.setState(
                    (state) => ({
                        redirectCountdown: state.redirectCountdown - 1,
                    }),
                    () => {
                        if (this.state.redirectCountdown <= 0) {
                            clearInterval(intervalHook);
                            this.props.history.replace("/login");
                        }
                    }
                );
            }, 1000);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
    };
}

const styles = (theme) => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
    },

    textField: {
        width: "20rem",
        flex: "1 0 auto",
        margin: "2rem auto",
    },

    button: {
        color: "#3B9979",
        margin: "0 auto 0 auto",
    },

    errorMsg: {
        color: "red",
        margin: "0 auto",
    },
});

export default withFirebase(
    withRouter(withStyles(styles)(PasswordResetRequest))
);
