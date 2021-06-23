import { useEffect, useState } from "react";

export function useFetch(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [result, setResult] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_WUNDERWORLDS_API_ORIGIN}/${url}`)
        .then(r => r.json())
        .then(json => setResult(json))
        .catch(error => setError(error))
    }, [url])
    
    return {
        loading,
        error,
        result,
    }
}