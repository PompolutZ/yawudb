import React from "react";
import { Helmet } from 'react-helmet'

export default function RootHelmet() {
    return (
        <Helmet>
            <title>
                Warhammer Underworlds (Shadespire and Nightvault) Database and
                Deck Builder.
            </title>
            <meta
                name="description"
                content="YAWUDB is a fastest and the most mobile friendly Warhammer Underworlds: Shadespire and Warhammer Underworlds: Nightvault user's decks database and deck builder."
            />
            <meta
                property="og:title"
                content="Warhammer Underworlds (Shadespire and Nightvault) Database and Deck Builder."
            />
            <meta
                property="og:description"
                content="YAWUDB is a fastest and the most mobile friendly Warhammer Underworlds: Shadespire and Warhammer Underworlds: Nightvault user's decks database and deck builder."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yawudb.com" />
            <meta property="og:image" content="https://yawudb.com/yawudb.png" />
            <meta property="fb:app_id" content="2002247120067292" />
        </Helmet>
    );
}
