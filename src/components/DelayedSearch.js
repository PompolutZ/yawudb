import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdorment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = {
    root: {
        color: '#3B9979',
    },
    focused: {
        color: 'magenta'
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #3B9979'
        },
        '&:after': {
            borderBottom: '2px solid #3B9979'
        }
    }
}

class DelayedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchInputChange(e) {
        this.setState({text: e.target.value.toUpperCase()});
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => this.props.onSearchInputChange(this.state.text), 350);
    }

    render() {
        const { classes } = this.props;
        return (
            <TextField 
            id="search"
            label="Search for any text"
            type="search"
            margin="normal"
            style={{width: '100%'}}
            InputLabelProps={{
                className: classes.root      
            }}
            InputProps={{
                className: classnames(classes.underline),
                startAdornment: (
                    <InputAdorment position="start">
                        <SearchIcon />
                    </InputAdorment>
                )
            }}
            onChange={this.handleSearchInputChange} />
        );
    }
}

export default withStyles(styles)(DelayedSearch);