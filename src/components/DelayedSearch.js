import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class DelayedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchInputChange(e) {
        console.log(e.target.value.toUpperCase());
        this.setState({text: e.target.value.toUpperCase()});
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.onSearchInputChange(this.state.text), 350);
    }

    render() {
        return (
            <TextField 
            id="search"
            label="Search for any text"
            type="search"
            margin="normal"
            style={{width: '100%'}}
            onChange={this.handleSearchInputChange} />
        );
    }
}

export default DelayedSearch;