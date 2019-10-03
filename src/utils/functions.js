import { bannedCards, restrictedCards, cardsDb } from '../data/index';

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

export const ignoreAsDublicate = cardName => {
    return [
        'ANNIHILATION',
        'CONQUEST',
        'DENIAL',
        'HOLD OBJECTIVE 1',
        'HOLD OBJECTIVE 2',
        'HOLD OBJECTIVE 3',
        'HOLD OBJECTIVE 4',
        'HOLD OBJECTIVE 5',
        'SUPREMACY',
        'CONFUSION',
        'SIDESTEP',
        'GREAT FORTITUDE',
        'GREAT STRENGTH',
        'GREAT SPEED',
    ].includes(cardName.toUpperCase())
}

export const checkDeckValidFormats = cardIds => {
    const cards = cardIds.map(id => ({ ...cardsDb[id], id: id }));
    const onlyUniversals = cards.filter(c => c.faction === 0);

    const anyBannedCards = onlyUniversals.some(c => Boolean(bannedCards[c.id]));
    const anyOutOfSeason = onlyUniversals.some(c => Number(c.id) < 3000 && !ignoreAsDublicate(c.name));
    const tooManyRestricted = onlyUniversals.filter(c => Boolean(restrictedCards[c.id])).length > 5;
    const tooManySurges = cards.filter(c => c.type === 0 && c.scoreType === 0).length > 6;

    const validForFormats = ['open'];

    if(!(anyBannedCards || anyOutOfSeason || tooManyRestricted || tooManySurges)) {
        validForFormats.push('championship');
    }

    if(!(anyBannedCards || tooManyRestricted || tooManySurges)) {
        validForFormats.push('relic');
    }

    return validForFormats;
}



