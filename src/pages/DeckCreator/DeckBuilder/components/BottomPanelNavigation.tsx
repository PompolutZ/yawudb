import React, { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as AddCardIcon } from "../../../../svgs/add-card.svg";
import { ReactComponent as DeckIcon } from "../../../../svgs/deck.svg";
import { ReactComponent as WarbandIcon } from "../../../../svgs/warband.svg";

type NavigationOptions = "LIBRARY" | "DECK" | "WARBAND";

interface BottomPanelNavigationProps {
    activeOption: NavigationOptions;
    onShow: (options: NavigationOptions) => void; 
}

function BottomPanelNavigation({ activeOption = "LIBRARY", onShow }: BottomPanelNavigationProps) {
    const [activeTab, setActiveTab] = useState<NavigationOptions>(activeOption)

    useEffect(() => {
        onShow(activeTab);
    }, [activeTab])

    return (
        <div
            className={`lg:hidden fixed z-20 flex bottom-0 left-0 right-0 transition-colors duration-500 bg-gradient-to-r ${
                activeTab == "LIBRARY"
                    ? "from-purple-200 via-gray-100 to-gray-100"
                    : activeTab == "DECK"
                    ? "from-gray-100 via-purple-200 to-gray-100"
                    : "from-gray-100 via-gray-100 to-purple-200"
            }`}
        >
            <button
                className={`flex-1 flex flex-col items-center py-2 text-xs ${
                    activeTab == "LIBRARY"
                        ? "text-purple-700"
                        : "text-gray-700"
                }`}
                onClick={() => setActiveTab("LIBRARY")}
            >
                <AddCardIcon className="h-6 fill-current mb-1" />
                Library
            </button>
            <button
                className={`flex-1 flex flex-col items-center py-2 text-xs ${
                    activeTab == "DECK"
                        ? "text-purple-700"
                        : "text-gray-700"
                }`}
                onClick={() => setActiveTab("DECK")}
            >
                <DeckIcon className="h-6 fill-current mb-1" />
                Deck
            </button>
            <button
                className={`flex-1 flex flex-col items-center py-2 text-xs ${
                    activeTab == "WARBAND"
                        ? "text-purple-700"
                        : "text-gray-700"
                }`}
                onClick={() => setActiveTab("WARBAND")}
            >
                <WarbandIcon className="h-6 fill-current mb-1" />
                Warband
            </button>
        </div>
    );
}

export default BottomPanelNavigation;
