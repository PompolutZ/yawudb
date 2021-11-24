import React from "react";
import IconLink from "./IconLink";
import DropdownMenu from "./DropdownMenu";
import ExportMenu from "./ExportMenu";
import { Menu } from "@headlessui/react";
import { DeckPrivacyToggleButton } from "./DeckPrivacyToggle";
import { EditIcon } from "../../../../v2/components/Icons";

function DeckActionMenuLarge({
    deckId,
    isPrivate,
    onToggleDeckPrivacy,
    deck,
    cardsView,
    onCardsViewChange,
    canUpdateOrDelete,
    onSaveVassalFiles,
    onDelete,
    exportToUDB,
    exportToUDS,
    exportToClub,
    createShareableLink,
    onDownloadProxy,
}) {
    return (
        <React.Fragment>
            {canUpdateOrDelete && (
                <IconLink
                    className="hover:bg-gray-200"
                    to={{
                        pathname: `/deck/edit/${deckId}`,
                        state: {
                            deck,
                        },
                    }}
                    label="Edit"
                >
                    <EditIcon
                        className="h-5 w-5 mr-2 stroke-current"
                        fill="#C4B5FD"
                    />
                </IconLink>
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
            {canUpdateOrDelete && (
                <DeckPrivacyToggleButton
                    isPrivate={isPrivate}
                    onClick={onToggleDeckPrivacy}
                />
            )}
            <button
                className={`text-purple-700 w-28 justify-center group hover:bg-gray-200 flex rounded-md items-center px-2 py-2 text-sm`}
                onClick={createShareableLink}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 stroke-current"
                    fill="#C4B5FD"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                <span className="text-gray-900">Share link</span>
            </button>
            {/* <DownloadMenu onDownloadAsVassal={onSaveVassalFiles} /> */}

            <DropdownMenu
                className="relative z-10"
                trigger={
                    <div className="flex text-purple-700 w-28 justify-center group hover:bg-gray-200 rounded-md items-center px-2 py-2 text-sm">
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
                    </div>
                }
            >
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${
                                active
                                    ? "bg-purple-500 text-white"
                                    : "text-purple-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={onSaveVassalFiles}
                        >
                            <img
                                className="w-14 h-5 mr-2"
                                alt="Vassal logo"
                                src="https://vassalengine.org/images/wordmark-path.png"
                                width="356"
                                height="120"
                            />
                            <span
                                className={`${
                                    active ? "text-white" : "text-gray-900"
                                }`}
                            >
                                Decks
                            </span>
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${
                                active
                                    ? "bg-purple-500 text-white"
                                    : "text-purple-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={onDownloadProxy}
                        >
                            <span
                                className={`${
                                    active ? "text-white" : "text-gray-900"
                                }`}
                            >
                                Proxy Cards
                            </span>
                        </button>
                    )}
                </Menu.Item>
            </DropdownMenu>
            <DropdownMenu
                className="relative z-10"
                trigger={
                    <div className="flex text-purple-700 w-28 justify-center group hover:bg-gray-200 rounded-md items-center px-2 py-2 text-sm">
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
                    </div>
                }
            >
                <ExportMenu
                    exportToUDB={exportToUDB}
                    exportToUDS={exportToUDS}
                    exportToClub={exportToClub}
                />
            </DropdownMenu>
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
