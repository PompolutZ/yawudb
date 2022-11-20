import React from "react";
import { warbandHasPlot, getFactionByName, setHasPlot, plots } from "@wudb";
import { useState } from "react";
import { ModalPresenter } from "../../../../main";

const checkDeckHasPlots = (faction, sets) => {
    return (
        warbandHasPlot(getFactionByName(faction).id) ||
        sets.some((setId) => setHasPlot(setId))
    );
};

const getPlotKeywords = (faction, sets) => {
    if (!checkDeckHasPlots(faction, sets)) return [];

    const plotInfos = Object.values(plots);

    return plotInfos.reduce((keywords, plot) => {
        const factionWithPlot =
            plot.connection === "Warband" && plot.name === faction;
        const setWithPlot = plot.connection === "Set" && sets.includes(plot.id);

        return factionWithPlot || setWithPlot
            ? [...keywords, plot]
            : keywords;
    }, []);
};

export const DeckPlotCards = ({ factionId, sets }) => {
    const [overlay, setOverlay] = useState(null);

    return (
        <div className="flex items-center space-x-1">

            <span>This deck includes plot cards:</span>
            {getPlotKeywords(factionId, sets).map(({ keyword, asset }) => (
                <span
                    className="font-bold underline hover:cursor-pointer"
                    key={keyword}
                    onClick={() => setOverlay(asset)}
                >
                    {keyword}
                </span>
            ))}

            {overlay && (
                    <ModalPresenter>
                        <div
                            className="fixed inset-0 z-10 cursor-pointer"
                            onClick={() => setOverlay(null)}
                        >
                            <div className="bg-black absolute inset-0 opacity-25"></div>
                            <div className="absolute inset-0 z-20 flex justify-center items-center">
                                <div className="w-4/5 lg:w-1/4">
                                    <picture>
                                        <img src={`/assets/plots/${overlay}.png`} />
                                    </picture>
                                </div>
                            </div>
                        </div>
                    </ModalPresenter>
                )}
        </div>
    );
};
