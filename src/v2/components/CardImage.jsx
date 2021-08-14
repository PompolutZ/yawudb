import React from "react";

function CardImage({ id, ...rest }) {
    const cardId = typeof id !== "string" ? String(id).padStart(5, "0") : id;
    return (
        <picture>
            <source type="image/webp" srcSet={`/assets/cards/${cardId}_xs.webp`} />
            <img src={`/assets/cards/${cardId}.png`} {...rest} />
        </picture>
    );
}

export default CardImage;
