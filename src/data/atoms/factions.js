export const factions = {
    "universal" : "Universal",
    "garreks-reavers" : "Garrek's Reavers",
    "steelhearts-champions" : "Steelheart's Champions",
    "sepulchral-guard" : "Sepulchral Guard",
    "ironskulls-boyz" : "Ironskull's Boyz",
    "the-chosen-axes" : "The Chosen Axes",
    "spiteclaws-swarm" : "Spiteclaw's Swarm",
    "magores-fiends" : "Magore's Fiends",
    "the-farstriders" : "The Farstriders",
    "stormsires-cursebreakers": "Stormsire's Cursebreakers",
    "thorns-of-the-briar-queen": "Thorns of the Briar Queen",
    "eyes-of-the-nine": "Eyes of the Nine",
    "zarbags-gitz": "Zarbag's Gitz"
}

// 0 index stands for 'wave', so all the cards from Shadespire except Leader will be from wave 1,
// Leaders are wave 2, Nightvault is gonna be wave 3
export const factionCards = {
    "universal" : [1, 233, 437],
    "garreks-reavers" : [1, 1, 29],
    "steelhearts-champions" : [1, 30, 58],
    "sepulchral-guard" : [1, 59, 87],
    "ironskulls-boyz" : [1, 88, 116],
    "the-chosen-axes" : [1, 117, 145],
    "spiteclaws-swarm" : [1, 146, 174],
    "magores-fiends" : [1, 175, 203],
    "the-farstriders" : [1, 204, 232],
}

export const PREFIX_LENGTH = "toftbq".length + 1;

export const factionIdPrefix = {
    "garreks-reavers" : "gr",
    "steelhearts-champions" : "sc",
    "sepulchral-guard" : "sg",
    "ironskulls-boyz" : "ib",
    "the-chosen-axes" : "tca",
    "spiteclaws-swarm" : "ss",
    "magores-fiends" : "mf",
    "the-farstriders" : "tf",
    "stormsires-cursebreakers": "stc",
    "thorns-of-the-briar-queen": "toftbq",
    "eyes-of-the-nine": "eotn",
    "zarbags-gitz": "zg"
}

export const filterFactionByIdRange = {
    "garreks-reavers" : {
        start: 'gr',
        end: 'ib'
    },
    "steelhearts-champions" : {
        start: "sc",
        end: 'sg'
    },
    "sepulchral-guard" : {
        start: "sg",
        end: 'ss'
    },
    "ironskulls-boyz" : {
        start: 'ib',
        end: 'mf'
    },
    "the-chosen-axes" : {
        start: "tca",
        end: 'tf'
    },
    "spiteclaws-swarm" : {
        start: "ss",
        end: 'stc'
    },
    "magores-fiends" : {
        start: 'mf',
        end: 'sc'
    },
    "the-farstriders" : {
        start: "tf",
        end: "toftbq"
    },
    "stormsires-cursebreakers": {
        start: "stc",
        end: 'tca'
    },
    "thorns-of-the-briar-queen": {
        start: "toftbq"
    } 
}

export const idPrefixToFaction = {
    "gr": "garreks-reavers",
    "sc" : "steelhearts-champions",
    "sg" : "sepulchral-guard",
    "ib" : "ironskulls-boyz",
    "tca" : "the-chosen-axes",
    "ss" : "spiteclaws-swarm",
    "mf" : "magores-fiends",
    "tf" : "the-farstriders",
    "stc" : "stormsires-cursebreakers",
    "toftbq" : "thorns-of-the-briar-queen",
    "eotn" : "eyes-of-the-nine",
    "zg" : "zarbags-gitz"
}

// 0 index indicates the default set containing corresponding faction's cards
export const factionSets = {
    "universal" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "garreks-reavers" : [0, 7, 11],
    "steelhearts-champions" : [0, 7, 12],
    "sepulchral-guard" : [1, 7],
    "ironskulls-boyz" : [2, 7],
    "the-chosen-axes" : [3, 7],
    "spiteclaws-swarm" : [4, 7],
    "magores-fiends" : [5, 7],
    "the-farstriders" : [6, 7],
    "stormsires-cursebreakers": [8],
    "thorns-of-the-briar-queen": [8],
    "eyes-of-the-nine": [9],
    "zarbags-gitz": [10]
}

export const factionIndexes = [
    "universal",
    "garreks-reavers",
    "steelhearts-champions",
    "sepulchral-guard",
    "ironskulls-boyz",
    "the-chosen-axes",
    "spiteclaws-swarm",
    "magores-fiends",
    "the-farstriders",
    "stormsires-cursebreakers",
    "thorns-of-the-briar-queen",
    "eyes-of-the-nine",
    "zarbags-gitz"
]
