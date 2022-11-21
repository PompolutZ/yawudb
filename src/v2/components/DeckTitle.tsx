import { ReactNode } from "react";
import { ReactComponent as CompassIcon } from "@icons/compass.svg";
import { checkDeckHasPlots } from "@wudb";

export interface DeckTitleProps {
    factionName: string;
    sets: number[];
    children: ReactNode;
}

export const DeckTitle = ({ factionName, sets, children }: DeckTitleProps) => (
    <div className="flex space-x-1 items-center">
    {
        checkDeckHasPlots(factionName, sets) && 
        <CompassIcon className="w-4 h-4 stroke-purple-700" />
    }
    { children }
    </div>
)