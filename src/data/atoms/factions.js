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
    "the-eyes-of-the-nine": "The Eyes of the Nine",
    "zarbags-gitz": "Zarbag's Gitz",
    "godsworn-hunt": "Godsworn Hunt",
    "mollogs-mob": "Mollog's Mob",
    "thundriks-profiteers": "Thundrik’s Profiteers",
    "yltharis-guardians": "Ylthari’s Guardians"
}

// // 0 index stands for 'wave', so all the cards from Shadespire except Leader will be from wave 1,
// // Leaders are wave 2, Nightvault is gonna be wave 3
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
    "the-eyes-of-the-nine": "teotn",
    "zarbags-gitz": "zg",
    "godsworn-hunt": "gh",
    "mollogs-mob": "mm",
    "thundriks-profiteers": "tp",
    "yltharis-guardians": "yg"
}

export const factionMembers = {
    "garreks-reavers" : ['Garrek', 'Saek', 'Karsus', 'Targor', 'Arnulf'],
    "steelhearts-champions" : ['Steelheart', 'Obryn', 'Angharad'],
    "sepulchral-guard" : ['Warden', 'Champion', 'Prince', 'Harvester', 'Petitioner'],
    "ironskulls-boyz" : ['Gurzag', 'Bonekutta', 'Hakka', 'Basha'],
    "the-chosen-axes" : ['Grimnir', 'Tefk', 'Vol', 'Maegrim'],
    "spiteclaws-swarm" : ['Skritch', 'Krrk', 'Lurking', 'Festering', 'Hungering'],
    "magores-fiends" : ['Magore', 'Riptooth', 'Zharkus', 'Ghartok'],
    "the-farstriders" : ['Sanson', 'Almeric', 'Elias'],
    "stormsires-cursebreakers": ['Stormsire', 'Ammis', 'Rastus'],
    "thorns-of-the-briar-queen": ['Briar Queen', 'Varclav', 'The Ever-hanged', 'Chainrasp', 'Chainrasp', 'Chainrasp', 'Chainrasp'],
    "the-eyes-of-the-nine": ['Vortemis', `K'charik`, `Narvia`, 'Turosh', 'Blue Horror'],
    "zarbags-gitz": ['Zarbag', 'Sourtongue', 'Drizgit', 'Bonekrakka', 'Gobbaluk', 'Prog', 'Stikkit', 'Redkap', 'Dibbz'],
    "godsworn-hunt": ['Theddra', 'Grundann', 'Jagathra', 'Shond', 'Ollo', 'Grawl'],
    "mollogs-mob": ['Mollog', 'Bat Squig', 'Stalagsquig', 'Spiteshroom'],
    "thundriks-profiteers": ['Bjorgen', 'Dead-Eye Lund', 'Enrik', 'Khazgan', 'Garodd'],
    "yltharis-guardians": ['Ylthari', 'Ahnslaine', 'Gallanghann', 'Skhathael']
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
        end: 'teotn'
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
        start: "toftbq",
        end: 'zg'
    },
    "the-eyes-of-the-nine": { 
        start: "teotn",
        end: 'tf'
    },
    "zarbags-gitz": {
        start: "zg"
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
    "teotn" : "the-eyes-of-the-nine",
    "zg" : "zarbags-gitz",
    "gh" : "godsworn-hunt",
    "mm": "mollogs-mob",
    "tp": "thundriks-profiteers",
    "yg": "yltharis-guardians"
}

// 0 index indicates the default set containing corresponding faction's cards
export const factionSets = {
    "universal" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    "garreks-reavers" : [0, 7, 11],
    "steelhearts-champions" : [0, 7, 12],
    "sepulchral-guard" : [1, 7],
    "ironskulls-boyz" : [2, 7],
    "the-chosen-axes" : [3, 7],
    "spiteclaws-swarm" : [4, 7],
    "magores-fiends" : [5, 7],
    "the-farstriders" : [6, 7],
    "stormsires-cursebreakers": [8, 18],
    "thorns-of-the-briar-queen": [8, 18],
    "the-eyes-of-the-nine": [9, 18],
    "zarbags-gitz": [10, 18],
    "godsworn-hunt": [14, 18],
    "mollogs-mob": [15, 18],
    "thundriks-profiteers": [16, 18],
    "yltharis-guardians": [17, 18]
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
    "the-farstriders", // 8
    "stormsires-cursebreakers", // 9
    "thorns-of-the-briar-queen", // 10
    "the-eyes-of-the-nine", // 11
    "zarbags-gitz", // 12
    "godsworn-hunt", // 13
    "mollogs-mob", // 14
    "thundriks-profiteers", // 15
    "yltharis-guardians" // 16
]

export const warbandsWithDefaultSet = [
    ["garreks-reavers",0],
    ["steelhearts-champions",0],
    ["sepulchral-guard",1],
    ["ironskulls-boyz",2],
    ["the-chosen-axes",3],
    ["spiteclaws-swarm",4],
    ["magores-fiends",5],
    ["the-farstriders",6],
    ["stormsires-cursebreakers",8],
    ["thorns-of-the-briar-queen",8],
    ["the-eyes-of-the-nine",9],
    ["zarbags-gitz",10],
    ["n_garreks-reavers",11],
    ["n_steelhearts-champions",12],
    ["godsworn-hunt", 14],
    ["mollogs-mob", 15],
    ["thundriks-profiteers", 16],
    ["yltharis-guardians", 17],
]
