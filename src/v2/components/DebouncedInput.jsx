import React, { useCallback, useState } from "react";
import __debounce from "lodash/debounce";
import PropTypes from "prop-types";

function DebouncedInput({ wait, value, onChange, ...rest }) {
    const [userInput, setUserInput] = useState(value || "");
    const onDebouncedChanged = useCallback(
        __debounce((value) => {
            onChange(value);
        }, wait || 300)
    , [wait]);
    
    const handleChange = (e) => {
        const value = e.target.value;
        setUserInput(value);
        onDebouncedChanged(value);
    };

    return <input {...rest} value={userInput} onChange={handleChange} />;
}

DebouncedInput.propTypes = {
    wait: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default DebouncedInput;
