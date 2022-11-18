import React, { useEffect } from "react";
import VirtualizedDecksList from "./VirtualizedDecksList";
import { useParams } from "react-router-dom";
import { useListAllPublicDecks } from "../../hooks/wunderworldsAPIHooks";

export default function Deck() {
    const { faction } = useParams();
    const [{ data, loading, error }, refetch] = useListAllPublicDecks(true);

    useEffect(() => {
        if (faction === "all") {
            refetch();
        } else {
            refetch({
                data: {
                    faction,
                },
            });
        }
    }, [faction, refetch]);

    return (
        <div className="flex-1 lg:max-w-xl lg:mx-auto group">
            {data && (
                <VirtualizedDecksList
                    source={data.map((deck) => ({ ...deck, cards: deck.deck }))}
                />
            )}
        </div>
    );
}
