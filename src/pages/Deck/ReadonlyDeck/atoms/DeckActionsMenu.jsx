import React from "react";
import { Menu } from "@headlessui/react";
import { EditIcon, ShareIcon, MoreVerticalIcon } from "./Icons";
import IconLink from "./IconLink";
import { DeleteMenuButton } from "./IconButton";
import ExportMenu from "./ExportMenu";
import DropdownMenu from "./DropdownMenu";

function DeckActionsMenu({
    deckId,
    deck,
    isPublic,
    toToggleDeckPublicity,
    exportToUDB,
    exportToUDS,
    exportToClub,
    createShareableLink,
    onDelete,
    canUpdateOrDelete,
}) {
    return (
        <DropdownMenu trigger={<MoreVerticalIcon />}>
            <div>
                {canUpdateOrDelete && (
                    <Menu.Item>
                        {({ active }) => (
                            <IconLink
                                active={active}
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
                    </Menu.Item>
                )}
            </div>

            <div className="flex flex-col">
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${
                                active
                                    ? "bg-purple-500 text-white"
                                    : "text-purple-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={createShareableLink}
                        >
                            <ShareIcon
                                className="h-5 w-5 mr-2 stroke-current"
                                fill="#C4B5FD"
                            />
                            <span
                                className={`${
                                    active ? "text-white" : "text-gray-900"
                                }`}
                            >
                                Create shareable link
                            </span>
                        </button>
                    )}
                </Menu.Item>
            </div>

            <ExportMenu
                exportToUDB={exportToUDB}
                exportToUDS={exportToUDS}
                exportToClub={exportToClub}
            />
            <div>
                {canUpdateOrDelete && (
                    <Menu.Item>
                        {({ active }) => (
                            <DeleteMenuButton
                                active={active}
                                onClick={onDelete}
                            ></DeleteMenuButton>
                        )}
                    </Menu.Item>
                )}
            </div>
        </DropdownMenu>
    );
}

export default DeckActionsMenu;
