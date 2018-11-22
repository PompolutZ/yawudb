import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import isEqual from 'lodash/isEqual';

class WUTextField extends Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(nextProps, this.props);
    }

    render() {
        return (
            <TextField
                id="with-placeholder"
                label={this.props.label}
                value={this.props.value}  
                margin="none"
                style={{flex: '1 1 auto'}}
                onChange={this.props.onValueChange}
                />
        );
    }
}

export default WUTextField;