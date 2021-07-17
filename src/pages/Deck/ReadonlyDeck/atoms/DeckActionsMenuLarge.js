import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
            <button
                className={`text-purple-700 justify-center group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="#C4B5FD"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
                <span className="text-gray-900">Export</span>
            </button>
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

function DownloadMenu({ onDownloadAsVassal }) {
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
            <button
                className={`text-purple-700 justify-center group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="#C4B5FD"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                <span className="text-gray-900">Download</span>
            </button>
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
    deckId,
    deck,
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
            {canUpdateOrDelete && (
                <Link
                    className={`text-purple-700 group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                    to={{
                        pathname: `/deck/edit/${deckId}`,
                        state: {
                            deck,
                        },
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 stroke-current"
                        fill="#C4B5FD"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                    <span className="text-gray-900">Edit</span>
                </Link>
            )}
            <button
                className={`text-purple-700 w-24 justify-center group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                onClick={onCardsViewChange}
            >
                {cardsView ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="#C4B5FD"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                        </svg>
                        <span className="text-gray-900">List</span>
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="#C4B5FD"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-gray-900">Images</span>
                    </>
                )}
            </button>
            <DownloadMenu onDownloadAsVassal={onSaveVassalFiles} />
            <ExportMenu
                exportToUDB={exportToUDB}
                exportToUDS={exportToUDS}
                exportToClub={exportToClub}
            />
            {canUpdateOrDelete && (
                <button
                    className={`text-accent3-700 group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                    onClick={onDelete}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="#F27263"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    <span>Delete</span>
                </button>
            )}
        </React.Fragment>
    );
}

export default DeckActionMenuLarge;
