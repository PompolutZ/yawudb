import { useState } from "react";

export const useMultiSelectArray = <T>(
    defaultSelection: T[],
    allowMultiSelect: boolean,
    allOptions: T[],
    onSelectionChanged: (selected: T[]) => void,
) => {
    const [selected, setSelected] = useState<T[]>(defaultSelection);

    const onToggle = item => () => {
        if (!allowMultiSelect) {
            setSelected([item]);
            onSelectionChanged([item]);
        }
        else {
            if (allOptions.length === selected.length) {
                setSelected([item]);
                onSelectionChanged([item]);
                return;
            } else if (selected.length === 1 && item === selected[0]) {
                
                setSelected(allOptions);
                onSelectionChanged(allOptions);
                return;
            }

            const next = selected.includes(item) ? selected.filter(id => id !== item) : [...selected, item]
            setSelected(next);
            onSelectionChanged(next);
        } 
    }

    return {
        selected,
        onToggle,
    }
}