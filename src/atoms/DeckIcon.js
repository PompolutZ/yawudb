import React from "react";

function DeckIcon({ faction }) {
    return (
        <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${faction}-deck.webp`}
        />
        <img className="w-12 h-12"
            src={`/assets/icons/${faction}-deck-64.png`}
            alt={`${faction}`}
        />
    </picture>

    )
}

export default DeckIcon;
