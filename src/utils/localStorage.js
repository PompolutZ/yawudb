import { mergeLoadedStateWithInitial as mergeLoadedAuthWithInitial } from '../reducers/auth';
import { mergeLoadedStateWithInitial as mergeLoadedCardLibraryFiltersWithInitial } from '../reducers/cardLibraryFilters';
import { mergeLoadedStateWithInitial as mergeLoadedDecksFiltersWithInitial } from '../reducers/decksFilters';
import { mergeLoadedStateWithInitial as mergeLoadedDeckUnderBuildWithInitial } from '../reducers/deckUnderBuild';
import { mergeLoadedStateWithInitial as mergeLoadedLastDeckWithInitial } from '../reducers/lastDeck';
import { mergeLoadedStateWithInitial as mergeLoadedLibraryWithInitial } from '../reducers/library';
import { mergeLoadedStateWithInitial as mergeLoadedMydecksWithInitial} from '../reducers/mydecks';
import { mergeLoadedStateWithInitial as mergeLoadedUserExpansionsWithInitial } from '../reducers/userExpansions';
import { mergeLoadedStateWithInitial as mergeLoadedUserOwnSetsWithInitial } from '../reducers/userOwnSets';
import { mergeLoadedStateWithInitial as mergeDeckUnderEditWithInitial } from '../reducers/deckUnderEdit';
import { mergeLoadedStateWithInitial as mergeDecksMetaWithInitial } from '../reducers/decksMeta';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        const loadedState = JSON.parse(serializedState);
        
        return {
            auth: mergeLoadedAuthWithInitial(loadedState),
            cardLibraryFilters: mergeLoadedCardLibraryFiltersWithInitial(loadedState),
            decksFilters: mergeLoadedDecksFiltersWithInitial(loadedState),
            deckUnderBuild: mergeLoadedDeckUnderBuildWithInitial(loadedState),
            lastDeck: mergeLoadedLastDeckWithInitial(loadedState),
            library: mergeLoadedLibraryWithInitial(loadedState),
            mydecks: mergeLoadedMydecksWithInitial(loadedState),
            userExpansions: mergeLoadedUserExpansionsWithInitial(loadedState),
            userOwnSets: mergeLoadedUserOwnSetsWithInitial(loadedState),
            deckUnderEdit: mergeDeckUnderEditWithInitial(loadedState),
            decksMeta: mergeDecksMetaWithInitial(loadedState),
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        // log
    }
};