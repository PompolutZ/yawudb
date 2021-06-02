import React from 'react'

function ToggleButton({
    isOn,
    children,
    className,
    whenDisabled = "disabled:text-gray-100 disabled:bg-gray-300 disabled:border-gray-300 disabled:shadow-none",
    on = "bg-purple-100 border-purple-300 shadow-none text-gray-900",
    off = "bg-purple-500 border-purple-500 shadow-lg text-white",
    ...rest
}) {
    return (
        <button
            className={`x-2 py-3 px-3 border-t-2 border-b-2 border-l-2 rounded-none focus:outline-none transition-colors duration-300 ${
                rest.disabled ? whenDisabled : isOn ? on : off
            } ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default ToggleButton
