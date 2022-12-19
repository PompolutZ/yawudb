import { Component } from "react";

interface Tab {
    name: string;
    Icon: typeof Component;
}

interface BottomPanelNavigationProps {
    activeTabIndex: number;
    setActiveTabIndex: (activeIndex: number) => void;
    tabs: Tab[];
}

function BottomPanelNavigation({
    activeTabIndex,
    setActiveTabIndex,
    tabs,
}: BottomPanelNavigationProps) {
    return (
        <div
            className={`flex transition-colors duration-500 bg-gradient-to-r ${
                activeTabIndex == 0
                    ? "from-purple-200 via-gray-100 to-gray-100"
                    : activeTabIndex == 1
                    ? "from-gray-100 via-purple-200 to-gray-100"
                    : "from-gray-100 via-gray-100 to-purple-200"
            }`}
        >
            {tabs.map(({ name, Icon }: Tab, index: number) => (
                <button
                    key={name}
                    className={`flex-1 flex flex-col items-center py-2 text-xs
                ${
                    activeTabIndex === index
                        ? "text-purple-700"
                        : "text-gray-700"
                }`}
                    onClick={() => setActiveTabIndex(index)}
                >
                    <Icon className="h-6 fill-current mb-1" />
                    {name}
                </button>
            ))}
        </div>
    );
}

export default BottomPanelNavigation;
