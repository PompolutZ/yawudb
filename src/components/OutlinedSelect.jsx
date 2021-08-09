import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class OutlinedSelect extends Component {
    render() {
        const { classes } = this.props;
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={(ref) => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor={this.props.id}
                >
                    Age
                </InputLabel>
                <Select
                    value={this.state.age}
                    onChange={this.handleChange}
                    input={
                        <Input
                            labelWidth={
                                this.labelRef ? this.labelRef.offsetWidth : 0
                            }
                            name="age"
                            id={this.props.id}
                        />
                    }
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(OutlinedSelect);
