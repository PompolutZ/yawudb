import React, { ReactNode } from "react";
import { DeleteIcon } from "../../../../v2/components/Icons";

interface IconButtonProps {
    active?: boolean;
    label: string;
    onClick: () => void;
    children?: ReactNode;
    className?: string;
}

const IconButton = ({
    label,
    active,
    children,
    className,
    onClick,
}: IconButtonProps) => {
    return (
        <button
            className={
                className
                    ? className
                    : `text-gray-900 bg-white group flex rounded-md items-center w-full px-2 py-2 text-sm`
            }
            onClick={onClick}
        >
            {children}
            <span>{label}</span>
        </button>
    );
};

type DeleteMenuButtonProps = Exclude<IconButtonProps, "label" | "className" | "children">

export const DeleteMenuButton = ({ active, onClick}: DeleteMenuButtonProps) => {
    return (
        <IconButton
            className={`${
                active ? "bg-accent3-500 text-white" : "text-accent3-900"
            } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-200`}
            label="Delete"
            onClick={onClick}
        >
            <DeleteIcon className="h-6 w-6 mr-2" fill="#F27263" />
        </IconButton>
    );
};

export default IconButton;
