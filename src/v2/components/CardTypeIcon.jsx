import React from 'react'

const CardTypeIcon = ({ type, ...rest }) => {
    return (
        <img
            className={`${rest.className}`}
            src={`/assets/icons/${type.toLowerCase()}-icon.png`}
        />
    );
};

export default CardTypeIcon
