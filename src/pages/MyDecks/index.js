import React, { useContext, useEffect, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import MyDecksAuth from "./MyDecksAuth";
import MyDecksAnon from "./MyDecksAnon";
import { FirebaseContext } from "../../firebase";
import { Link } from "react-router-dom";
import FactionDeckPicture from "../../v2/components/FactionDeckPicture";
import { VIEW_DECK } from "../../constants/routes";
import { getFactionByAbbr } from "../../data/wudb";

function DeckLink(props) {
    return (
        <div className="flex border-t border-gray-100">
            <FactionDeckPicture faction={props.faction} size="w-12 h-12" />
            <div>
            <Link className="" to={{
                pathname: `/view/deck/${props.id}`,
                state: {
                    deck: {
                        ...props
                    },
                    canUpdateOrDelete: true
                }
            }}>
                {props.name}
            </Link>
            </div>
        </div>
    )
}

function MyDecksPage() {
    const [loading, setLoading] = useState(false);
    const [decks, setDecks] = useState([]);
    const authUser = useAuthUser();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if(!authUser) return;

        setLoading(true);
        
        firebase.realdb
            .ref("/decks")
            .orderByChild('author')
            .equalTo(authUser.uid)
            .once("value")
            .then(snapshot => {
                setLoading(false);
                let decks = Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, id }));
                let updatedDecks = decks.map(deck => {
                    const updatedDeck = {...deck};
                    if(typeof updatedDeck.sets === 'string') {
                        updatedDeck.sets = updatedDeck.sets.split(",");
                    }
                    else {
                        // previously set indexes started from 0
                        updatedDeck.sets = deck.sets.map(s => s + 1);
                    }

                    if(!deck.faction) {
                        updatedDeck.faction = getFactionByAbbr(deck.id.split("-")[0]).name;
                    }

                    return updatedDeck;
                })
                setDecks(updatedDecks);
                console.log(snapshot.val());
            });
    }, [firebase, authUser])

    return (
        <div>
            { loading && <span>Loading...</span>}
            { decks.map(deck => <DeckLink key={deck.id} {...deck} /> )}
        </div>
    )
}

export default MyDecksPage;
