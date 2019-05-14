import React from 'react';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || ''
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
}

export default useStateWithLocalStorage;