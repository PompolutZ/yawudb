import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function ExportMenu({ exportToUDB, exportToUDS, exportToClub }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const handleExportClick = (invokeExport) => () => {
        invokeExport();
        handleClose();
    };

    return (
        <div style={{ display: "flex" }}>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ marginRight: ".3rem" }}
                            src="https://www.underworldsdb.com/favicon.ico"
                            width="16"
                            height="16"
                        />
                        to UnderworldsDB
                    </div>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleExportClick(exportToUDS)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ marginRight: ".3rem" }}
                            src="https://www.underworlds-deckers.com/images/faviconNew.png"
                            width="16"
                            height="16"
                        />
                        to Underworld-Deckers
                    </div>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleExportClick(exportToClub)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ marginRight: ".3rem" }}
                            src="/assets/icons/wuc-pwa-192.png"
                            width="16"
                            height="16"
                        />
                        to WUnderworlds Club
                    </div>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

function DownloadMenu({
    onDownloadAsVassal,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const handleDownloadClick = (invokeDownload) => () => {
        invokeDownload();
        handleClose();
    };

    return (
        <div style={{ display: "flex" }}>
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
                <StyledMenuItem
                    onClick={handleDownloadClick(onDownloadAsVassal)}
                >
                    as Vassal Decks
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

function DeckActionMenuLarge({
    edit,
    cardsView,
    onCardsViewChange,
    canUpdateOrDelete,
    onSaveVassalFiles,
    onDelete,
    exportToUDB,
    exportToUDS,
    exportToClub,
}) {
    return (
        <React.Fragment>
            {canUpdateOrDelete && edit}{" "}
            <Button onClick={onCardsViewChange}>
                {cardsView ? "View as List" : "View as Cards"}
            </Button>
            <DownloadMenu
                onDownloadAsVassal={onSaveVassalFiles}
            />
            <ExportMenu
                exportToUDB={exportToUDB}
                exportToUDS={exportToUDS}
                exportToClub={exportToClub}
            />
            {canUpdateOrDelete && (
                <Button onClick={onDelete} style={{ color: "darkred" }}>
                    Delete
                </Button>
            )}
        </React.Fragment>
    );
}


export default DeckActionMenuLarge;
