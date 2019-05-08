import React, { PureComponent, lazy } from 'react';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';

class DeckActionsMenu extends PureComponent {
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
                    onClick={this.handleClick}>
                    <MoreVerticalIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    {
                        this.props.canUpdateOrDelete && (
                            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        )
                    }
                    <MenuItem onClick={this.props.onCopy}>Copy</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleExportToTextFile}>
                        <a id="deckTextLink" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Text</a>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToImage}>
                        <a id="deckImageLink" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Image</a>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToPdf}>Download as PDF</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleExportVassalFiles} style={{ position: 'relative'}}>
                        Download Vassal Decks
                    </MenuItem>
                    {
                        this.props.canUpdateOrDelete && (
                            <div>
                                <Divider />
                                <MenuItem onClick={this.handleDelete} style={{ color: 'darkred' }}>Delete</MenuItem>
                            </div>
                        )
                    }
                </Menu>
            </div>

        );
    }

    handleEdit = () => {
        this.props.onEdit();
        this.handleClose();
    }

    handleDelete = () => {
        this.props.onDelete();
        this.handleClose();
    }

    handleExportToPdf = () => {
        this.props.onSaveAsPdf();
        this.handleClose();
    }

    handleExportToTextFile = () => {
        this.props.onSaveText(document.getElementById('deckTextLink'));
        this.handleClose();
    }

    handleExportVassalFiles = () => {
        this.props.onSaveVassalFiles();
        this.handleClose();
    }

    handleExportToImage = () => {
        this.props.onSaveImage(document.getElementById('deckImageLink'));
        this.handleClose();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }
}

export default DeckActionsMenu;