import React from "react";

function DeckIcon({ width, height, faction, style }) {
    return (
        <picture>
        <source
            type="image/webp"
            srcSet={`/assets/icons/${faction}-deck.webp`}
        />
        <img
            src={`/assets/icons/${faction}-deck-64.png`}
            alt={`${faction}`}
            style={{
                ...{
                    width: width,
                    height: height,
                    margin: "0 .3rem 0 0",
                    flex: "0 0 auto",
                },
                ...style,
            }}
        />
    </picture>

    )
}

export default DeckIcon;
