import React from 'react';

function IconButton({ children, className, ...rest }) {
    return (
        <button
            className={`rounded-full focus:outline-none ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default IconButton;