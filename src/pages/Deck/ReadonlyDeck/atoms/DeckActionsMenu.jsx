import React from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { DeleteIcon, EditIcon, ShareIcon } from "./Icons";
import IconLink from "./IconLink";

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
        <Menu as="div" className="relative inline-block text-left w-6 h-6 z-10">
            <Menu.Button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                </svg>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 w-60 -ml-52 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                            active
                                                ? "text-white"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        Create shareable link
                                    </span>
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="flex flex-col">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? "bg-purple-500 text-white"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={exportToUDB}
                                >
                                    <img
                                        className="w-5 h-5 mr-2"
                                        alt="UnderworldsDB logo"
                                        src="https://www.underworldsdb.com/favicon.ico"
                                        width="16"
                                        height="16"
                                    />
                                    Open on UnderworldsDB
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? "bg-purple-500 text-white"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={exportToUDS}
                                >
                                    <img
                                        alt="Underworld-Deckers logo"
                                        src="https://www.underworlds-deckers.com/images/faviconNew.png"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Open on Underworld-Deckers
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? "bg-purple-500 text-white"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={exportToClub}
                                >
                                    <img
                                        className="h-5 w-5"
                                        style={{ marginRight: ".3rem" }}
                                        alt="WUnderworlds Club logo"
                                        src="/assets/icons/wuc-pwa-192.png"
                                    />
                                    Copy for WUnderworlds Club
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div>
                        {canUpdateOrDelete && (
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-accent3-500 text-white"
                                                : "text-accent3-900"
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        onClick={onDelete}
                                    >
                                        <DeleteIcon
                                            className="h-6 w-6 mr-2"
                                            fill="#F27263"
                                        />
                                        <span>Delete</span>
                                    </button>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default DeckActionsMenu;
