import React, { Component } from "react";
import posed from "react-pose";
import Button from "@material-ui/core/Button";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import "./ExpandButton.css";

const poseConfig = {
    first: {
        rotate: 0,
        transition: {
            duration: 175,
        },
    },

    last: {
        rotate: 180,
        transition: {
            duration: 175,
        },
    },
};

const ButtonAnimationContainer = posed.div(poseConfig);

class ExpandButton extends Component {
    constructor(props) {
        super(props);

        this.toggleExpandButton = this.toggleExpandButton.bind(this);

        this.state = {
            isVisible: true,
        };
    }

    toggleExpandButton() {
        this.setState({ isVisible: !this.state.isVisible });
        this.props.onToggle();
    }

    render() {
        return (
            <ButtonAnimationContainer
                className="buttonContainer"
                pose={this.state.isVisible ? "first" : "last"}
            >
                <Button
                    onClick={this.toggleExpandButton}
                    variant="fab"
                    mini={true}
                    color="primary"
                    style={{ borderRadius: "25px", align: "center" }}
                >
                    <ArrowDropDownCircleIcon />
                </Button>
            </ButtonAnimationContainer>
        );
    }
}

export default ExpandButton;
