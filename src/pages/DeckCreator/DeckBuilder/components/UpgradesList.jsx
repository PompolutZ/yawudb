import React from "react";
import { CardsList } from "./CardsList";
import CardListSectionHeader from "../../../../v2/components/CardListSectionHeader";
import { ExpandCollapseButton } from "../../../../v2/components/ExpandCollapseButton";
import { useResizeHeight } from "../../../../hooks/useResizeHeight";
import { animated, useSpring } from "react-spring";

function UpgradesList({ selectedUpgrades, format, isValid }) {
    const [measureRef, open, toggle, contentHeight] = useResizeHeight({
        open: true,
    });
    const expand = useSpring({
        height: open ? `${contentHeight}px` : "0px",
    });

    return (
        <div
            className={`${
                isValid ? "bg-green-100" : "bg-red-200"
            } p-2 mb-4 lg:mb-0`}
        >
            <CardListSectionHeader
                type="Upgrades"
                amount={selectedUpgrades.length}
            >
                <ExpandCollapseButton
                    open={open}
                    className="ml-auto lg:hidden outline-none shadow-md text-white bg-purple-700 rounded-full hover:bg-purple-500 focus:text-white"
                    onClick={toggle}
                />
            </CardListSectionHeader>

            <animated.div style={expand} className="overflow-hidden">
                <div ref={measureRef}>
                    <CardsList
                        cards={selectedUpgrades}
                    />
                </div>
            </animated.div>
        </div>
    );
}

export default UpgradesList;
