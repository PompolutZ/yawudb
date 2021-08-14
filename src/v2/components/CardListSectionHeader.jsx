import React, { useMemo } from "react";
import { cardTypes } from "../../data/wudb";
import toLower from "lodash/toLower";
import PropTypes from "prop-types";

function CardListSectionHeader({ type, amount, children, className = "" }) {
    const listTypes = useMemo(() => {
        switch (type) {
            case "Objectives":
                return cardTypes.filter((t) => t === "Objective").map(toLower);
            case "Gambits":
                return cardTypes
                    .filter((t) => t === "Ploy" || t === "Spell")
                    .map(toLower);
            case "Upgrades":
                return cardTypes.filter((t) => t === "Upgrade").map(toLower);
        }
    }, [type]);

    return (
        <div className={`flex items-center border-b border-gray-500 pb-2 ${className}`}>
            <div className="mr-2 flex">
                {listTypes.map((t) => (
                    <img
                        className="w-8 h-8"
                        key={t}
                        src={`/assets/icons/${t}-icon.png`}
                        alt={t}
                    />
                ))}
            </div>
            <h1 className="text-gray-900 text-xl mr-2">{`${amount} ${type}`}</h1>
            {children}
        </div>
    );
}

CardListSectionHeader.propTypes = {
    type: PropTypes.string.isRequired,
    amount: PropTypes.number,
    children: PropTypes.object,
    className: PropTypes.string,
};

export default CardListSectionHeader;
