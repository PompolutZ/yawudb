import { useState, useEffect } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const { matches } = matchMedia(query);
        setMatches(matches);
    }, [query])

    return matches;
}

function getDeviceQuery(deviceType) {
    switch(deviceType) {
        case "mobile": return "(max-width: 640px)";
        case "laptop": return "(min-width: 1024px)";
        default: throw new Error("Unknown device type");
    }
}

export function useBreakpoint(device) {
    return useMediaQuery(getDeviceQuery(device));
}