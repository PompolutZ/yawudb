import Dexie from 'dexie';
import relationships from 'dexie-relationships';

export default function useDexie(name) {
    const db = new Dexie(name, {addons: [relationships]})
    db.version(3).stores({
        // maybe to consider making restriction as a keyword, 
        // maybe use more keywords?..
        revision: '++id,revision',
        factions: 'id,abbr,name,displayName',
        sets: 'id,name,displayName,released',
        cards: 'id, name, factionId -> factions.id, type, setId -> sets.id, rule, glory, scoreType',
    });

    return ({
        revision: db.revision,
        cards: db.cards,
        factions: db.factions,
        sets: db.sets,
    });
};