import React from "react";
import DeckIcon from "../../../atoms/DeckIcon";
import SetsList from "../../../atoms/SetsList";
import { PeopleIcon, PersonIcon } from "../../../v2/components/Icons";

function DeckSummary({
    faction,
    name,
    author,
    date,
    draft,
    sets,
    children,
    isPrivate,
}) {
    return (
        <div className="flex items-center flex-1">
            <DeckIcon
                className="w-16 h-16 mr-4"
                faction={faction}
            />

            <div className="space-y-2 text-gray-900">
                <div>
                    <h1 className="text-xl">{name}</h1>
                    <h2 className="font-bold text-sm grid grid-cols-3 items-center space-x-2 divide-x-2 divide-gray-700">
                        <div>{author}</div>
                        <div className="text-gray-500 text-xs pl-2">{date}</div>
                        {isPrivate ? (
                            <div className="flex items-center text-gray-500 uppercase text-xs pl-2">
                                <PersonIcon className="w-4 h-4 fill-current" />
                                private
                            </div>
                        ) : (
                            <div className="flex items-center text-purple-700 uppercase text-xs pl-2">
                                <PeopleIcon className="w-4 h-4 stroke-current" />
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
