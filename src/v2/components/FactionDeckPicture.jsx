import React from "react";
import PropTypes from 'prop-types';

function FactionDeckPicture({ faction, size = "w-20 h-20" }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/assets/icons/${faction}-deck.webp`}
            />

            <img
                className={`${size}`}
                src={`/assets/icons/${faction}-deck-64.png`}
            />
        </picture>
    );
}

FactionDeckPicture.propTypes = {
    faction: PropTypes.string,
    size: PropTypes.string,
}

export default FactionDeckPicture;
