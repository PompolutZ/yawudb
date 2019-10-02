import React, { PureComponent } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

function ExportMenu({ exportToUDB, exportToUDS }) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const handleExportClick = invokeExport => () => {
        invokeExport();
        handleClose();
    }

    return (
        <div style={{ display: 'flex' }}>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Export
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleExportClick(exportToUDB)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ marginRight: '.3rem' }}
                            src="https://www.underworldsdb.com/favicon.ico"
                            width="16"
                            height="16"
                        />
                        to UnderworldsDB
                    </div>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleExportClick(exportToUDS)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ marginRight: '.3rem' }}
                            src="https://www.underworlds-deckers.com/images/faviconNew.png"
                            width="16"
                            height="16"
                        />
                        to Underworld-Deckers
                    </div>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    )
}

function DownloadMenu({onDownloadAsText, onDownloadAsImage, onDownloadAsVassal, onDownloadAsPDF}) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const handleDownloadClick = invokeDownload => () => {
        invokeDownload();
        handleClose();
    }

    return (
        <div  style={{ display: 'flex' }}>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Download
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleDownloadClick(onDownloadAsText)}>
                    <a
                        id="deckTextLinkLarge"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        as Text
                    </a>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleDownloadClick(onDownloadAsImage)}>
                    <a
                        id="deckImageLinkLarge"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        as Image
                    </a>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleDownloadClick(onDownloadAsVassal)}>as Vassal Decks</StyledMenuItem>
                <StyledMenuItem onClick={handleDownloadClick(onDownloadAsPDF)}>as PDF</StyledMenuItem>
            </StyledMenu>
        </div>
    )
}

class DeckActionMenuLarge extends PureComponent {
    render() {
        const {
            canUpdateOrDelete,
            onEdit,
            onCopy,
            onDelete,
            onSaveAsPdf,
            exportToUDB,
            exportToUDS,
        } = this.props
        return (
            <React.Fragment>
                {canUpdateOrDelete && (
                    <Button onClick={onEdit} style={{ color: '#3B9979' }}>
                        Edit
                    </Button>
                )}
                <Button onClick={onCopy}>Copy</Button>
                <Button onClick={this.props.onCardsViewChange}>
                    {this.props.cardsView ? 'View as List' : 'View as Cards'}
                </Button>

                {/* <Button onClick={this.handleExportToTextFile}>
                    <a
                        id="deckTextLinkLarge"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Export as Text
                    </a>
                </Button>
                <Button onClick={this.handleExportToImage}>
                    <a
                        id="deckImageLinkLarge"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Download as Image
                    </a>
                </Button>
                <Button onClick={this.props.onSaveVassalFiles}>
                    Download Vassal Decks
                </Button> */}
                {/* <Button onClick={onSaveAsPdf}>Export As PDF</Button> */}
                <DownloadMenu
                    onDownloadAsText={this.handleExportToTextFile}
                    onDownloadAsImage={this.handleExportToImage}
                    onDownloadAsVassal={this.props.onSaveVassalFiles}
                    onDownloadAsPDF={onSaveAsPdf}
                />
                <ExportMenu exportToUDB={exportToUDB} exportToUDS={exportToUDS} />
                {canUpdateOrDelete && (
                    <Button onClick={onDelete} style={{ color: 'darkred' }}>
                        Delete
                    </Button>
                )}
            </React.Fragment>
        )
    }

    handleExportToTextFile = () => {
        this.props.onSaveText(document.getElementById('deckTextLinkLarge'))
    }

    handleExportToImage = () => {
        this.props.onSaveImage(document.getElementById('deckImageLinkLarge'))
    }
}

export default DeckActionMenuLarge
