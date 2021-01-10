import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";

const emailAndPasswordStyles = (theme) => ({
    container: {
        display: "flex",
        flexFlow: "column nowrap",
    },

    textField: {
        width: "20rem",
    },
});

class EmailPasswordForm extends PureComponent {
    state = {
        username: "",
        password: "",
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    id="username"
                    label="Email"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChangeUsername}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    margin="normal"
                />

                <Link
                    onClick={this.props.onResetPasswordClick}
                    style={{ color: "#3B9979", cursor: "pointer" }}
                >
                    Forgot your password?
                </Link>
                <Button
                    style={{ color: "#3B9979", marginTop: "1rem" }}
                    onClick={this.handleClick}
                >
                    {this.props.purpose}
                </Button>
            </div>
        );
    }

    handleClick = () => {
        this.props.onUseCredentials(this.state.username, this.state.password);
    };

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    };

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };
}

export default withStyles(emailAndPasswordStyles)(EmailPasswordForm);
