import React, { useContext, useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecksFromDatabase, deletePrivateDeck } from "features/privateDecksSlice";
import toPairs from "lodash/toPairs";
import { cardsDb } from "data";
import MotionDeckThumbnail from "../atoms/MotionDeckThumbnail";
import FluidDeckThumbnail from "../../../atoms/FluidDeckThumbnail";
import useAuthUser from "hooks/useAuthUser";

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
    const auth = useAuthUser();
    const dispatch = useDispatch();
    const privateDecks = useSelector((state) => state.privateDecks);
    const decks = useMemo(
        () =>
            toPairs(privateDecks)
                .map(([id, value]) => ({ ...value, id }))
                .sort((l, r) => new Date(l.created) - new Date(r.created)),
        [privateDecks]
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        dispatch(fetchDecksFromDatabase(firebase));
    }, [auth]);

    useEffect(() => {
        setLoading(false);
        console.log(decks);
    }, [decks]);

    const handleDeleteDeck = async id => {
        await dispatch(deletePrivateDeck(firebase, id));
    }

    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
            {decks &&
                decks.map((deck) => (
                    <MotionDeckThumbnail key={deck.id} deckId={deck.id} onDelete={handleDeleteDeck}>
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

export default MyDecksAuth2;
