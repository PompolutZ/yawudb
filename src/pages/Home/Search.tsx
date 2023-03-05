import React, { useState } from "react";
import { useCombobox } from "downshift";
import { Card } from "../../data/wudb/types";
import { ReactComponent as SearchIcon } from "@icons/magnifying-glass.svg";

export function AutosuggestSearch() {
    const [inputItems, setInputItems] = useState<Card[]>([]);
    const {
        isOpen,
        getToggleButtonProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: inputItems,
        onInputValueChange: async ({ inputValue }) => {
            const { wucards } = await import("@wudb");
            const cards = Object.values<Card>(wucards);
            console.log("HELLO here!");
            console.log(inputValue);
            setInputItems( inputValue ?
                cards.filter((card) =>
                    card.name
                        .toLowerCase()
                        .includes(inputValue?.toLowerCase() ?? "")
                ) : []
            );
        },
    });
    return (
        <div className="relative">
            <div className="bg-orange-500 flex">
                <input
                    {...getInputProps()}
                    className="rounded h-12 bg-gray-200 box-border flex-1 py-1 px-2 outline-none border-2 focus:border-purple-700"
                />
                <button
                className="absolute right-0"
                    type="button"
                    {...getToggleButtonProps()}
                    aria-label="toggle menu"
                >
                    <div className="h-12 flex justify-center items-center mr-4">
                        <SearchIcon />
                    </div>
                </button>
            </div>
            {isOpen && (
                <div className="absolute bg-white z-10 overflow-auto">
                    <ul {...getMenuProps()}>
                        {inputItems.map((item, index) => (
                            <li
                                style={
                                    highlightedIndex === index
                                        ? { backgroundColor: "#bde4ff" }
                                        : {}
                                }
                                key={`${item}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
