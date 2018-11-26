import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';

class WUButton extends Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(nextProps, this.props);
    }

    render() {
        return (
            <Button style={{ ...this.props.style }} disabled={this.props.disabled} onClick={this.props.onClick}>
                { this.props.children }
            </Button>
        );
    }
}

export default WUButton;