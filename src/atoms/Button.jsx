import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import isEqual from "lodash/isEqual";

class WUButton extends Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(nextProps, this.props);
    }

    handleClick = () => {
        this.props.onClick(this.props.args);
    };

    render() {
        return (
            <Button
                style={{ ...this.props.style }}
                disabled={this.props.disabled}
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        );
    }
}

export default WUButton;
