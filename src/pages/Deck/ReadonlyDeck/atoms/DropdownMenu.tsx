import React, { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";

interface DropdownMenuProps {
    children?: ReactNode;
    trigger?: ReactNode;
    className: string;
}

const DropdownMenu = ({ children, trigger, className = "relative inline-block text-left w-6 h-6 z-10" }: DropdownMenuProps) => {
    return (
        <Menu as="div" className={className}>
            <Menu.Button>
               { trigger }
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
                   { children }
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default DropdownMenu;

