import React, { useCallback } from "react";
import __debounce from "lodash/debounce";
import PropTypes from "prop-types";

function DebouncedInput({ wait, onChange, ...rest }) {
    const onDebouncedChanged = useCallback(
        __debounce((value) => {
            onChange(value);
        }, wait || 300)
    , [wait]);
    
    const handleChange = (e) => {
        const value = e.target.value;
        onDebouncedChanged(value);
    };

    return <input {...rest} onChange={handleChange} />;
}

DebouncedInput.propTypes = {
    wait: PropTypes.number,
    onChange: PropTypes.func,
};

export default DebouncedInput;
