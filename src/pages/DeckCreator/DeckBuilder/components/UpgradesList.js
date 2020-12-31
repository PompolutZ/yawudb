import React, {  } from "react";
import { CardsList } from "./CardsList";
import uuid4 from "uuid";
import {
    CHAMPIONSHIP_FORMAT,
} from "../../../../data/wudb";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";

function UpgradesList({ selectedUpgrades, format, isValid, issues }) {
    return (
        <div className={`${isValid ? "bg-green-100" : "bg-red-100"} p-2 mb-4 lg:mb-0`}>
            <CardListSectionHeader
                type="Upgrades"
                amount={selectedUpgrades.length}
            ></CardListSectionHeader>
            {!isValid && (
                <ul>
                    {issues.map((issue) => (
                        <li className="text-accent3-700 text-sm" key={uuid4()}>
                            {issue}
                        </li>
                    ))}
                </ul>
            )}

            <CardsList
                isEligibleForOP={format == CHAMPIONSHIP_FORMAT}
                cards={selectedUpgrades}
            />
        </div>
    );
}

export default UpgradesList;
