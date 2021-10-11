import { Menu } from "@headlessui/react";
import React from "react";

interface ExportMenuProps {
    exportToUDB: () => void;
    exportToUDS: () => void;
    exportToClub: () => void;
}

const ExportMenu = ({
    exportToUDB,
    exportToUDS,
    exportToClub,
}: ExportMenuProps) => {
    return (
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
    );
};

export default ExportMenu;
