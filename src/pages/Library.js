import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { cardsDb } from '../data/index';
import VirtualizedCardsList from '../components/VirtualizedCardsList';
import { connect } from 'react-redux';
import { SET_SCROLL_INDEX } from '../reducers/library';

const styles = theme => ({
    root: {
        display: 'flex',
        margin: '1rem'
    }
});

class Library extends PureComponent {
    state = {
        cards: []
    }

    componentDidMount = () => {
        let cards = []
        for(let c in cardsDb) {
            cards.push({ id: c, ...cardsDb[c] });
        }

        this.setState({ cards: cards });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    this.state.cards.length > 0 && (
                        <VirtualizedCardsList cards={this.state.cards} 
                            scrollIndex={this.props.scrollIndex}
                            setLastScrollIndex={this.props.setLastScrollIndex} />
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