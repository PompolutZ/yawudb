import React from "react";

import { Dialog } from "@headlessui/react";

function DeleteConfirmationDialog(props) {
    const {
        open,
        title,
        description,
        onCloseDeleteDialog,
        onDeleteConfirmed,
        onDeleteRejected,
    } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onCloseDeleteDialog()}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white drop-shadow-md p-4 space-y-4">
                    <Dialog.Title className="text-lg">{title}</Dialog.Title>
                    <Dialog.Description>{description}</Dialog.Description>
                    <div className="flex flex-row-reverse gap-2">
                        <button className="px-3 py-2 rounded border border-red-700 bg-red-700 hover:bg-red-500 text-white" onClick={onDeleteConfirmed}>Yes</button>
                        <button className="px-3 py-2 rounded border border-black hover:bg-black/5" onClick={onDeleteRejected}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default DeleteConfirmationDialog;
