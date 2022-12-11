import React from "react";
import SetsList from "../../../atoms/SetsList";
import { FactionDeckPicture } from "@components/FactionDeckPicture";
import { PeopleIcon, PersonIcon } from "../../../v2/components/Icons";
import { DeckTitle } from "@components/DeckTitle";

function DeckSummary({
    faction,
    name,
    date,
    sets,
    children,
    isPrivate,
}) {
    return (
        <div className="flex items-center flex-1 space-x-4">
            <FactionDeckPicture size="large" faction={faction} />

            <div className="space-y-2 text-gray-900">
                <div>
                    <DeckTitle factionName={faction} sets={sets}>
                        <h1 className="text-xl">{name}</h1>
                    </DeckTitle>

                    <h2 className="font-bold text-sm flex items-center space-x-2 divide-x-2 divide-gray-700">
                        <div className="text-gray-500 text-xs">{date}</div>
                        {isPrivate ? (
                            <div className="flex items-center text-gray-500 uppercase text-xs pl-2">
                                <PersonIcon className="w-4 h-4 fill-current mr-1" />
                                private
                            </div>
                        ) : (
                            <div className="flex items-center text-purple-700 uppercase text-xs pl-2">
                                <PeopleIcon className="w-4 h-4 stroke-current mr-1" />
                                public
                            </div>
                        )}
                    </h2>
                </div>
                <div className="mt-1 mb-1">{<SetsList sets={sets} />}</div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DeckSummary;
