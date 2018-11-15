import { bannedCards, restrictedCards } from '../data/index';

export const checkStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
}

const colors = {
    'default': 'Black',
    'restricted': 'Goldenrod',
    'banned': 'DarkRed'
}

const backgroundColors = {
    'default': 'White',
    'restricted': 'Goldenrod',
    'banned': 'DarkRed'
}

export const pickCardColor = (id, defaultColor) => {
    if(Boolean(bannedCards[id])) {
        return colors['banned'];
    }

    if(Boolean(restrictedCards[id])) {
        return colors['restricted'];
    }

    if(defaultColor) {
        return defaultColor;
    }

    return colors['default'];
}

export const pickCardBackgroundColor = (id, defaultColor) => {
    if(Boolean(bannedCards[id])) {
        return backgroundColors['banned'];
    }

    if(Boolean(restrictedCards[id])) {
        return backgroundColors['restricted'];
    }

    if(defaultColor) {
        return defaultColor;
    }

    return backgroundColors['default'];
}

