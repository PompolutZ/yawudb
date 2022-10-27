import { validateCardForPlayFormat } from "../data/wudb";

export const checkStandalone = () => {
    return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    );
};

const colors = {
    default: "Black",
    restricted: "Goldenrod",
    banned: "DarkRed",
};

const backgroundColors = {
    default: "White",
    restricted: "Goldenrod",
    banned: "DarkRed",
};

export const pickCardColor2 = (id, format) => {
    const [, isForsaken, isRestricted] = validateCardForPlayFormat(id, format);
    
    if(isForsaken) {
        return colors["banned"];
    }

    if (isRestricted) {
        return colors["restricted"];
    }

    return colors["default"];
}

export const pickCardBackgroundColor2 = (id, format) => {
    const [, isForsaken, isRestricted] = validateCardForPlayFormat(id, format);
    
    if(isForsaken) {
        return backgroundColors["banned"];
    }

    if (isRestricted) {
        return backgroundColors["restricted"];
    }

    return backgroundColors["default"];
}
