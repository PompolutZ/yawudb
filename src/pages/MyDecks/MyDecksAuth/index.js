import React, { useContext, useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecksFromDatabase } from "features/privateDecksSlice";
import toPairs from "lodash/toPairs";
import { cardsDb } from "data";
import MotionDeckThumbnail from "../atoms/MotionDeckThumbnail";
import FluidDeckThumbnail from "../../../atoms/FluidDeckThumbnail";

const cardsToCountsReducer = (acc, el) => {
    switch (el.type) {
        case 0:
            acc.objectives += 1;
            return acc;

        case 2:
            acc.upgrades += 1;
            return acc;

        default:
            acc.gambits += 1;
            return acc;
    }
};

function MyDecksAuth() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const privateDecks = useSelector((state) => state.privateDecks);
    const decks = useMemo(
        () =>
            toPairs(privateDecks)
                .map(([id, value]) => {
                    let created = new Date(0);
                    if(value.created && value.created.seconds) {
                        created.setSeconds(value.created.seconds);
                    } else {
                        created = new Date(value.created);
                    }
        
                    // const cards = value.cards.map((id) => ({
                    //     ...cardsDb[id],
                    //     id,
                    // }));
                    // const counts = cards.reduce(cardsToCountsReducer, {
                    //     objectives: 0,
                    //     gambits: 0,
                    //     upgrades: 0,
                    // });
                    // const isDraft =
                    //     counts.objectives < 12 ||
                    //     counts.upgrades + counts.gambits < 20 ||
                    //     counts.gambits > counts.upgrades;

                    // cards, counts, isDraft, 
                    return { ...value, created, id };
                })
                .sort((l, r) => new Date(l.created) - new Date(r.created)),
        [privateDecks]
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        dispatch(fetchDecksFromDatabase(firebase));
    }, []);

    useEffect(() => {
        setLoading(false);
        console.log(decks);
    }, [decks]);

    return (
        <div style={{ flexGrow: 1 }}>
            {decks &&
                decks.map((deck) => (
                    <MotionDeckThumbnail key={deck.id}>
                        <FluidDeckThumbnail
                            deckId={deck.id}
                            deck={deck}
                            canUpdateOrDelete
                            isDraft={deck.isDraft}
                        />
                        {/* {
                        this.state.showConflicts && (
                            <Suspense fallback={<CircularProgress style={{color: '#3B9979'}} />}>
                                <DeckConflictsAndWarnings 
                                    conflicts={this.state.conflicts[id]} 
                                    warnings={this.state.warnings[id]}
                                    decks={decks} />
                            </Suspense>
                        )
                    }                                                 */}
                    </MotionDeckThumbnail>
                ))}
        </div>
    );
}

export default MyDecksAuth;
