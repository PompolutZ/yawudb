import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { factionIndexes } from "../data/index";
import { ButtonBase } from "@material-ui/core";
import classnames from "classnames";

const iconStyles = (theme) => ({
    button: {
        borderRadius: "1.25rem",
        width: "2.5rem",
        height: "2.5rem",
        margin: ".2rem",
        transition: theme.transitions.create("width", {
            duration: "350ms",
        }),
    },

    selectedButton: {
        borderRadius: "1.75rem",
        width: "3.5rem",
        height: "3.5rem",
        margin: ".2rem",
        transition: theme.transitions.create("width", {
            duration: "350ms",
        }),
    },

    bwicon: {
        width: "2rem",
        height: "2rem",
        // transition: theme.transitions.create(['width', 'height'], {
        //     duration: '3s',
        // }),
    },

    icon: {
        width: "3rem",
        height: "3rem",
        // transition: theme.transitions.create(['width', 'height'], {
        //     duration: '1s',
        // }),
    },
});

class Icon extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <ButtonBase
                className={classnames(classes.button, {
                    [classes.selectedButton]:
                        this.props.selectedIcon === this.props.icon,
                })}
                onClick={this.handleClick}
            >
                {this.props.selectedIcon === this.props.icon && (
                    <img
                        src={`/assets/icons/${this.props.icon}.png`}
                        alt={this.props.icon}
                        className={classes.icon}
                    />
                )}
                {this.props.selectedIcon !== this.props.icon && (
                    <img
                        src={`/assets/icons/${this.props.icon}-bw.png`}
                        alt={this.props.icon}
                        className={classes.bwicon}
                    />
                )}
            </ButtonBase>
        );
    }

    handleClick = () => {
        this.props.onSelect(this.props.icon);
    };
}

const StyledIcon = withStyles(iconStyles)(Icon);

const styles = (theme) => ({
    container: {
        display: "flex",
        flexFlow: "row wrap",
        maxWidth: "20rem",
        alignItems: "center",
    },
});

class AvatarPicker extends PureComponent {
    state = {
        selectedIcon: this.props.defaultAvatar
            ? this.props.defaultAvatar.split("/")[3].split(".")[0]
            : factionIndexes[1] + "-icon",
        icons: factionIndexes.slice(1).map((f) => f + "-icon"),
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {this.state.icons.map((icon) => (
                    <StyledIcon
                        key={icon}
                        icon={icon}
                        selectedIcon={this.state.selectedIcon}
                        onSelect={this.selectIcon}
                    />
                ))}
            </div>
        );
    }

    selectIcon = (icon) => {
        this.setState({ selectedIcon: icon });
        this.props.onSelectionChange(`/assets/icons/${icon}.png`);
    };
}

export default withStyles(styles)(AvatarPicker);
