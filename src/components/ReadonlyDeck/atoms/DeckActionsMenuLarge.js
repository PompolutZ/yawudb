import React, { PureComponent, lazy } from 'react';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

class DeckActionMenuLarge extends PureComponent {
    render() {
        const { canUpdateOrDelete, onEdit, onCopy, onDelete, onSaveAsPdf } = this.props;
        return (
            <React.Fragment>
                {
                    canUpdateOrDelete && <Button onClick={onEdit} style={{ color: '#3B9979' }}>Edit</Button>
                }
                <Button onClick={onCopy}>Copy</Button>
                <Button onClick={this.props.onCardsViewChange}>
                    { this.props.cardsView ? 'View as List' : 'View as Cards'}
                </Button>

                <Button onClick={this.handleExportToTextFile}>
                    <a id="deckTextLinkLarge" style={{ color: 'inherit', textDecoration: 'none'}}>Export as Text</a>
                </Button>
                <Button onClick={this.handleExportToImage}>
                    <a id="deckImageLinkLarge" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Image</a>
                </Button>
                <Button onClick={this.props.onSaveVassalFiles}>Download Vassal Decks</Button>
                <Button onClick={onSaveAsPdf}>Export As PDF</Button>
                {
                    canUpdateOrDelete && <Button onClick={onDelete} style={{ color: 'darkred' }}>Delete</Button>
                }
            </React.Fragment>
        );
    }

    handleExportToTextFile = () => {
        this.props.onSaveText(document.getElementById('deckTextLinkLarge'));
    }

    handleExportToImage = () => {
        this.props.onSaveImage(document.getElementById('deckImageLinkLarge'));
    }
}

export default DeckActionMenuLarge;