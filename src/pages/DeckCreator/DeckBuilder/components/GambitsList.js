import React, {  } from "react";
import { CardsList } from "./CardsList";
import {
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";

function GambitsList({ selectedGambits, format, isValid }) {
    return (
        <div className={`${isValid ? "bg-green-100" : "bg-red-200"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Gambits"
                amount={selectedGambits.length}
            ></CardListSectionHeader>

            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedGambits}
            />
        </div>
    );
}

export default GambitsList;
