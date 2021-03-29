import React from "react";

function DeckIcon({ faction, className = "" }) {
    return (
        <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${faction}-deck.webp`}
        />
        <img className={`w-12 h-12 ${className}`}
            src={`/assets/icons/${faction}-deck-64.png`}
            alt={`${faction}`}
        />
    </picture>

    )
}

export default DeckIcon;
