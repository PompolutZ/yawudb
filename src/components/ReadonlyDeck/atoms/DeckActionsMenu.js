import React, { PureComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

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
                        <a href="" id="deckTextLink" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Text</a>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToImage}>
                        <a href="" id="deckImageLink" style={{ color: 'inherit', textDecoration: 'none'}}>Download as Image</a>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToPdf}>Download as PDF</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleExportVassalFiles} style={{ position: 'relative'}}>
                        Download Vassal Decks
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleExportToOtherWebsite(this.props.exportToUDB)} style={{ position: 'relative'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <img style={{ marginRight: '.3rem'}} alt={"favicon.ico"} src="https://www.underworldsdb.com/favicon.ico" width="16" height="16" />
                            Open on UnderworldsDB
                        </div>
                    </MenuItem>
                    <MenuItem onClick={this.handleExportToOtherWebsite(this.props.exportToUDS)} style={{ position: 'relative'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <img style={{ marginRight: '.3rem'}} alt={"faviconNew.png"} src="https://www.underworlds-deckers.com/images/faviconNew.png" width="16" height="16" />
                            Open on Underworld-Deckers
                        </div>
                    </MenuItem>
                    <MenuItem onClick={this.handleOpenInGamesAssitant} style={{ position: 'relative'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            Open in Games Assistant
                        </div>
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

    handleExportToOtherWebsite = invokeExport => () => {
        invokeExport();
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

    handleOpenInGamesAssitant = () => {
        this.props.exportToGamesAssistant();
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