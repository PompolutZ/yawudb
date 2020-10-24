import React from 'react';
import Dexie from 'dexie';
import relationships from 'dexie-relationships';

export default function useDexie(name) {
    const db = new Dexie(name, {addons: [relationships]})
    db.version(1).stores({
        // maybe to consider making restriction as a keyword, 
        // maybe use more keywords?..
        factions: 'id,abbr,name,displayName',
        sets: 'id,name,displayName,released',
        cards: 'id, name, factionId -> factions.id, type, setId -> sets.id, rule, glory, scoreType',
    });

    return ({
        cards: db.cards,
        factions: db.factions,
        sets: db.sets,
    });
};