export const WaveIndex = 0;
export const FactionFirstCardIndex = 1;
export const FactionLastCardIndex = 2;

export const getDbIndexByWaveAndCard = (wave, card) => {
    return (`00` + wave).slice(-2) + (`000` + card).slice(-3);
}

