import React, {  } from "react";
import { CardsList } from "./CardsList";
import {
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";

function UpgradesList({ selectedUpgrades, format, isValid }) {
    return (
        <div className={`${isValid ? "bg-green-100" : "bg-red-200"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Upgrades"
                amount={selectedUpgrades.length}
            ></CardListSectionHeader>

            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedUpgrades}
            />
        </div>
    );
}

export default UpgradesList;
