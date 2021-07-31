import { useState } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const { matches } = matchMedia(query);
        setMatches(matches);
    }, [query])

    return matches;
}