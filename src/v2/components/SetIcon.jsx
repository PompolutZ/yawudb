import React from 'react'

const SetIcon = ({ set, ...rest }) => {
    return (
        <img
            className={`${rest.className}`}
            src={`/assets/icons/${set}-icon.png`}
        />
    );
};

export default SetIcon
