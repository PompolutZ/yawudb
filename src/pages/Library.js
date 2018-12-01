import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { cardsDb } from '../data/index';
import VirtualizedCardsList from '../components/VirtualizedCardsList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import { SET_SCROLL_INDEX } from '../reducers/library';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        margin: '1rem'
    },
    
    formControl: {
        minWidth: 120,
        margin: '0 0 1rem 0'
    },
    
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },    
});

const VIEW_AS_SIMPLE_LIST = 'VIEW_AS_SIMPLE_LIST';
const VIEW_AS_CARD_IMAGES = 'VIEW_AS_CARD_IMAGES';  

class LibraryViewVariantMenu extends PureComponent {
    state = {
        anchorEl: null
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div style={this.props.style}>
                <IconButton 
                    aria-owns={anchorEl ? 'actions-menu' : undefined }
                    aria-haspopup
                    onClick={this.handleOpaneMenu}
                    style={{ backgroundColor: '#3B9979', color: 'white', margin: '0 0 1rem 0'}}>
                    <VisibilityIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.onSetViewVariant.bind(this, VIEW_AS_SIMPLE_LIST)}>View As Simple List</MenuItem>
                    <MenuItem onClick={this.onSetViewVariant.bind(this, VIEW_AS_CARD_IMAGES)}>View As Scans</MenuItem>
                </Menu>
            </div>

        );
    }

    onSetViewVariant = variant => {
        this.props.onSetViewVariant(variant);
        this.setState({ anchorEl: null });
    }

    handleOpaneMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
}

class Library extends PureComponent {
    state = {
        cards: [],
        viewVariant: VIEW_AS_SIMPLE_LIST
    }

    componentDidMount = () => {
        let cards = []
        for(let c in cardsDb) {
            cards.push({ id: c, ...cardsDb[c] });
        }

        this.setState({ cards: cards });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleViewVariantChanged = variant => {
        this.setState({ viewVariant: variant });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <LibraryViewVariantMenu onSetViewVariant={this.handleViewVariantChanged} />
                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="view-mode">View Library As:</InputLabel>
                    <Select
                        value={this.state.viewVariant}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'viewVariant',
                            id: 'view-mode',
                        }}
                    >
                        <MenuItem value={VIEW_AS_SIMPLE_LIST}>Simple list</MenuItem>
                        <MenuItem value={VIEW_AS_CARD_IMAGES}>Card images</MenuItem>
                    </Select>
                </FormControl> */}
                {
                    this.state.cards.length > 0 && (
                        <VirtualizedCardsList cards={this.state.cards}
                            key={this.state.viewVariant} 
                            scrollIndex={this.props.scrollIndex}
                            setLastScrollIndex={this.props.setLastScrollIndex}
                            variant={this.state.viewVariant} />
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        scrollIndex: state.library.scrollIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLastScrollIndex: index => dispatch({ type: SET_SCROLL_INDEX, payload: index }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Library));