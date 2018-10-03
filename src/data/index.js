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
    "thorns-of-the-briar-queen": "Thorns of the Briar Queen"
}

export const cardSet = ["Core set", "Sepulchral Guard expansion", "Ironskull's Boyz expansion", "The Chosen Axes expansion", "Spiteclaw's Swarm expansion", "Magore's Fiends expansion", "The Farstriders expansion", "Leaders expansion"];
export const cardSetIcons = ["universal", "sepulchral-guard", "ironskulls-boyz", "the-chosen-axes", "spiteclaws-swarm", "magores-fiends", "the-farstriders", "leaders", "nightvault-core"];
export const cardType = ["Objective", "Ploy", "Upgrade", "Gambit Spell"]
export const cardTypeIcons = ['objective-icon', 'ploy-icon', 'upgrade-icon', 'gambit spell-icon'];

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
    "thorns-of-the-briar-queen": "toftbq"
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
    "toftbq" : "thorns-of-the-briar-queen"
}

// 0 index indicates the default set containing corresponding faction's cards
export const factionSets = {
    "universal" : [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "garreks-reavers" : [0, 7],
    "steelhearts-champions" : [0, 7],
    "sepulchral-guard" : [1, 7],
    "ironskulls-boyz" : [2, 7],
    "the-chosen-axes" : [3, 7],
    "spiteclaws-swarm" : [4, 7],
    "magores-fiends" : [5, 7],
    "the-farstriders" : [6, 7],
    "stormsires-cursebreakers": [8],
    "thorns-of-the-briar-queen": [8]
}

export const setsIndex = [
    "shadespire-core",
    "sepulchral-guard",
    "ironskulls-boyz",
    "the-chosen-axes",
    "spiteclaws-swarm",
    "magores-fiends",
    "the-farstriders",
    "leaders",
    "nightvault-core"
]

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
    "thorns-of-the-briar-queen"
]

export const ObjectiveScoreType = {
    0: 'score-immediately',
    1: 'score-end-phase',
    2: 'score-third-end-phase',
    3: 'score-first-end-phase'
}

const getDbIndexByWaveAndCard = (wave, card) => {
    return (`00` + wave).slice(-2) + (`000` + card).slice(-3);
}

export const getCardsByFactionAndSets = (faction, selectedSets) => {
    console.log('getCardsByFactionAndSets', faction, selectedSets);
    const defaultFactionCards = faction !== 'universal' ? [factionSets[faction][0]] : [] 
    let cardIds = [];
    const setsWithFactionSet = [...selectedSets, ...defaultFactionCards];
    console.log('setsWithFactionSet', setsWithFactionSet);
    const fIndex = factionIndexes.indexOf(faction);
    for (let s of setsWithFactionSet) {
        const set = setInfos[s];
        if(set.hasOwnProperty(fIndex)) {
            cardIds = [...cardIds, ...set[fIndex].map(c => getDbIndexByWaveAndCard(set.wave, c))]
        }
    }

    return cardIds;
}

export const setInfos = {
    '0' : {
        wave: 1,
        '0' : [236, 236, 247, 247, 253, 253, 263, 263, 264, 264, 265, 265, 266, 266, 267, 267, 292, 292, 311, 311, 330, 330, 355, 355, 360, 360, 363, 363, 385, 385, 389, 389, 390, 390, 391, 391, 431, 431],
        '1' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        '2' : [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
    },
    '1' : {
        wave: 1,
        '0' : [240,250,254,259,281,287,290,293,296,297,299,324,325,332,339,353,357,364,368,370,371,375,377,379,380,393,401,414,418,420,426],
        '3' : [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
    },
    '2' : {
        wave: 1,
        '0' : [239,241,248,255,256,260,282,288,291,302,305,308,312,315,318,319,320,341,345,346,359,381,382,387,396,402,405,411,416,423,430],
        '4' : [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
    },
    '3' : {
        wave: 1,
        '0' : [237,251,268,270,277,280,284,294,300,301,303,310,314,316,321,327,337,344,348,366,369,392,400,403,404,408,409,417,419,425,435],
        '5' : [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145]
    },
    '4' : {
        wave: 1,
        '0' : [235,242,249,257,272,274,276,279,286,295,298,309,313,317,336,342,349,351,352,358,362,374,376,386,394,399,412,415,421,428,432],
        '6' : [146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174]
    },
    '5': {
        wave: 1,
        '0' : [233,244,262,269,271,273,275,283,285,306,307,323,328,331,335,340,343,350,354,365,367,383,384,388,398,410,424,427,433,434,436],
        '7' : [175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203]
    },
    '6': {
        wave: 1,
        '0' : [234,238,243,245,246,252,258,261,278,289,304,322,326,329,333,334,338,347,356,361,372,373,378,395,397,406,407,413,422,429,437],
        '8' : [204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232]
    },
    '7' : {
        wave: 2,
        '0' : [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        '1' : [3, 4],
        '2' : [1, 2],
        '3' : [5, 6],
        '4' : [7, 8],
        '5' : [9, 10],
        '6' : [11, 12],
        '7' : [13, 14],
        '8' : [15, 16]
    },
    '8' : {
        wave: 3,
        '0': [294, 306, 310, 330, 331, 332, 333, 334, 374, 403, 409, 419, 446, 471, 497, 504, 505, 506, 512],
        '9': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        '10': [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
    }
}

export const totalCardsPerWave = {
    1: 437,
    2: 60,
    3: 557
}

export const universalCardsStartNumber = 233;

export const cardsDb = {
    "01001": {
        "name": "A Worthy Skull",
        "factions": 1,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01002": {
        "name": "Blood For The Blood God!",
        "factions": 1,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action in this phase",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01003": {
        "name": "Coward!",
        "factions": 1,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter begins a Move action adjacent to one of your fighters and ends it adjacent to none of your fighters",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01004": {
        "name": "Draw The Gaze Of Khorne",
        "factions": 1,
        "type": 0,
        "rule": "Score this immediately if your warband takes two or more enemy fighters out of action in this phase",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01005": {
        "name": "It Begins",
        "factions": 1,
        "type": 0,
        "rule": "Score this in an end phase if at least one fighter from each warband is out of action",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01006": {
        "name": "Khorne Cares Not",
        "factions": 1,
        "type": 0,
        "rule": "Score this in an end phase if five or more fighters are out of action",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01007": {
        "name": "Khorne's Champion",
        "factions": 1,
        "type": 0,
        "rule": "Score this in the third end phase if all fighters except one of your fighters are out of action",
        "set": 0,
        "scoreType": 2,
        "faq": "-"
    },
    "01008": {
        "name": "Let The Blood Flow",
        "factions": 1,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a successful Attack action in this phase",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01009": {
        "name": "There Is Only Slaughter",
        "factions": 1,
        "type": 0,
        "rule": "Score this in an end phase if no fighter is holding an objective",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01010": {
        "name": "Blood Offering",
        "factions": 1,
        "type": 1,
        "rule": "Choose a friendly fighter. They suffer 1 damage. Roll two extra attack dice for their first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "01011": {
        "name": "Blood Rain",
        "factions": 1,
        "type": 1,
        "rule": "All Attack actions in the next activation have the Sword characteristic, even if they would normally have the Hammer characteristic",
        "set": 0,
        "faq": ""
    },
    "01012": {
        "name": "Boon Of Khorne",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. Remove all wound tokens from one friendly fighter",
        "set": 0,
        "faq": "-"
    },
    "01013": {
        "name": "Desecrate",
        "factions": 1,
        "type": 1,
        "rule": "Remove one objective that you hold from the battlefield",
        "set": 0,
        "faq": "-"
    },
    "01014": {
        "name": "Final Blow",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this after an enemy fighter's Attack action that takes an adjacent friendly fighter out of action. Their attacker suffers 1 damage",
        "set": 0,
        "faq": "-"
    },
    "01015": {
        "name": "Fuelled By Slaughter",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. A friendly fighter can make an Attack action",
        "set": 0,
        "faq": "-"
    },
    "01016": {
        "name": "Insensate",
        "factions": 1,
        "type": 1,
        "rule": "The first friendly fighter who suffers any amount of damage in the next activation only suffers one damage",
        "set": 0,
        "faq": "-"
    },
    "01017": {
        "name": "Khorne Calls",
        "factions": 1,
        "type": 1,
        "rule": "Roll one extra attack dice for your first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "01018": {
        "name": "Rebirth In Blood",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes your last surviving fighter out of action. Roll a defense dice. If you roll a Shield or Critical Hit remove all wound tokens from them, and place them on a starting hex in your territory",
        "set": 0,
        "faq": ""
    },
    "01019": {
        "name": "Skulls For The Skull Throne!",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. Draw up to two power cards",
        "set": 0,
        "faq": "-"
    },
    "01020": {
        "name": "Berserk Charge",
        "factions": 1,
        "type": 2,
        "rule": "Both Sword and Hammer symbols are successes when this fighter makes a Charge action",
        "set": 0,
        "faq": "-"
    },
    "01021": {
        "name": "Bloodslick",
        "factions": 1,
        "type": 2,
        "rule": "+1 Defence",
        "set": 0,
        "faq": "-"
    },
    "01022": {
        "name": "Deadly Spin",
        "factions": 1,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets adjacent enemy fighters - roll for each",
        "set": 0,
        "faq": "-"
    },
    "01023": {
        "name": "Ever-Advancing",
        "factions": 1,
        "type": 2,
        "rule": "Reaction: When this fighter could be driven back during an Attack action (whether or not your opponent chooses to do so), you can instead push them one hex",
        "set": 0,
        "faq": ""
    },
    "01024": {
        "name": "Frenzy",
        "factions": 1,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 0,
        "faq": "-"
    },
    "01025": {
        "name": "Grisly Trophy",
        "factions": 1,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, gain 1 additional glory point",
        "set": 0,
        "faq": "-"
    },
    "01026": {
        "name": "Terrifying Howl",
        "factions": 1,
        "type": 2,
        "rule": "Action: Push each adjacent enemy fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "01027": {
        "name": "Unstoppable Charge",
        "factions": 1,
        "type": 2,
        "rule": "When this fighter makes a Charge action they can move through other fighters, but their move must end in an empty hex",
        "set": 0,
        "faq": "-"
    },
    "01028": {
        "name": "Whirlwind of Death",
        "factions": 1,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 0,
        "faq": "-"
    },
    "01029": {
        "name": "Wicked Blade",
        "factions": 1,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2 If you roll at least one Critical Hit this Attack action has Cleave",
        "set": 0,
        "faq": "-"
    },
    "01030": {
        "name": "Awe-Inspiring",
        "factions": 2,
        "type": 0,
        "rule": "Score this immediately if your warband has taken two or more fighters out of action in this phase",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01031": {
        "name": "Cleanse",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if you hold all objectives in enemy territory",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01032": {
        "name": "Consecrated Area",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if there are no enemy fighters adjacent to your fighters",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01033": {
        "name": "Eternals",
        "factions": 2,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 0,
        "scoreType": 2,
        "faq": "-"
    },
    "01034": {
        "name": "Immovable Object",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if the same friendly fighter has held the same objective at the end of two consecutive action phases",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01035": {
        "name": "Lightning Strikes",
        "factions": 2,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter is taken out of action by a Charge action made by one of your fighters",
        "set": 0,
        "scoreType": 0,
        "faq": "-"
    },
    "01036": {
        "name": "Seize Ground",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if you hold an objective in enemy territory",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01037": {
        "name": "Sigmar's Bulwark",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if none of your fighters suffered any damage in the preceding action phase",
        "set": 0,
        "scoreType": 1,
        "faq": ""
    },
    "01038": {
        "name": "Slayers Of Tyrants",
        "factions": 2,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01039": {
        "name": "Heroic Guard",
        "factions": 2,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 0,
        "faq": "-"
    },
    "01040": {
        "name": "Peal Of Thunder",
        "factions": 2,
        "type": 1,
        "rule": "Choose any enemy fighter and push them one hex in any direction",
        "set": 0,
        "faq": "-"
    },
    "01041": {
        "name": "Righteous Zeal",
        "factions": 2,
        "type": 1,
        "rule": "+1 Damage to the first Attack action with a Range of 1 or 2 in the next activation",
        "set": 0,
        "faq": "-"
    },
    "01042": {
        "name": "Sigmarite Wall",
        "factions": 2,
        "type": 1,
        "rule": "Choose two adjacent friendly fighters and put them on Guard",
        "set": 0,
        "faq": "-"
    },
    "01043": {
        "name": "Stormforged Resistance",
        "factions": 2,
        "type": 1,
        "rule": "Friendly fighters cannot be driven back by the first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "01044": {
        "name": "Stormforged Tactics",
        "factions": 2,
        "type": 1,
        "rule": "In the next activation make the following Reaction. Reaction: After an enemy fighter's Attack action that fails, choose up to two friendly fighters and push them up to one hex each",
        "set": 0,
        "faq": "-"
    },
    "01045": {
        "name": "Tireless Assault",
        "factions": 2,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. That fighter can make another Attack action that targets the same fighter",
        "set": 0,
        "faq": ""
    },
    "01046": {
        "name": "Undaunted",
        "factions": 2,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a friendly fighter out of action leaving one surviving friendly fighter on the battlefield. Remove all wound tokens from the surviving fighter",
        "set": 0,
        "faq": "-"
    },
    "01047": {
        "name": "Unstoppable Strike",
        "factions": 2,
        "type": 1,
        "rule": "The first Attack action in the next activation gains Cleave",
        "set": 0,
        "faq": "-"
    },
    "01048": {
        "name": "Valiant Attack",
        "factions": 2,
        "type": 1,
        "rule": "Enemy fighters cannot support the target of the first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "01049": {
        "name": "Blessed by Sigmar",
        "factions": 2,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 0,
        "faq": "-"
    },
    "01050": {
        "name": "Block",
        "factions": 2,
        "type": 2,
        "rule": "Action: This fighter and all adjacent friendly fighters go on Guard",
        "set": 0,
        "faq": "-"
    },
    "01051": {
        "name": "Brave Strike",
        "factions": 2,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 Roll an extra attack dice if there are no adjacent friendly fighters",
        "set": 0,
        "faq": "-"
    },
    "01052": {
        "name": "Fatal Riposte",
        "factions": 2,
        "type": 2,
        "rule": "Reaction: During an Attack action that targets this fighter and fails, roll an attack dice. On a roll of Hammer or Critical Hit this fighter cannot be driven back and they can make an Attack action. It must target the attacker.",
        "set": 0,
        "faq": ""
    },
    "01053": {
        "name": "Heroic Might",
        "factions": 2,
        "type": 2,
        "rule": "This fighter's Attack action gains Cleave",
        "set": 0,
        "faq": "-"
    },
    "01054": {
        "name": "Heroic Stride",
        "factions": 2,
        "type": 2,
        "rule": "Reaction: After an enemy fighter ends their activation within two hexes of this fighter, you can push this fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "01055": {
        "name": "Lightning Blade",
        "factions": 2,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 1 On a critical hit, this Attack action has +1 Damage",
        "set": 0,
        "faq": "-"
    },
    "01056": {
        "name": "Lightning Blast",
        "factions": 2,
        "type": 2,
        "rule": "When they make a critical hit, this fighter also inflicts 1 damage on enemy fighters adjacent to the target's hex",
        "set": 0,
        "faq": ""
    },
    "01057": {
        "name": "Righteous Strike",
        "factions": 2,
        "type": 2,
        "rule": "Hex 1 Hammer 3 Damage 2 Reaction: After this Attack action, if it failed and the target was an enemy leader, make this Attack action again",
        "set": 0,
        "faq": "-"
    },
    "01058": {
        "name": "Shield Bash",
        "factions": 2,
        "type": 2,
        "rule": "Reaction: During an adjacent fighter's Attack action that targets this fighter and fails, this fighter cannot be driven back and you can push their attacker one hex",
        "set": 0,
        "faq": ""
    },
    "01059": {
        "name": "Battle Without End",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if two or more friendly fighters returned to the battlefield in the preceding action phase",
        "set": 1,
        "scoreType": 1,
        "faq": ""
    },
    "01060": {
        "name": "Claim The City",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if you hold every objective",
        "set": 1,
        "scoreType": 1,
        "faq": ""
    },
    "01061": {
        "name": "Fearless In Death",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if there is only one friendly fighter on the battlefield",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01062": {
        "name": "March Of The Dead",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least five) made a Move action in the preceding action phase",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01063": {
        "name": "More Able Bodies",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if your warband took two or more enemy fighters out of action in the preceding action phase",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01064": {
        "name": "Peerless General",
        "factions": 3,
        "type": 0,
        "rule": "Score this in the third end phase if you have four or more surviving fighters, and none are Inspired",
        "set": 1,
        "scoreType": 2,
        "faq": "-"
    },
    "01065": {
        "name": "Skills Unforgotten",
        "factions": 3,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 1,
        "scoreType": 0,
        "faq": "-"
    },
    "01066": {
        "name": "The Invigorated Dead",
        "factions": 3,
        "type": 0,
        "rule": "Score this in the third end phase if all of your surviving fighters (at least three) are Inspired",
        "set": 1,
        "scoreType": 2,
        "faq": "-"
    },
    "01067": {
        "name": "Undead Swarm",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if each enemy fighter is adjacent to at least two friendly fighters",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01068": {
        "name": "Bone Shrapnel",
        "factions": 3,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. The fighter that took them out of action suffers 1 damage",
        "set": 1,
        "faq": "-"
    },
    "01069": {
        "name": "Ceaseless Attacks",
        "factions": 3,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action. Make an Attack action with another friendly fighter",
        "set": 1,
        "faq": "-"
    },
    "01070": {
        "name": "Clawing Hands",
        "factions": 3,
        "type": 1,
        "rule": "Each friendly fighter that is not on the battlefield is considered to be supporting the first Attack action in the next activation",
        "set": 1,
        "faq": "-"
    },
    "01071": {
        "name": "Dance Macabre",
        "factions": 3,
        "type": 1,
        "rule": "Any friendly fighters that make a Move action in the next activation can move one additional hex",
        "set": 1,
        "faq": "-"
    },
    "01072": {
        "name": "Grasping Hands",
        "factions": 3,
        "type": 1,
        "rule": "Reduce the Move characteristic of the first fighter to be activated in the next activation by the number of friendly fighters that are not on the battlefield, to a minimum of 0",
        "set": 1,
        "faq": "-"
    },
    "01073": {
        "name": "Restless Dead",
        "factions": 3,
        "type": 1,
        "rule": "Place a friendly fighter that was taken out of action (other than the Sepulchral Warden) on a starting hex in your territory",
        "set": 1,
        "faq": "-"
    },
    "01074": {
        "name": "Spectral Form",
        "factions": 3,
        "type": 1,
        "rule": "Any friendly fighters that make a Move action in the next activation can move through additional fighters, but must end their moves on empty hexes",
        "set": 1,
        "faq": "-"
    },
    "01075": {
        "name": "Swift Evasion",
        "factions": 3,
        "type": 1,
        "rule": "Choose one friendly fighter and push them up to two hexes. Their new position must be further away from all enemy fighters",
        "set": 1,
        "faq": "-"
    },
    "01076": {
        "name": "Terrifying Screams",
        "factions": 3,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 1,
        "faq": "-"
    },
    "01077": {
        "name": "The Necromancer Commands",
        "factions": 3,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. Make the Attack action again",
        "set": 1,
        "faq": ""
    },
    "01078": {
        "name": "Ancient Commander",
        "factions": 3,
        "type": 2,
        "rule": "Action: Choose three other friendly fighters. Make Move actions with these fighters. This does not allow a fighter to move twice in a phase",
        "set": 1,
        "faq": "-"
    },
    "01079": {
        "name": "Assumed Command  ",
        "factions": 3,
        "type": 2,
        "rule": "Each friendly fighter that supports this fighter is considered to be two supporting fighters",
        "set": 1,
        "faq": "-"
    },
    "01080": {
        "name": "Deathly Charge",
        "factions": 3,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage in a phase in which they make a Charge action",
        "set": 1,
        "faq": "-"
    },
    "01081": {
        "name": "Fatal Strike",
        "factions": 3,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 Reaction: Make this Attack action during an Attack action that takes this fighter out of action, before they are removed from the battlefield. It must target their attacker",
        "set": 1,
        "faq": "-"
    },
    "01082": {
        "name": "Focused Attack",
        "factions": 3,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 If you roll at least one Critical Hit this Attack action has Cleave",
        "set": 1,
        "faq": "-"
    },
    "01083": {
        "name": "Frightning Speed",
        "factions": 3,
        "type": 2,
        "rule": "+2 Move",
        "set": 1,
        "faq": "-"
    },
    "01084": {
        "name": "Grim Cleave",
        "factions": 3,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 1,
        "faq": "-"
    },
    "01085": {
        "name": "Lethal Lunge",
        "factions": 3,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 3 Cleave",
        "set": 1,
        "faq": "-"
    },
    "01086": {
        "name": "Remembered Shield",
        "factions": 3,
        "type": 2,
        "rule": "This fighter's Defence characteristic changes to Shield",
        "set": 1,
        "faq": "-"
    },
    "01087": {
        "name": "Undying",
        "factions": 3,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 1,
        "faq": "-"
    },
    "01088": {
        "name": "Ard As Iron",
        "factions": 4,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 2,
        "scoreType": 2,
        "faq": "-"
    },
    "01089": {
        "name": "Biggest 'an da Best",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase if your leader took an enemy fighter out of action in the preceding action phase",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01090": {
        "name": "Call Of The Waaagh!",
        "factions": 4,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action this phase",
        "set": 2,
        "scoreType": 0,
        "faq": "-"
    },
    "01091": {
        "name": "Dead Kunnin'",
        "factions": 4,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter has two more supporting fighters than their target when making an Attack action",
        "set": 2,
        "scoreType": 0,
        "faq": "-"
    },
    "01092": {
        "name": "Dere's More Of Us",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase if you have more fighters on the battlefield than your opponent",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01093": {
        "name": "Get da Boss",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01094": {
        "name": "Good Scrap",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase if three or more fighters were taken out of action in the preceding action phase",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01095": {
        "name": "Punch-up",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase if each of your surviving fighters (at least two) made an Attack action against a different enemy fighter in the preceding action phase",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01096": {
        "name": "Too Dumb to Die",
        "factions": 4,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter suffers 3 or more damage in a single attack and is not take out of action",
        "set": 2,
        "scoreType": 0,
        "faq": "-"
    },
    "01097": {
        "name": "Avin a Good Time",
        "factions": 4,
        "type": 1,
        "rule": "Choose a fighter and roll an attack dice. If you roll a Hammer or Critical Hit the can make an Attack action",
        "set": 2,
        "faq": "-"
    },
    "01098": {
        "name": "Brutal but Kunnin'",
        "factions": 4,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action. You can push that fighter up to three hexes",
        "set": 2,
        "faq": "-"
    },
    "01099": {
        "name": "Deafening Bellow",
        "factions": 4,
        "type": 1,
        "rule": "Choose an enemy fighter adjacent to one of your fighters. Push that fighter one hex",
        "set": 2,
        "faq": "-"
    },
    "01100": {
        "name": "Gorkamorka's Blessing",
        "factions": 4,
        "type": 1,
        "rule": "The first Attack action with a Range of 1 or 2 in the next activation has +1 Damage",
        "set": 2,
        "faq": "-"
    },
    "01101": {
        "name": "Kunnin' but Brutal",
        "factions": 4,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Move action. That fighter can make an Attack action. You cannot play this during a Charge action",
        "set": 2,
        "faq": "-"
    },
    "01102": {
        "name": "Last Lunge",
        "factions": 4,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action or ploy that will take a friendly fighter out of action, before removing them from the battlefield. Roll an attack dice. On a roll of Hammer or Critical Hit make an Attack action with that fighter. It must target the attacker",
        "set": 2,
        "faq": "-"
    },
    "01103": {
        "name": "Leadin' by Example",
        "factions": 4,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action made by your leader that takes an enemy fighter out of action. Another friendly fighter that has not already made a Move or Charge action can make a Charge action",
        "set": 2,
        "faq": ""
    },
    "01104": {
        "name": "More Choppin'",
        "factions": 4,
        "type": 1,
        "rule": "Roll an extra attack dice for the first Attack action in the next activation",
        "set": 2,
        "faq": "-"
    },
    "01105": {
        "name": "Pillage",
        "factions": 4,
        "type": 1,
        "rule": "Remove one objective that you hold from the battlefield",
        "set": 2,
        "faq": "-"
    },
    "01106": {
        "name": "Scrag 'Em",
        "factions": 4,
        "type": 1,
        "rule": "Each friendly fighter that supports the first Attack action in the next activation is considered to be two supporting fighters",
        "set": 2,
        "faq": "-"
    },
    "01107": {
        "name": "Ard Head",
        "factions": 4,
        "type": 2,
        "rule": "When this fighter suffers damage, reduce that damage by 1 to a minimum of 1",
        "set": 2,
        "faq": "-"
    },
    "01108": {
        "name": "Aspiring Boss",
        "factions": 4,
        "type": 2,
        "rule": "Reaction: During an Attack action by this fighter that targets an enemy leader and fails, you can re-roll one attack dice",
        "set": 2,
        "faq": "-"
    },
    "01109": {
        "name": "Brutal Frenzy",
        "factions": 4,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 2,
        "faq": "-"
    },
    "01110": {
        "name": "Brutal Swing",
        "factions": 4,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 2,
        "faq": "-"
    },
    "01111": {
        "name": "Crush and Cleave",
        "factions": 4,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 2,
        "faq": "-"
    },
    "01112": {
        "name": "Dead 'Ard",
        "factions": 4,
        "type": 2,
        "rule": "This fighter can only be driven back by a critical hit",
        "set": 2,
        "faq": "-"
    },
    "01113": {
        "name": "Eadbutt",
        "factions": 4,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 If this Attack action succeeds, the target cannot be activated for the rest of the phase",
        "set": 2,
        "faq": "-"
    },
    "01114": {
        "name": "Headlong Rush",
        "factions": 4,
        "type": 2,
        "rule": "This fighter's Attack actions gain Knockback 1 in a phase in which they make a Charge action",
        "set": 2,
        "faq": "-"
    },
    "01115": {
        "name": "Unkillable",
        "factions": 4,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit they suffer no damage and are not taken out of action, and you discard this upgrade",
        "set": 2,
        "faq": "-"
    },
    "01116": {
        "name": "Waaagh!",
        "factions": 4,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage in a phase in which they make a Charge action",
        "set": 2,
        "faq": "-"
    },
    "01117": {
        "name": "A Claim Retaken",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if a friendly fighter holds an objective that an enemy fighter held at the beginning of the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01118": {
        "name": "A Grim Promise",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01119": {
        "name": "Ferocious Charge",
        "factions": 5,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter takes an enemy fighter out of action with a Charge action",
        "set": 3,
        "scoreType": 0,
        "faq": "-"
    },
    "01120": {
        "name": "For The Ur-Gold",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if all your surviving fighters (at least three) are Inspired",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01121": {
        "name": "Fury of the Lodge",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) made a Charge action in the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01122": {
        "name": "Hoarders",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your fighters and no enemy fighters are holding objectives",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01123": {
        "name": "Oaths Still to Fulfil",
        "factions": 5,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 3,
        "scoreType": 2,
        "faq": "-"
    },
    "01124": {
        "name": "Scion of Grimnir",
        "factions": 5,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 3,
        "scoreType": 0,
        "faq": "-"
    },
    "01125": {
        "name": "Unstoppable Advance",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters are in enemy territory",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01126": {
        "name": "Berserk Fury",
        "factions": 5,
        "type": 1,
        "rule": "The first time a friendly fighter suffers damage in the next activation, roll a defence dice. If the result is a Shield they suffer no damage",
        "set": 3,
        "faq": "-"
    },
    "01127": {
        "name": "Indomitable",
        "factions": 5,
        "type": 1,
        "rule": "The first time a friendly fighter suffers damage in the next activation, they only suffer 1 damage",
        "set": 3,
        "faq": "-"
    },
    "01128": {
        "name": "Living Wall",
        "factions": 5,
        "type": 1,
        "rule": "Choose two friendly fighters and push each of them up to one hex. They must end up adjacent to one another",
        "set": 3,
        "faq": "-"
    },
    "01129": {
        "name": "Oathsworn",
        "factions": 5,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. That fighter can make another Attack action that targets the same fighter",
        "set": 3,
        "faq": "-"
    },
    "01130": {
        "name": "Piercing Stare",
        "factions": 5,
        "type": 1,
        "rule": "Choose an enemy fighter. They cannot make an Attack action or a Charge action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "01131": {
        "name": "Slaying Blow",
        "factions": 5,
        "type": 1,
        "rule": "If the first Attack action in the next activation is a critical hit, double its Damage characteristic",
        "set": 3,
        "faq": "-"
    },
    "01132": {
        "name": "The Earth Shakes",
        "factions": 5,
        "type": 1,
        "rule": "Choose a fighter and push them one hex",
        "set": 3,
        "faq": "-"
    },
    "01133": {
        "name": "Treasure-lust",
        "factions": 5,
        "type": 1,
        "rule": "Choose a friendly fighter and push them up to three hexes. They must end up holding an objective",
        "set": 3,
        "faq": "-"
    },
    "01134": {
        "name": "Ur-Gold Boon",
        "factions": 5,
        "type": 1,
        "rule": "Choose a friendly fighter and roll a defence dice. On a roll of Shield or Critical Hit remove up to two wound tokens from them. Otherwise remove one wound token from them",
        "set": 3,
        "faq": "-"
    },
    "01135": {
        "name": "We Shall Not Be Moved",
        "factions": 5,
        "type": 1,
        "rule": "Friendly fighters holding objectives cannot be driven back by the first Attack action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "01136": {
        "name": "Activated Runes",
        "factions": 5,
        "type": 2,
        "rule": "Each time this fighter make an Attack action, you can re-roll one dice",
        "set": 3,
        "faq": "-"
    },
    "01137": {
        "name": "Brute Strength",
        "factions": 5,
        "type": 2,
        "rule": "This fighter's Attack actions gain Knockback 1",
        "set": 3,
        "faq": "-"
    },
    "01138": {
        "name": "Defiant Strike",
        "factions": 5,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Reaction: During an Attack action that succeeds against this fighter, this fighter cannot be driven back and makes this Attack action. It must target the attacker.",
        "set": 3,
        "faq": "-"
    },
    "01139": {
        "name": "Flurry of Blows",
        "factions": 5,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2",
        "set": 3,
        "faq": "-"
    },
    "01140": {
        "name": "Great Swing",
        "factions": 5,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 3,
        "faq": "-"
    },
    "01141": {
        "name": "Grimnir's Blessing",
        "factions": 5,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that would take this fighter out of action, roll a defence dice. If you roll a Shield the damage suffered by this fighter is ignored",
        "set": 3,
        "faq": "-"
    },
    "01142": {
        "name": "Grimnir's Fortitude",
        "factions": 5,
        "type": 2,
        "rule": "+1 Defence",
        "set": 3,
        "faq": "-"
    },
    "01143": {
        "name": "Grimnir's Speed",
        "factions": 5,
        "type": 2,
        "rule": "+2 Move",
        "set": 3,
        "faq": "-"
    },
    "01144": {
        "name": "Returning Axe",
        "factions": 5,
        "type": 2,
        "rule": "Hex 3 Sword 2 Damage 1 On a critical hit this Attack action has +1 Damage",
        "set": 3,
        "faq": "-"
    },
    "01145": {
        "name": "War Song",
        "factions": 5,
        "type": 2,
        "rule": "This fighter is considered to be two supporting fighters when they support, rather than one",
        "set": 3,
        "faq": "-"
    },
    "01146": {
        "name": "Arm's Length",
        "factions": 6,
        "type": 0,
        "rule": "Score this immediately if your warband takes an enemy fighter out of action while they are adjacent to none of your fighters",
        "set": 4,
        "scoreType": 0,
        "faq": "-"
    },
    "01147": {
        "name": "Brilliant, Brilliant!",
        "factions": 6,
        "type": 0,
        "rule": "Score this in an end phase if you scored two or more other objective cards in the preceding action phase",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01148": {
        "name": "Feast-feast",
        "factions": 6,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01149": {
        "name": "Honed Survival Instincts",
        "factions": 6,
        "type": 0,
        "rule": "Score this in an end phase if no friendly fighter was taken out of action in the preceding action phase",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01150": {
        "name": "Leading from the Back",
        "factions": 6,
        "type": 0,
        "rule": "Score this in the third end phase if your leader is in your territory and not adjacent to an enemy",
        "set": 4,
        "scoreType": 2,
        "faq": "-"
    },
    "01151": {
        "name": "Live to Fight Another Day",
        "factions": 6,
        "type": 0,
        "rule": "Score this in the third end phase if the only surviving friendly fighter is your leader",
        "set": 4,
        "scoreType": 2,
        "faq": "-"
    },
    "01152": {
        "name": "Lives Are Cheap",
        "factions": 6,
        "type": 0,
        "rule": "Score this in an end phase if two or more friendly fighters were taken out of action in the preceding action phase",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01153": {
        "name": "Numberless Swarm",
        "factions": 6,
        "type": 0,
        "rule": "Score this in the third end phase if there are five friendly fighters on the battlefield",
        "set": 4,
        "scoreType": 2,
        "faq": "-"
    },
    "01154": {
        "name": "Skritch is The Greatest, Yes-yes",
        "factions": 6,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 4,
        "scoreType": 0,
        "faq": "-"
    },
    "01155": {
        "name": "Aversion to Death",
        "factions": 6,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. Push up to two friendly fighters one hex each",
        "set": 4,
        "faq": "-"
    },
    "01156": {
        "name": "Frenzied Stabbing",
        "factions": 6,
        "type": 1,
        "rule": "The first Attack action with a Range of 1 or 2 in the next activation has +1 Damage",
        "set": 4,
        "faq": "-"
    },
    "01157": {
        "name": "Heightened Caution",
        "factions": 6,
        "type": 1,
        "rule": "Roll an extra defence dice for the first friendly fighter to be targeted by an Attack action in the next activation",
        "set": 4,
        "faq": "-"
    },
    "01158": {
        "name": "Momentary Boldness",
        "factions": 6,
        "type": 1,
        "rule": "Choose a friendly fighter adjacent to two or more friendly fighters. That fighter makes a Charge action",
        "set": 4,
        "faq": "-"
    },
    "01159": {
        "name": "Musk of Fear",
        "factions": 6,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 4,
        "faq": "-"
    },
    "01160": {
        "name": "Nervous Scrabbling",
        "factions": 6,
        "type": 1,
        "rule": "Choose a friendly fighter. They switch places with any adjacent fighter",
        "set": 4,
        "faq": ""
    },
    "01161": {
        "name": "Scratching in the Shadows",
        "factions": 6,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 4,
        "faq": "-"
    },
    "01162": {
        "name": "Skaven Courage",
        "factions": 6,
        "type": 1,
        "rule": "Play this if there are at least three friendly fighters adjacent to the same enemy fighter. One of those friendly fighters can make an Attack action",
        "set": 4,
        "faq": "-"
    },
    "01163": {
        "name": "Sudden Skittering",
        "factions": 6,
        "type": 1,
        "rule": "Double the Move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again this phase",
        "set": 4,
        "faq": "-"
    },
    "01164": {
        "name": "There Are Always More",
        "factions": 6,
        "type": 1,
        "rule": "Choose one friendly fighter that is out of action (other than Skritch or Krrk). Remove all wound tokens from them and place them on any starting hex",
        "set": 4,
        "faq": "-"
    },
    "01165": {
        "name": "Black Hunger",
        "factions": 6,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 have +1 Damage, and target all adjacent fighters (friend and foe) - roll for each. Fighters do not provide support for Attack actions against friendly models (in attack or defence)",
        "set": 4,
        "faq": "-"
    },
    "01166": {
        "name": "Bodyguard for a Price",
        "factions": 6,
        "type": 2,
        "rule": "If Skritch is adjacent to this fighter, Skritch is on Guard (even if Skritch has made a Charge action this phase)",
        "set": 4,
        "faq": "-"
    },
    "01167": {
        "name": "Expendable",
        "factions": 6,
        "type": 2,
        "rule": "Reaction: During an Attack action that will cause any damage to this fighter, you can remove them from the battlefield and deal 1 damage to their attacker",
        "set": 4,
        "faq": ""
    },
    "01168": {
        "name": "Festering Blades",
        "factions": 6,
        "type": 2,
        "rule": "On a critical hit, this fighter's Attack actions with a Range of 1 or 2 have +2 Damage",
        "set": 4,
        "faq": "-"
    },
    "01169": {
        "name": "Flee!",
        "factions": 6,
        "type": 2,
        "rule": "Action: This fighter and one adjacent friendly fighter can make a Move action. Both fighters must end their move further away from all enemy fighters",
        "set": 4,
        "faq": ""
    },
    "01170": {
        "name": "Skitter-scurry",
        "factions": 6,
        "type": 2,
        "rule": "Reaction: After any action that this fighter makes, you can push this fighter one hex",
        "set": 4,
        "faq": ""
    },
    "01171": {
        "name": "Sneaky Stab-stab",
        "factions": 6,
        "type": 2,
        "rule": "You can push this fighter one hex before they take an Attack action, though not when this fighter takes a Charge action",
        "set": 4,
        "faq": ""
    },
    "01172": {
        "name": "Swarm of Rats",
        "factions": 6,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets all adjacent enemy fighters - roll for each",
        "set": 4,
        "faq": "-"
    },
    "01173": {
        "name": "Throwing Stars",
        "factions": 6,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1",
        "set": 4,
        "faq": "-"
    },
    "01174": {
        "name": "Whirling Halberd",
        "factions": 6,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 4,
        "faq": "-"
    },
    "01175": {
        "name": "All the Better to Slay Them",
        "factions": 7,
        "type": 0,
        "rule": "Score this immediately if all friendly fighters (at least three) are adjacent to a different enemy fighter",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01176": {
        "name": "Bane Of Champions",
        "factions": 7,
        "type": 0,
        "rule": "Score this immediately if Riptooth takes an enemy leader out of action",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01177": {
        "name": "Bloody Annihilation",
        "factions": 7,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01178": {
        "name": "Khorne Sees Us",
        "factions": 7,
        "type": 0,
        "rule": "Score this immediately if your warband takes two or more enemy fighters out of action in a phase",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01179": {
        "name": "Kill! Kill Again!",
        "factions": 7,
        "type": 0,
        "rule": "Score this in an end phase if at least two fighters from each warband are out of action",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01180": {
        "name": "No Escape",
        "factions": 7,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action this phase",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01181": {
        "name": "Rivers Of Blood",
        "factions": 7,
        "type": 0,
        "rule": "Score this in an end phase if all surviving fighters (at least four) are wounded",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01182": {
        "name": "Save the Best",
        "factions": 7,
        "type": 0,
        "rule": "Score this in an end phase if an enemy leader is the only surviving enemy fighter",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01183": {
        "name": "Show of Strength",
        "factions": 7,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01184": {
        "name": "Blood Frenzy",
        "factions": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. Roll one extra attack dice for the first Attack action in the next activation. Both Hammer and Sword are successes for that Attack action",
        "set": 5,
        "faq": "-"
    },
    "01185": {
        "name": "Bloodslick Ground",
        "factions": 7,
        "type": 1,
        "rule": "In the next activation, enemy fighters have -2 Move",
        "set": 5,
        "faq": "-"
    },
    "01186": {
        "name": "Bloody Retribution",
        "factions": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. A friendly fighter adjacent to the attacker makes an Attack action against that fighter",
        "set": 5,
        "faq": "-"
    },
    "01187": {
        "name": "Continue the Slaughter",
        "factions": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. The first Attack action in the next activation has +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "01188": {
        "name": "Daemonic Resilience",
        "factions": 7,
        "type": 1,
        "rule": "The first friendly fighter who suffers any amount of damage in the next activation only suffers 1 damage",
        "set": 5,
        "faq": "-"
    },
    "01189": {
        "name": "Fountain of Gore",
        "factions": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. All friendly fighters have +1 Defence in the next activation",
        "set": 5,
        "faq": "-"
    },
    "01190": {
        "name": "Furious Inspiration",
        "factions": 7,
        "type": 1,
        "rule": "Choose a friendly fighter. The become Inspired",
        "set": 5,
        "faq": "-"
    },
    "01191": {
        "name": "Glory to Khorne",
        "factions": 7,
        "type": 1,
        "rule": "Roll one extra attack dice for the first Attack action made by a friendly fighter in the next activation",
        "set": 5,
        "faq": "-"
    },
    "01192": {
        "name": "Horrifying Howl",
        "factions": 7,
        "type": 1,
        "rule": "Choose an enemy fighter that is adjacent to a friendly fighter and push them up to two hexes",
        "set": 5,
        "faq": "-"
    },
    "01193": {
        "name": "To the Victor, the Spoils",
        "factions": 7,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter with a Wounds characteristic of 3 or more out of action. Draw three power cards",
        "set": 5,
        "faq": "-"
    },
    "01194": {
        "name": "Brutal Charge",
        "factions": 7,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 5,
        "faq": "-"
    },
    "01195": {
        "name": "Daemonic Maw",
        "factions": 7,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 3 If this Attack action succeeds, remove one wound token from this fighter",
        "set": 5,
        "faq": "-"
    },
    "01196": {
        "name": "Furious Charge",
        "factions": 7,
        "type": 2,
        "rule": "When this fighter makes a Charge action both Hammer and Sword are successes",
        "set": 5,
        "faq": "-"
    },
    "01197": {
        "name": "No Respite",
        "factions": 7,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that will take this fighter out of action, you can make an Attack action with them",
        "set": 5,
        "faq": "-"
    },
    "01198": {
        "name": "Predatory Leap",
        "factions": 7,
        "type": 2,
        "rule": "When this fighter makes a Charge action they can move through other fighters, but their move must end in an empty hex",
        "set": 5,
        "faq": "-"
    },
    "01199": {
        "name": "Rage-fuelled Attacks",
        "factions": 7,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "01200": {
        "name": "Shake About",
        "factions": 7,
        "type": 2,
        "rule": "This fighter's successful Attack actions with a Range of 1 can push the target one hex (instead of driving them back) in addition to inflicting damage",
        "set": 5,
        "faq": "-"
    },
    "01201": {
        "name": "Trophy Hunter",
        "factions": 7,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, gain 1 additional glory point",
        "set": 5,
        "faq": "-"
    },
    "01202": {
        "name": "Unshakeable",
        "factions": 7,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chooses to do so), you can instead push them one hex",
        "set": 5,
        "faq": "-"
    },
    "01203": {
        "name": "Wrathful Blows",
        "factions": 7,
        "type": 2,
        "rule": "All of this fighter's Attack actions have +1 Dice",
        "set": 5,
        "faq": "-"
    },
    "01204": {
        "name": "Behead the Beast",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01205": {
        "name": "Brave but Cautious",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if you have at least one surviving fighter and none of your fighters suffered any damage in the preceding action phase",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01206": {
        "name": "Close with the Enemy",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if three friendly fighters are adjacent to enemy fighters",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01207": {
        "name": "Eternal Supremacy",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if you hold three of more objectives",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01208": {
        "name": "Lightning Advance",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least two) are in enemy territory",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01209": {
        "name": "Meticulous Annihilation",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01210": {
        "name": "Punishing Volleys",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if you made at least three successful Boltstorm Pistol or Overcharged Boltstorm Pistol Attack actions in the preceding action phase",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01211": {
        "name": "Ranger Strike",
        "factions": 8,
        "type": 0,
        "rule": "Score this immediately if your warband has taken two or more fighters out of action in this phase",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01212": {
        "name": "Sigmar's Finest",
        "factions": 8,
        "type": 0,
        "rule": "Score this in an end phase if your surviving fighters (at least one) are outnumbered by surviving enemy fighters by at least three to one",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01213": {
        "name": "Fearsome Roar",
        "factions": 8,
        "type": 1,
        "rule": "Choose an enemy fighter adjacent to a friendly fighter. Push them one hex",
        "set": 6,
        "faq": "-"
    },
    "01214": {
        "name": "Firm Footing",
        "factions": 8,
        "type": 1,
        "rule": "Roll an extra defence dice for friendly fighters holding objectives in the next activation",
        "set": 6,
        "faq": "-"
    },
    "01215": {
        "name": "Lightning Blow",
        "factions": 8,
        "type": 1,
        "rule": "The first Attack action in the next activation has +1 Damage",
        "set": 6,
        "faq": "-"
    },
    "01216": {
        "name": "Lightning Stride",
        "factions": 8,
        "type": 1,
        "rule": "Double the Move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again this phase",
        "set": 6,
        "faq": "-"
    },
    "01217": {
        "name": "Patient Defence",
        "factions": 8,
        "type": 1,
        "rule": "The first friendly fighter to be targeted by an Attack action in the next activation has +1 Defence",
        "set": 6,
        "faq": "-"
    },
    "01218": {
        "name": "Rangers, Advance",
        "factions": 8,
        "type": 1,
        "rule": "Choose two friendly fighters and push them one hex",
        "set": 6,
        "faq": "-"
    },
    "01219": {
        "name": "Rapid Volley",
        "factions": 8,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Boltstorm Pistol or Overcharged Boltstorm Pistol Attack action. That fighter can make another Boltstorm Pistol or Overcharged Boltstorm Pistol Attack action that targets the same fighter",
        "set": 6,
        "faq": "-"
    },
    "01220": {
        "name": "Retribution",
        "factions": 8,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that damages a friendly fighter. That fighter can make an Attack action that must target the attacker",
        "set": 6,
        "faq": "-"
    },
    "01221": {
        "name": "Steady Volley",
        "factions": 8,
        "type": 1,
        "rule": "The first friendly fighter to make a Boltstorm Pistol or Overcharged Bolstorm Pistol Attack action in the next activation can be pushed one hex before they do so",
        "set": 6,
        "faq": "-"
    },
    "01222": {
        "name": "Warning Cry",
        "factions": 8,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 6,
        "faq": "-"
    },
    "01223": {
        "name": "Aetheric Step",
        "factions": 8,
        "type": 2,
        "rule": "This fighter can move through other fighters during a Move action, but must end their move in an empty hex",
        "set": 6,
        "faq": "-"
    },
    "01224": {
        "name": "Covering Fire",
        "factions": 8,
        "type": 2,
        "rule": "This fighter can support an adjacent friendly fighter targeted by an Attack action, even if this fighter is not adjacent to the attacker",
        "set": 6,
        "faq": "-"
    },
    "01225": {
        "name": "Flashing Handaxe",
        "factions": 8,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Cleave",
        "set": 6,
        "faq": "-"
    },
    "01226": {
        "name": "Furious Blow",
        "factions": 8,
        "type": 2,
        "rule": "Reaction: During an Attack action that targets this fighter and has failed, this fighter cannot be driven back and can make an Attack action. It must target the attacker",
        "set": 6,
        "faq": "-"
    },
    "01227": {
        "name": "Lone Warrior",
        "factions": 8,
        "type": 2,
        "rule": "Rolls of Single Support made for this fighter when they are targeted by an Attack action also count as successes when they are adjacent to no friendly fighters",
        "set": 6,
        "faq": "-"
    },
    "01228": {
        "name": "Overcharged Boltstorm Pistol",
        "factions": 8,
        "type": 2,
        "rule": "Hex 3 Hammer 3 Damage 1 Cleave",
        "set": 6,
        "faq": "-"
    },
    "01229": {
        "name": "Sharp Eyes",
        "factions": 8,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 6,
        "faq": "-"
    },
    "01230": {
        "name": "Spinning Strike",
        "factions": 8,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets all adjacent enemy fighters - roll for each",
        "set": 6,
        "faq": "-"
    },
    "01231": {
        "name": "Swift Stride",
        "factions": 8,
        "type": 2,
        "rule": "+2 Move",
        "set": 6,
        "faq": "-"
    },
    "01232": {
        "name": "Well-timed Lunge",
        "factions": 8,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Cleave",
        "set": 6,
        "faq": "-"
    },
    "01233": {
        "name": "Accept Inevitability",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all of your fighters are out of action",
        "set": 5,
        "scoreType": 2,
        "faq": "-"
    },
    "01234": {
        "name": "Advancing Strike",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately when your warband takes an enemy fighter standing in enemy territory out of action",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01235": {
        "name": "Alone in the Darkness",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if there are no adjacent fighters on the battlefield",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01236": {
        "name": "Annihilation",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01237": {
        "name": "Assasinate",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01238": {
        "name": "Balance of Power",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately when making an Attack action if both the attacker and the target have two supporting fighters",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01239": {
        "name": "Blooded",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) have at least one wound token",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01240": {
        "name": "Bloodless",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if no fighter suffered any damage in the preceding action phase",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01241": {
        "name": "Brawl",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all friendly fighters (at least three) are adjacent to enemy fighters",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01242": {
        "name": "Butchery",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband took three or more enemy fighters out of action in the preceding action phase",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01243": {
        "name": "Change of Tactics",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter on Guard makes a Charge action",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01244": {
        "name": "Chosen Champion",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if a surviving friendly fighter has three or more upgrades",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01245": {
        "name": "Complete Victory",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 6,
        "scoreType": 2,
        "faq": "-"
    },
    "01246": {
        "name": "Concerted Attack",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if three or more friendly fighters made an Attack action against the same enemy fighter in this phase",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01247": {
        "name": "Conquest",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all of your surviving fighters are in your opponent's territory",
        "set": 0,
        "scoreType": 2,
        "faq": ""
    },
    "01248": {
        "name": "Contained",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all surviving enemy fighters are in their territory",
        "set": 2,
        "scoreType": 2,
        "faq": ""
    },
    "01249": {
        "name": "Cover Ground",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a Move action of six or more hexes",
        "set": 4,
        "scoreType": 0,
        "faq": "-"
    },
    "01250": {
        "name": "Crushing Force",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a successful attack that deals at least twice as much damage as is needed to take their target out of action",
        "set": 1,
        "scoreType": 0,
        "faq": "-"
    },
    "01251": {
        "name": "Dauntless",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your fighters are outnumbered by at least three to one",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01252": {
        "name": "Defensive Strike",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately when your warband takes an enemy fighter standing in your territory out of action",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01253": {
        "name": "Denial",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if there are no enemy fighters in your territory",
        "set": 0,
        "scoreType": 2,
        "faq": "-"
    },
    "01254": {
        "name": "Determined Defender",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if the same friendly fighter has held the same objective at the end of two consecutive action phases",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01255": {
        "name": "Divide and Conquer",
        "factions": 0,
        "type": 0,
        "rule": "Score this is an end phase if each player has at least one fighter in their own territory and at least one fighter in enemy territory",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01256": {
        "name": "Endless Slaughter",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if five or more enemy fighters are out of action",
        "set": 2,
        "scoreType": 2,
        "faq": "-"
    },
    "01257": {
        "name": "Escalation",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if three or more upgrade cards were played in the preceding action phase",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01258": {
        "name": "Fearless",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if there are at least three enemy fighters adjacent to the same friendly fighter",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01259": {
        "name": "Flawless Strategy",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored two or more other objective cards in this phase",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01260": {
        "name": "Geared for War",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if each of your surviving fighters (at least three) has at least one upgrade",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01261": {
        "name": "Heroes All",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) are Inspired",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01262": {
        "name": "Heroic Feat",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter's Attack action succeeds when their target has two or more supporting fighters more then the attacker",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01263": {
        "name": "Hold Objective 1",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 1",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01264": {
        "name": "Hold Objective 2",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 2",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01265": {
        "name": "Hold Objective 3",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 3",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01266": {
        "name": "Hold Objective 4",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 4",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01267": {
        "name": "Hold Objective 5",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 5",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01268": {
        "name": "Honest Opponent",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you played no ploy cards during the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01269": {
        "name": "Killing Ground",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if at least one fighter was taken out of action in the preceding action phase in enemy territory, in your territory and in no one's territory",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01270": {
        "name": "Making a Statement",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold all objectives (at least one) in your opponent's territory",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01271": {
        "name": "Massive Assault",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your fighters deal 7 or more damage in an action phase (damage in excess of a fighter's Wounds characteristic is included)",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01272": {
        "name": "Master of War",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored an objective card, played a ploy card and played an upgrade card in this round",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01273": {
        "name": "Masterstroke",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter is taken out of action by an Attack action made as a Reaction by your warband or a Reaction made by your warband that causes damage",
        "set": 5,
        "scoreType": 0,
        "faq": "-"
    },
    "01274": {
        "name": "Miraculous Escape",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters is the target of an enemy Attack action with a Dice characteristic of 3 or more that fails",
        "set": 4,
        "scoreType": 0,
        "faq": "-"
    },
    "01275": {
        "name": "Multiple Fronts",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband dealt damage to three or more enemy fighters in the preceding action phase",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01276": {
        "name": "No More Tricks",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you have no power cards in your hand",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01277": {
        "name": "No Remorse",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters takes an enemy fighter out of action with an Attack action with a Damage characteristic greater than the target's Wounds characteristic",
        "set": 3,
        "scoreType": 0,
        "faq": "-"
    },
    "01278": {
        "name": "Our Only Way Out",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold three or more objectives",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01279": {
        "name": "Overextended",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold every objective",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01280": {
        "name": "Perfect Planning",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if none of your fighters made a Move action in the preceding action phase",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01281": {
        "name": "Plant A Standard",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is holding an objective in enemy territory",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01282": {
        "name": "Ploymaster",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you played three or more ploys in the preceding action phase",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01283": {
        "name": "Poised to Strike",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if at least three friendly fighters are adjacent to the same enemy fighter",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01284": {
        "name": "Precise Use of Force",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a successful Attack action that deals exactly enough damage to take their target out of action",
        "set": 3,
        "scoreType": 0,
        "faq": "-"
    },
    "01285": {
        "name": "Pure Carnage",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if seven or more fighters are out of action",
        "set": 5,
        "scoreType": 2,
        "faq": "-"
    },
    "01286": {
        "name": "Ready For a Challenge",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all remaining enemy fighters (at least three) have an upgrade",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01287": {
        "name": "Reaper",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter's attack takes two or more enemy fighters out of action",
        "set": 1,
        "scoreType": 0,
        "faq": "-"
    },
    "01288": {
        "name": "Scent of Victory",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving enemy fighters (at least three) have at least one wound token",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01289": {
        "name": "Skirting Danger",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving friendly fighters (at least two) are on edge hexes",
        "set": 6,
        "scoreType": 1,
        "faq": "-"
    },
    "01290": {
        "name": "Stymied",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your opponent played no power cards in the preceding action phase",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01291": {
        "name": "Superior Tactician",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if you have scored six or more other objective cards",
        "set": 2,
        "scoreType": 2,
        "faq": "-"
    },
    "01292": {
        "name": "Supremacy",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold three or more objectives",
        "set": 0,
        "scoreType": 1,
        "faq": "-"
    },
    "01293": {
        "name": "Swift Advance",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters are in enemy territory",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01294": {
        "name": "Tactical Genius 1-3",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 1, 2 and 3",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01295": {
        "name": "Tactical Genius 3-5",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 3, 4 and 5",
        "set": 4,
        "scoreType": 1,
        "faq": "-"
    },
    "01296": {
        "name": "Tactical Supremacy 1-2",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 1 and 2",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01297": {
        "name": "Tactical Supremacy 3-4",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 3 and 4",
        "set": 1,
        "scoreType": 1,
        "faq": "-"
    },
    "01298": {
        "name": "The Bigger They Are",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter takes an enemy fighter out of action with an Attack action that had a Damage characteristic of 1",
        "set": 4,
        "scoreType": 0,
        "faq": "-"
    },
    "01299": {
        "name": "The Harvest Begins",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes an Attack action that damages three or more enemy fighters",
        "set": 1,
        "scoreType": 0,
        "faq": "-"
    },
    "01300": {
        "name": "Total Annihilation",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the first or second end phase if all enemy fighters have been taken out of action",
        "set": 3,
        "scoreType": 3,
        "faq": "-"
    },
    "01301": {
        "name": "Trapped",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter takes damage from a friendly fighter's Attack action because they cannot be driven back",
        "set": 3,
        "scoreType": 0,
        "faq": "-"
    },
    "01302": {
        "name": "Twilight Conquerer",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) are neither in your territory nor enemy territory",
        "set": 2,
        "scoreType": 1,
        "faq": "-"
    },
    "01303": {
        "name": "Unbroken Wall",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving friendly fighters (at least three) are in a single group with each friendly fighter adjacent to another friendly fighter",
        "set": 3,
        "scoreType": 1,
        "faq": "-"
    },
    "01304": {
        "name": "Unstoppable",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters makes a successful Attack action against an enemy fighter on Guard",
        "set": 6,
        "scoreType": 0,
        "faq": "-"
    },
    "01305": {
        "name": "Victorious Duel",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy leader out of action",
        "set": 2,
        "scoreType": 0,
        "faq": "-"
    },
    "01306": {
        "name": "Victory After Victory",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored three or more other objective cards in this round",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01307": {
        "name": "War of Attrition",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if the same number of fighters (at least one) from each warband are out of action",
        "set": 5,
        "scoreType": 1,
        "faq": "-"
    },
    "01308": {
        "name": "Anticipation",
        "factions": 0,
        "type": 1,
        "rule": "Play this card after the final activation in an action phase. Name an objective card. If an opponent scores that objective in the end phase, score a glory point",
        "set": 2,
        "faq": "-"
    },
    "01309": {
        "name": "Blinding Flash",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action with a Range of 3 or greater (before any dice are rolled). The Attacks characteristic of that Attack action is changed to Sword 1",
        "set": 4,
        "faq": "-"
    },
    "01310": {
        "name": "Confused Priorities",
        "factions": 0,
        "type": 1,
        "rule": "Switch two objectives that are currently being held",
        "set": 3,
        "faq": "-"
    },
    "01311": {
        "name": "Confusion",
        "factions": 0,
        "type": 1,
        "rule": "Choose two fighters that are adjacent to each other and switch them",
        "set": 0,
        "faq": "-"
    },
    "01312": {
        "name": "Cruel Taunt",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll an attack dice. On a roll of Hammer or Critical Hit they are no longer Inspired, and cannot be Inspired this game",
        "set": 2,
        "faq": "-"
    },
    "01313": {
        "name": "Curious Inversion",
        "factions": 0,
        "type": 1,
        "rule": "For the first Attack action in the next activation, Hammer characteristics become Sword characteristics and vice versa, and Dodge characteristics become Shield characteristics and vice versa",
        "set": 4,
        "faq": "-"
    },
    "01314": {
        "name": "Darkness Descends",
        "factions": 0,
        "type": 1,
        "rule": "The first Attack action in the next activation has a Range of 1",
        "set": 3,
        "faq": "-"
    },
    "01315": {
        "name": "Daylight Robbery",
        "factions": 0,
        "type": 1,
        "rule": "Roll an attack dice. If you roll a Hammer or Critical Hit take one of your opponent's unspent glory points",
        "set": 2,
        "faq": "-"
    },
    "01316": {
        "name": "Death Throes",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this card during an Attack action or ploy that will take a friendly fighter out of action. Choose an enemy fighter adjacent to the target. They suffer 1 damage",
        "set": 3,
        "faq": "-"
    },
    "01317": {
        "name": "Desperate Gambit",
        "factions": 0,
        "type": 1,
        "rule": "When resolving the first Attack action in the next activation, you and your opponent roll off. The winner chooses whether the Attack action fails or succeeds",
        "set": 4,
        "faq": "-"
    },
    "01318": {
        "name": "Distraction",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 2,
        "faq": "-"
    },
    "01319": {
        "name": "Dual Strike",
        "factions": 0,
        "type": 1,
        "rule": "One fighter supporting the first Attack action in the next activation is considered to be two supporting fighters",
        "set": 2,
        "faq": ""
    },
    "01320": {
        "name": "Duel of Wits",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this when an opponent plays a ploy. Draw two power cards",
        "set": 2,
        "faq": "-"
    },
    "01321": {
        "name": "Earthquake",
        "factions": 0,
        "type": 1,
        "rule": "Push all fighters one hex. You must push them all in the same direction. Any that cannot be pushed this way are not pushed",
        "set": 3,
        "faq": ""
    },
    "01322": {
        "name": "Ephemerald Shield",
        "factions": 0,
        "type": 1,
        "rule": "The first friendly fighter to be targeted by an Attack action in the next activation has +1 Defence",
        "set": 6,
        "faq": "-"
    },
    "01323": {
        "name": "Flickering Step",
        "factions": 0,
        "type": 1,
        "rule": "Roll eight dice. Choose a friendly fighter and push them up to a number of hexes equal to the number of Critical Hit rolled",
        "set": 5,
        "faq": "-"
    },
    "01324": {
        "name": "Forceful Denial",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this when an opponent plays a ploy. Roll a defence dice. On a roll of Shield or Critical Hit that ploy has no effect",
        "set": 1,
        "faq": ""
    },
    "01325": {
        "name": "Fortify",
        "factions": 0,
        "type": 1,
        "rule": "Friendly fighters holding objectives have +1 Defence for the next activation",
        "set": 1,
        "faq": "-"
    },
    "01326": {
        "name": "Frozen in Time",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll a defence dice. On a roll of Shield or Critical Hit that fighter cannot make any actions or be damaged in this phase",
        "set": 6,
        "faq": "-"
    },
    "01327": {
        "name": "Fuelled by Fury",
        "factions": 0,
        "type": 1,
        "rule": "You can re-roll any attack dice for the first friendly fighter's Attack action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "01328": {
        "name": "Grapple",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after an adjacent enemy fighter makes an Attack action that drives a friendly fighter back. Push the attacker into the hex the friendly fighter was driven back from",
        "set": 5,
        "faq": "-"
    },
    "01329": {
        "name": "Great Concussion",
        "factions": 0,
        "type": 1,
        "rule": "Choose a hex on the battlefield, then push all fighters one hex (in whichever order you choose). This push must move them away from the chosen hex. If there is no hex you could push a fighter into, do not push them",
        "set": 6,
        "faq": "-"
    },
    "01330": {
        "name": "Healing Potion",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter and roll a defence dice. On a roll of Shield or Critical Hit remove up to two wound tokens from them. Otherwise remove one wound token from them",
        "set": 0,
        "faq": "-"
    },
    "01331": {
        "name": "Hidden Paths",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter that hasn't made a Move action this phase and is on any edge hex. Place them on any other edge hex. They are considered to have made a Move action",
        "set": 5,
        "faq": "-"
    },
    "01332": {
        "name": "Illusory Fighter",
        "factions": 0,
        "type": 1,
        "rule": "Choose one of your fighters on the battlefield. Place them on a starting hex in your territory",
        "set": 1,
        "faq": "-"
    },
    "01333": {
        "name": "Improvisation",
        "factions": 0,
        "type": 1,
        "rule": "Discard all power cards in your hand and draw three power cards",
        "set": 6,
        "faq": "-"
    },
    "01334": {
        "name": "Inspiration Strikes",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter. They become Inspired",
        "set": 6,
        "faq": "-"
    },
    "01335": {
        "name": "Invisible Walls",
        "factions": 0,
        "type": 1,
        "rule": "All fighters' Move characteristics are reduced to 1 for the next activation",
        "set": 5,
        "faq": "-"
    },
    "01336": {
        "name": "Last Chance",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action that would take a friendly fighter out of action. Roll a defence dice. If the result would not normally be a success for this fighter, ignore the damage from that Attack action on this fighter",
        "set": 4,
        "faq": ""
    },
    "01337": {
        "name": "Legacy",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a friendly fighter out of action. Choose one of their universal upgrades and give it to an adjacent friendly fighter",
        "set": 3,
        "faq": "-"
    },
    "01338": {
        "name": "Lethal Strike",
        "factions": 0,
        "type": 1,
        "rule": "If the first Attack action in the next activation is a critical hit, double its Damage characteristic for that Attack action",
        "set": 6,
        "faq": "-"
    },
    "01339": {
        "name": "Mighty Swing",
        "factions": 0,
        "type": 1,
        "rule": "Your first Attack action with a Range characteristic of 1 in the next activation targets all adjacent enemy fighters. Roll for each",
        "set": 1,
        "faq": ""
    },
    "01340": {
        "name": "Mischievous Spirits",
        "factions": 0,
        "type": 1,
        "rule": "Taking it in turns with your opponent(s), starting with you and going clockwise, move each objective one hex. Objectives cannot be moved into a hex that already contains an objective",
        "set": 5,
        "faq": "-"
    },
    "01341": {
        "name": "Misdirection",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this when a friendly fighter is chosen by a ploy. Choose another friendly fighter that could be chosen by that ploy. That fighter is chosen instead",
        "set": 2,
        "faq": ""
    },
    "01342": {
        "name": "Momentary Madness",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll an attack dice. If you roll a Hammer or Critical Hit make an Attack action with them as if they were a friendly fighter. Fighters do not provide support for this Attack action (in attack or defence)",
        "set": 4,
        "faq": ""
    },
    "01343": {
        "name": "My Turn",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that damage a friendly fighter. Push them up to one hex and make an Attack action with them",
        "set": 5,
        "faq": "-"
    },
    "01344": {
        "name": "No Time",
        "factions": 0,
        "type": 1,
        "rule": "No more power cards can be played until after the next activation",
        "set": 3,
        "faq": "-"
    },
    "01345": {
        "name": "On Your Feet",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action or ploy that would take a friendly fighter out of action, when there is a friendly fighter adjacent to them. Roll a defence dice. On a roll of Shield or Critical Hit the fighter does not suffer damage and is not taken out of action",
        "set": 2,
        "faq": "-"
    },
    "01346": {
        "name": "Parry",
        "factions": 0,
        "type": 1,
        "rule": "The first time one of your fighters is targeted in the next activation, roll an extra defence dice. When counting your successes, ignore one of the defence dice",
        "set": 2,
        "faq": "-"
    },
    "01347": {
        "name": "Quick Thinker",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after an enemy fighter's Move action. Make a Move action with a friendly fighter who has not already made a Move action in this phase",
        "set": 6,
        "faq": "-"
    },
    "01348": {
        "name": "Ready For Action",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after you upgrade a fighter in an action phase. They can make a Move or Attack action",
        "set": 3,
        "faq": "-"
    },
    "01349": {
        "name": "Rebound",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an enemy Attack action that would succeed. Roll a defence dice. On a roll of Dodge or Critical Hit the attacker suffers the damage, rather than the target, and neither fighter is driven back",
        "set": 4,
        "faq": "-"
    },
    "01350": {
        "name": "Reflected Injury",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter with at least one wound token, and an adjacent enemy fighter. The enemy fighter suffers 1 damage",
        "set": 5,
        "faq": "-"
    },
    "01351": {
        "name": "Rethink Strategy",
        "factions": 0,
        "type": 1,
        "rule": "Discard any number of objective cards and draw that number of objective cards",
        "set": 4,
        "faq": "-"
    },
    "01352": {
        "name": "Sacrificial Pawn",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter. If they are taken out of action in the next activation, you gain a glory point",
        "set": 4,
        "faq": "-"
    },
    "01353": {
        "name": "Scavenge",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an adjacent enemy fighter with an upgrade out of action. Gain an additional glory point",
        "set": 1,
        "faq": "-"
    },
    "01354": {
        "name": "Second Wind",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter that made a Charge action this phase. In the next activation, they can be activated as if they had Moved rather than Charged",
        "set": 5,
        "faq": "-"
    },
    "01355": {
        "name": "Shardfall",
        "factions": 0,
        "type": 1,
        "rule": "Place a Shardfall token in an unoccupied hex. That hex is blocked until the end of the phase",
        "set": 0,
        "faq": ""
    },
    "01356": {
        "name": "Shardgale",
        "factions": 0,
        "type": 1,
        "rule": "All fighters suffer 1 damage",
        "set": 6,
        "faq": "-"
    },
    "01357": {
        "name": "Shattering Terrain",
        "factions": 0,
        "type": 1,
        "rule": "Any fighters that make a Move action, are pushed or are driven back in the next activation suffer 1 damage",
        "set": 1,
        "faq": ""
    },
    "01358": {
        "name": "Shattershard",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy fighter, and choose one of their upgrades. Roll an attack dice. On a roll of Hammer or Critical Hit that upgrade is discarded",
        "set": 4,
        "faq": "-"
    },
    "01359": {
        "name": "Shifting Shards",
        "factions": 0,
        "type": 1,
        "rule": "Move an unheld objective one hex. You cannot move it into a hex that already contains an objective",
        "set": 2,
        "faq": ""
    },
    "01360": {
        "name": "Sidestep",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter and push them one hex",
        "set": 0,
        "faq": "-"
    },
    "01361": {
        "name": "Spectral Wings",
        "factions": 0,
        "type": 1,
        "rule": "The first fighter to make a Move action in the next activation has +2 Move",
        "set": 6,
        "faq": "-"
    },
    "01362": {
        "name": "Spoils of Battle",
        "factions": 0,
        "type": 1,
        "rule": "Play an upgrade card. This doesn't cost a glory point",
        "set": 4,
        "faq": "-"
    },
    "01363": {
        "name": "Sprint",
        "factions": 0,
        "type": 1,
        "rule": "Double the move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again in this phase",
        "set": 0,
        "faq": ""
    },
    "01364": {
        "name": "Stumble",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action drives an enemy fighter back. They are driven back an additional hex in the same direction",
        "set": 1,
        "faq": "-"
    },
    "01365": {
        "name": "Tainted Vitality",
        "factions": 0,
        "type": 1,
        "rule": "Remove one wound token from each fighter who has at least one wound token",
        "set": 5,
        "faq": "-"
    },
    "01366": {
        "name": "Tantalising Prize",
        "factions": 0,
        "type": 1,
        "rule": "The first friendly fighter to take a Move action in the next activation can move up to an additional two hexes if they end their move on an objective",
        "set": 3,
        "faq": "-"
    },
    "01367": {
        "name": "Teamwork",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this card during a friendly fighter's Attack action, before rolling any dice. Push another friendly fighter one hex",
        "set": 5,
        "faq": "-"
    },
    "01368": {
        "name": "Time Trap",
        "factions": 0,
        "type": 1,
        "rule": "Choose a fighter. They can take an action. Skip your next activation (you cannot play this card after your fourth activation)",
        "set": 1,
        "faq": ""
    },
    "01369": {
        "name": "Trap",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during a friendly fighter's Attack action that drives an enemy fighter back. The enemy fighter suffers 1 damage",
        "set": 3,
        "faq": "-"
    },
    "01370": {
        "name": "Triumphant Roar",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. You can push each enemy fighter adjacent to the friendly fighter one hex",
        "set": 1,
        "faq": "-"
    },
    "01371": {
        "name": "Trust To Luck",
        "factions": 0,
        "type": 1,
        "rule": "Discard any number of power cards and draw up to that number of power cards from your deck",
        "set": 1,
        "faq": "-"
    },
    "01372": {
        "name": "Twist the Knife",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during a friendly fighter's Attack action that has a Range of 1 and will succeed. It has +1 Damage for that Attack action",
        "set": 6,
        "faq": "-"
    },
    "01373": {
        "name": "A Destiny to Meet",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is not out of action at the end of the third action phase, gain 1 additional glory point",
        "set": 6,
        "faq": "-"
    },
    "01374": {
        "name": "Acrobatic",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has a Dodge Defence characteristic or has a Shield Defence characteristic but is on Guard, roll an extra defence dice when they are the target of an Attack action",
        "set": 4,
        "faq": "-"
    },
    "01375": {
        "name": "Army of One",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is the last friendly fighter on the battlefield, they have +1 Defence and all of their Attack actions have +1 Dice",
        "set": 1,
        "faq": "-"
    },
    "01376": {
        "name": "Awakened Weapon",
        "factions": 0,
        "type": 2,
        "rule": "You can re-roll one attack dice each time this fighter makes an Attack action",
        "set": 4,
        "faq": "-"
    },
    "01377": {
        "name": "Blessed Armour",
        "factions": 0,
        "type": 2,
        "rule": "When you roll a Critical Hit for this fighter when they are targeted by an Attack action, remove one wound token from them before any damage is dealt",
        "set": 1,
        "faq": ""
    },
    "01378": {
        "name": "Concealed Weapon",
        "factions": 0,
        "type": 2,
        "rule": "On a critical hit, this fighter's Attack actions with a Range of 1 have +2 Damage",
        "set": 6,
        "faq": "-"
    },
    "01379": {
        "name": "Coordinated Attack",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 When making this Attack action, roll an extra attack dice for each other friendly fighter adjacent to the target",
        "set": 1,
        "faq": "-"
    },
    "01380": {
        "name": "Cunning Duelist",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During this fighter's Attack action that succeeds against an adjacent enemy fighter, instead of driving the target back you can switch the two fighters' places",
        "set": 1,
        "faq": "-"
    },
    "01381": {
        "name": "Cursed Artefact",
        "factions": 0,
        "type": 2,
        "rule": "+1 Defense, -1 Wounds",
        "set": 2,
        "faq": "-"
    },
    "01382": {
        "name": "Daemonic Weapon",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Each time this fighter makes this Attack action, they first suffer 1 damage",
        "set": 2,
        "faq": ""
    },
    "01383": {
        "name": "Dark Darts",
        "factions": 0,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1 Cleave",
        "set": 5,
        "faq": "-"
    },
    "01384": {
        "name": "Deathly Fortitude",
        "factions": 0,
        "type": 2,
        "rule": "-2 Move, +2 Wounds",
        "set": 5,
        "faq": "-"
    },
    "01385": {
        "name": "Disengage",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 Reaction: After this Attack action, if it is successful, you can push this fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "01386": {
        "name": "Ethereal Shield",
        "factions": 0,
        "type": 2,
        "rule": "This fighter's Defence characteristic changes to Shield",
        "set": 4,
        "faq": "-"
    },
    "01387": {
        "name": "Flickering Image",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After an Attack action made by this fighter that scores a critical hit, you can push them up to two hexes",
        "set": 2,
        "faq": "-"
    },
    "01388": {
        "name": "Ghostblade",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 When rolling defence dice, only rolls of Crit are successes for the target of this Attack action. This Attack action can never cause more than 1 damage to a target",
        "set": 5,
        "faq": "-"
    },
    "01389": {
        "name": "Great Fortitude",
        "factions": 0,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 0,
        "faq": "-"
    },
    "01390": {
        "name": "Great Speed",
        "factions": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 0,
        "faq": "-"
    },
    "01391": {
        "name": "Great Strength",
        "factions": 0,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 0,
        "faq": "-"
    },
    "01392": {
        "name": "Headlong Charge",
        "factions": 0,
        "type": 2,
        "rule": "When this fighter makes a Charge action, increase their Move characteristic by 1 until the end of the activation",
        "set": 3,
        "faq": "-"
    },
    "01393": {
        "name": "Helpful Wispers",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has no adjacent friendly fighters, rolls of Single Support are a success when they make an Attack action",
        "set": 1,
        "faq": "-"
    },
    "01394": {
        "name": "Heroslayer",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 1 Damage 4",
        "set": 4,
        "faq": "-"
    },
    "01395": {
        "name": "Incredible Strength",
        "factions": 0,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 6,
        "faq": "-"
    },
    "01396": {
        "name": "Katophrane's Belt",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 2,
        "faq": "-"
    },
    "01397": {
        "name": "Katophrane's Boots",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 6,
        "faq": "-"
    },
    "01398": {
        "name": "Katophrane's Gloves",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 5,
        "faq": "-"
    },
    "01399": {
        "name": "Katophrane's Hood",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 4,
        "faq": "-"
    },
    "01400": {
        "name": "Katophrane's Locket",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 3,
        "faq": "-"
    },
    "01401": {
        "name": "Katophrane's Plate",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 1,
        "faq": "- "
    },
    "01402": {
        "name": "Legendary Swiftness",
        "factions": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 2,
        "faq": "-"
    },
    "01403": {
        "name": "Light Armour",
        "factions": 0,
        "type": 2,
        "rule": "Rolls of Critical Hit on a defence dice are no longer a success for this fighter. Roll an extra attack dice when this fighter make an Attack action",
        "set": 3,
        "faq": "-"
    },
    "01404": {
        "name": "Light-footed",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chose to), you can instead push them one hex",
        "set": 3,
        "faq": "-"
    },
    "01405": {
        "name": "Low Blow",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 Both Swordand Hammer symbols are successes for this Attack action",
        "set": 2,
        "faq": "-"
    },
    "01406": {
        "name": "Opportunist",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After a failed Attack action that targets this fighter, you can push them one hex",
        "set": 6,
        "faq": "-"
    },
    "01407": {
        "name": "Regeneration",
        "factions": 0,
        "type": 2,
        "rule": "At the beginning of each action phase, remove up to one wound token from this fighter",
        "set": 6,
        "faq": "-"
    },
    "01408": {
        "name": "Second-in-command",
        "factions": 0,
        "type": 2,
        "rule": "If your warband's leader is out of action, this fighter is considered to be a leader. While this fighter is on the battlefield, opponents cannot score objectives for having taken your leader out of action",
        "set": 3,
        "faq": "-"
    },
    "01409": {
        "name": "Shadeglass Axe",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage Hex 3 Hammer 2 Damage 2 After a fighter makes this Attack action, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 3,
        "faq": "-"
    },
    "01410": {
        "name": "Shadeglass Dagger",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 3 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "01411": {
        "name": "Shadeglass Darts",
        "factions": 0,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1 On a critical hit, this Attack action has +1 Damage",
        "set": 2,
        "faq": "-"
    },
    "01412": {
        "name": "Shadeglass Hammer",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 4,
        "faq": "-"
    },
    "01413": {
        "name": "Shadeglass Spear",
        "factions": 0,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 6,
        "faq": "-"
    },
    "01414": {
        "name": "Shadeglass Sword",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 3 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 1,
        "faq": "-"
    },
    "01415": {
        "name": "Shadestep",
        "factions": 0,
        "type": 2,
        "rule": "This fighter can move through other fighters during a Move action, but must end their move in an empty hex",
        "set": 4,
        "faq": "-"
    },
    "01416": {
        "name": "Shardcaller",
        "factions": 0,
        "type": 2,
        "rule": "At the beginning of each action phase, you can switch an objective held by this fighter with any other objective",
        "set": 2,
        "faq": ""
    },
    "01417": {
        "name": "Shifting Image",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After any Attack action in which you roll a Critical Hit for this fighter (with an attack or defence dice), you can push this fighter one hex",
        "set": 3,
        "faq": "-"
    },
    "01418": {
        "name": "Sixth Sense",
        "factions": 0,
        "type": 2,
        "rule": "Your opponent can never consider a Double Support as a success for Attack actions that target this fighter",
        "set": 1,
        "faq": "-"
    },
    "01419": {
        "name": "Solid Stance",
        "factions": 0,
        "type": 2,
        "rule": "This fighter can only be driven back by a critical hit",
        "set": 3,
        "faq": "-"
    },
    "01420": {
        "name": "Soultrap",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit they suffer no damage and are not taken out of action, and you discard this upgrade",
        "set": 1,
        "faq": "-"
    },
    "01421": {
        "name": "Sprinter",
        "factions": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 4,
        "faq": "-"
    },
    "01422": {
        "name": "Superior Agility",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chose to), you can instead push them one hex",
        "set": 6,
        "faq": "-"
    },
    "01423": {
        "name": "Swift Strike",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Reaction: Before making this Attack action, push this fighter one hex",
        "set": 2,
        "faq": ""
    },
    "01424": {
        "name": "Tethered Spirit",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit place them on any starting hex in your territory, ignore the damage and discard this upgrade. If you cannot, they are taken out of action",
        "set": 5,
        "faq": "-"
    },
    "01425": {
        "name": "The Blazing Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 3 in the third end phase, score 2 glory points",
        "set": 3,
        "faq": "-"
    },
    "01426": {
        "name": "The Dazzling Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 4 in the third end phase, score 2 glory points",
        "set": 1,
        "faq": "-"
    },
    "01427": {
        "name": "The Formless Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding an objective in the third end phase, score 1 glory point",
        "set": 5,
        "faq": "-"
    },
    "01428": {
        "name": "The Fractured Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 5 in the third end phase, score 2 glory points",
        "set": 4,
        "faq": "-"
    },
    "01429": {
        "name": "The Hallowed Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 1 in the third end phase, score 2 glory points",
        "set": 6,
        "faq": "-"
    },
    "01430": {
        "name": "The Shadowed Key",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 2 in the third end phase, score 2 glory points",
        "set": 2,
        "faq": "-"
    },
    "01431": {
        "name": "Total Offence",
        "factions": 0,
        "type": 2,
        "rule": "You can roll two additional attack dice when this fighter takes an Attack action, though not when this fighter takes a Charge action. If you do so, this fighter cannot be activated again this phase",
        "set": 0,
        "faq": ""
    },
    "01432": {
        "name": "Trickster's Charm",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is on the battlefield, you can play a single ploy card at the beginning of each action phase",
        "set": 4,
        "faq": "-"
    },
    "01433": {
        "name": "Trusted Defender",
        "factions": 0,
        "type": 2,
        "rule": "You can re-roll one defence dice for this fighter when they are the target of an Attack action",
        "set": 5,
        "faq": "-"
    },
    "01434": {
        "name": "Unparalleled Strike",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 1 Damage 2 Rolls of Hammer are considered to be rolls of Critical Hit for this Attack action",
        "set": 5,
        "faq": "-"
    },
    "01435": {
        "name": "Vampiric Weapon",
        "factions": 0,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, remove one wound token from this fighter",
        "set": 3,
        "faq": "-"
    },
    "01436": {
        "name": "War Cry",
        "factions": 0,
        "type": 2,
        "rule": "When this fighter makes a Charge action, their Attack actions gain Knockback 1 for that activation",
        "set": 5,
        "faq": "-"
    },
    "01437": {
        "name": "Zealous Defender",
        "factions": 0,
        "type": 2,
        "rule": "This fighter is considered to have an additional supporting fighter while they are holding an objective",
        "set": 6,
        "faq": "-"
    },
    "02001": {
        "name": "Invulnerable",
        "factions": 2,
        "type": 1,
        "rule": "Your leader has +1 Defence for the first Attack action in the next activation",
        "set": 7,
        "faq": "-"
    },
    "02002": {
        "name": "Steelheart’s Second",
        "factions": 2,
        "type": 2,
        "rule": "This fighter’s Attack actions have +1 Damage when they are adjacent to a friendly leader",
        "set": 7,
        "faq": "-"
    },
    "02003": {
        "name": "The Stage Is Set",
        "factions": 1,
        "type": 0,
        "rule": "Score this in an end phase if the only surviving fighters (at least 2) are leaders",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02004": {
        "name": "Coveted Trophy",
        "factions": 1,
        "type": 1,
        "rule": "Reaction: Play this when your leader takes an enemy leader out of action. Gain a glory point",
        "set": 7,
        "faq": "-"
    },
    "02005": {
        "name": "Fervent Petition",
        "factions": 3,
        "type": 0,
        "rule": "Score this in an end phase if three friendly Petitioners are surviving and Inspired",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02006": {
        "name": "Warden’s Call",
        "factions": 3,
        "type": 2,
        "rule": "Action: Choose two friendly fighters (other than your leader) and put them on Guard",
        "set": 7,
        "faq": "-"
    },
    "02007": {
        "name": "Showin’ Off",
        "factions": 4,
        "type": 0,
        "rule": "Score this in an end phase is your leader took two or more enemy fighters out of action in the preceding action phase",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02008": {
        "name": "Impress da Boss",
        "factions": 4,
        "type": 1,
        "rule": "+1 Damage for the first Attack action in the next activation made by a friendly fighter adjacent to your leader",
        "set": 7,
        "faq": "-"
    },
    "02009": {
        "name": "Pride of the Lodge",
        "factions": 5,
        "type": 0,
        "rule": "Score this in an end phase if your leader has three or more upgrades with his warband symbol",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02010": {
        "name": "Grimnir Commands",
        "factions": 5,
        "type": 1,
        "rule": "The first friendly fighter (other than your leader) to make a Move action (not as part of a Charge action) in the next activation has +2 Move. You can only play this if your leader is on the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02011": {
        "name": "Krrk Now Leads!",
        "factions": 6,
        "type": 0,
        "rule": "Score this in an end phase if your leader is out of action and a friendly fighter named Krrk is on the battlefield",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02012": {
        "name": "Krrk the Clawchief",
        "factions": 6,
        "type": 2,
        "rule": "Action: Return a friendly fighter (other than Skritch) to the battlefield in an empty hex adjacent to this fighter",
        "set": 7,
        "faq": "-"
    },
    "02013": {
        "name": "Khorne’s Chosen",
        "factions": 7,
        "type": 0,
        "rule": "Score this in an end phase if your leader is the only surviving fighter",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02014": {
        "name": "Gory Visage",
        "factions": 7,
        "type": 2,
        "rule": "Attack actions that target this fighter deal 1 less damage, to a minimum of 1",
        "set": 7,
        "faq": "-"
    },
    "02015": {
        "name": "Intervention",
        "factions": 8,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy holding an objective out of action",
        "set": 7,
        "scoreType": 0,
        "faq": "-"
    },
    "02016": {
        "name": "Raptor Strike",
        "factions": 8,
        "type": 1,
        "rule": "Choose an enemy fighter within four hexes of your leader. They take 1 damage",
        "set": 7,
        "faq": "-"
    },
    "02017": {
        "name": "Bold Advance",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the first end phase if your leader is in enemy territory",
        "set": 7,
        "scoreType": 3,
        "faq": "-"
    },
    "02018": {
        "name": "Drawing Focus",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your leader is chosen by three or more ploys in this phase",
        "set": 7,
        "scoreType": 0,
        "faq": "-"
    },
    "02019": {
        "name": "Fearless Leader",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is the only friendly fighter adjacent to any enemy fighters",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02020": {
        "name": "Great Slayer",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your leader takes three or more enemy fighters out of action in this phase",
        "set": 7,
        "scoreType": 0,
        "faq": "-"
    },
    "02021": {
        "name": "Impervious",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is on the battlefield and was the target of three or more Attack actions in the preceding action phase",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02022": {
        "name": "Linchpin",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your leader was a supporting fighter during three or more Attack actions in this phase",
        "set": 7,
        "scoreType": 0,
        "faq": "-"
    },
    "02023": {
        "name": "Neutralise",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the first end phase if an enemy leaders is out of action",
        "set": 7,
        "scoreType": 3,
        "faq": "-"
    },
    "02024": {
        "name": "Shining Example",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is on the battlefield and Inspired",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02025": {
        "name": "Slayer",
        "factions": 0,
        "type": 0,
        "rule": "Score this immediately if your leader takes two or more enemy fighters out of action in this phase",
        "set": 7,
        "scoreType": 0,
        "faq": "-"
    },
    "02026": {
        "name": "Sufficient",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is the only friendly fighter on the battlefield",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02027": {
        "name": "Tireless Commander",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if you activated your leader with four activations in the preceding action phase",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02028": {
        "name": "Undefeated",
        "factions": 0,
        "type": 0,
        "rule": "Score this in the third end phase if your leader is on the battlefield",
        "set": 7,
        "scoreType": 2,
        "faq": "-"
    },
    "02029": {
        "name": "Well-guarded",
        "factions": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is adjacent to two or more friendly fighters",
        "set": 7,
        "scoreType": 1,
        "faq": "-"
    },
    "02030": {
        "name": "Burden of Command",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy leader. Their Move characteristic (before other modifiers) is 1 for the next activation",
        "set": 7,
        "faq": "-"
    },
    "02031": {
        "name": "Cautious Commander",
        "factions": 0,
        "type": 1,
        "rule": "Put your leader on Guard",
        "set": 7,
        "faq": "-"
    },
    "02032": {
        "name": "Commanding Reach",
        "factions": 0,
        "type": 1,
        "rule": "Your leader’s first Attack action with a Range of 1 that only targets a single fighter in the next activation has a Range of 2",
        "set": 7,
        "faq": "-"
    },
    "02033": {
        "name": "Commanding Strike",
        "factions": 0,
        "type": 1,
        "rule": "You can re-roll one attack dice during your leader’s first Attack action in the next activation",
        "set": 7,
        "faq": "-"
    },
    "02034": {
        "name": "Crippling Doubt",
        "factions": 0,
        "type": 1,
        "rule": "Choose an enemy leader. The Dice characteristic (before other modifiers) of their first Attack action in the next activation is 1",
        "set": 7,
        "faq": "-"
    },
    "02035": {
        "name": "Final Duty",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action that will take your leader out of action, before they are removed from the battlefield. Roll an attack dice. On a roll of Hammer or Critical Hit, make an Attack action with them before they are removed from the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02036": {
        "name": "Great Cunning",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this after you play a power card in the power step. You can immediately play another power card. You can only play this if your leader is on the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02037": {
        "name": "Hidden Reserves",
        "factions": 0,
        "type": 1,
        "rule": "Remove one wound token from your leader’s fighter card",
        "set": 7,
        "faq": "-"
    },
    "02038": {
        "name": "Inspired Command",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter (other than your leader) and push them up to one hex or put them on Guard. You can only play this if your leader is on the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02039": {
        "name": "Look Out!",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action that will damage your leader. Roll a defence dice. On a roll of Single Support, Double Support, or Critical Hit, choose a friendly fighter adjacent to them. That fighter suffers the damage instead, then 1 additional damage, and no fighters are driven back",
        "set": 7,
        "faq": "-"
    },
    "02040": {
        "name": "No Retreat",
        "factions": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action that targets your leader, after the dice are rolled. Your leader cannot be driven back by the Attack action",
        "set": 7,
        "faq": "-"
    },
    "02041": {
        "name": "Premonition",
        "factions": 0,
        "type": 1,
        "rule": "In the next activation, you can re-roll one or more defence dice when your leader is the target of an Attack action",
        "set": 7,
        "faq": "-"
    },
    "02042": {
        "name": "Quick Advance",
        "factions": 0,
        "type": 1,
        "rule": "Choose up to two friendly fighters (other than your leader) and push each of them up to one hex. You can only play this if your leader is on the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02043": {
        "name": "Quick Manoeuvre",
        "factions": 0,
        "type": 1,
        "rule": "Choose your leader and an adjacent friendly fighter. Switch their positions",
        "set": 7,
        "faq": "-"
    },
    "02044": {
        "name": "Tyrant’s Command",
        "factions": 0,
        "type": 1,
        "rule": "Choose a friendly fighter (other than your leader) that has a Move token. Remove that token: that fighter is not considered to have moved for the purposes of their subsequent actions. You can only play this if your leader is on the battlefield",
        "set": 7,
        "faq": "-"
    },
    "02045": {
        "name": "Apex Predator",
        "factions": 0,
        "type": 2,
        "rule": "When this fighter takes an enemy leader out of action, gain an additional glory point",
        "set": 7,
        "faq": "-"
    },
    "02046": {
        "name": "Commanding Presence",
        "factions": 0,
        "type": 2,
        "rule": "This fighter is considered to be two supporting fighters when it supports another fighter",
        "set": 7,
        "faq": "-"
    },
    "02047": {
        "name": "Commanding Shout",
        "factions": 0,
        "type": 2,
        "rule": "Action: Push a friendly fighter (other than your leader) up to two hexes",
        "set": 7,
        "faq": "-"
    },
    "02048": {
        "name": "Cursed Shield",
        "factions": 0,
        "type": 2,
        "rule": "+1 Defence, -2 Wounds (to a minimum of 1)",
        "set": 7,
        "faq": "-"
    },
    "02049": {
        "name": "Hero’s Mantle",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is on the battlefield in the third end phase, gain 1 glory point",
        "set": 7,
        "faq": "-"
    },
    "02050": {
        "name": "Irresistible Challenge",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: During an adjacent enemy fighter’s Attack action, before any dice are rolled, change the target of that Attack action to this fighter and discard this card",
        "set": 7,
        "faq": "-"
    },
    "02051": {
        "name": "Katophrane's Ring [Relic]",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 7,
        "faq": "-"
    },
    "02052": {
        "name": "Kingsbane",
        "factions": 0,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 3 If the target is a leader, you can re-roll one attack dice when making this Attack action",
        "set": 7,
        "faq": "-"
    },
    "02053": {
        "name": "Loyal Defender",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After an enemy fighter makes a Move action and ends their move adjacent to another friendly fighter that is your leader, push this fighter up to two hexes. They must end the push adjacent to the enemy fighter",
        "set": 7,
        "faq": "-"
    },
    "02054": {
        "name": "Master of Tactics",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is on the battlefield, at the beginning of the round you can draw one objective card. If you do so, discard one objective card",
        "set": 7,
        "faq": "-"
    },
    "02055": {
        "name": "Mighty Shove",
        "factions": 0,
        "type": 2,
        "rule": "Action: Push an adjacent enemy fighter up to one hex",
        "set": 7,
        "faq": "-"
    },
    "02056": {
        "name": "Rising to the Challenge",
        "factions": 0,
        "type": 2,
        "rule": "If your leader is out of action, this fighter has +1 Wounds and the Attack actions on their fighter card have +1 Dice",
        "set": 7,
        "faq": "-"
    },
    "02057": {
        "name": "Seize the Day",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After this fighter makes a Move action (not as part of a Charge action) discard this card. They do not gain a Move token and are not considered to have moved for the purposes of their subsequent actions",
        "set": 7,
        "faq": "-"
    },
    "02058": {
        "name": "Treacherous Second",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After an action or ploy that takes your leader out of action, if this fighter is on the battlefield, gain 1 glory point",
        "set": 7,
        "faq": "-"
    },
    "02059": {
        "name": "Trusted Second",
        "factions": 0,
        "type": 2,
        "rule": "If this fighter is supporting your leader, they are considered to be two supporting fighters",
        "set": 7,
        "faq": "-"
    },
    "02060": {
        "name": "Tyrant’s Lash",
        "factions": 0,
        "type": 2,
        "rule": "Reaction: After an adjacent friendly fighter’s Attack action that fails, that fighter takes 2 damage. If they survive, they can make another Attack action",
        "set": 7,
        "faq": "-"
    },
    '03001':                                                                        
    { name: 'Blessed Banishment',                                                  
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                            
      faq: '-' },                                                                  
   '03002':                                                                        
    { name: 'Devastating Blow',                                                    
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03003':                                                                        
    { name: 'Fight as One',                                                        
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03004':                                                                        
    { name: 'Harness the Storm',                                                   
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03005':                                                                        
    { name: 'Heavily Armed',                                                       
      factions: 9,                                                               
      type: 8,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03006':                                                                        
    { name: 'Magical Supremacy',                                                   
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03007':                                                                        
    { name: 'Measured Strike',                                                     
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03008':                                                                        
    { name: 'Overwhelming Storm',                                                  
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03009':                                                                        
    { name: 'Purify the Earth',                                                    
      factions: 9,                                                               
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03010':                                                                        
    { name: 'Aetherwing Stance',                                                   
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03011':                                                                        
    { name: 'Chain Lightning',                                                     
      factions: 9,                                                                 
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03012':                                                                        
    { name: 'Cry of Thunder',                                                      
      factions: 9,                                                                 
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03013':                                                                        
    { name: 'Empathic Connection',                                                 
      factions: 9,                                                                 
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03014':                                                                        
    { name: 'Gather the Storm',                                                    
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03015':                                                                        
    { name: 'Lightning Assault',                                                   
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03016':                                                                        
    { name: 'Lightning Step',                                                      
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03017':                                                                        
    { name: 'Safeguard Spirit',                                                    
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03018':                                                                        
    { name: 'Stormstrike',                                                         
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03019':                                                                        
    { name: 'Stormward',                                                           
      factions: 9,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03020':                                                                        
    { name: 'Blessed Blade',                                                       
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03021':                                                                        
    { name: 'Corposant Staff',                                                     
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03022':                                                                        
    { name: 'Disarming Blow',                                                      
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03023':                                                                        
    { name: 'Eye of the Storm',                                                    
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03024':                                                                        
    { name: 'Hurricane Step',                                                      
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03025':                                                                        
    { name: 'Lightning Whip',                                                      
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03026':                                                                        
    { name: 'Stunning Blow',                                                       
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03027':                                                                        
    { name: 'Tempest\'s Might',                                                    
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03028':                                                                        
    { name: 'Unstoppable Zeal',                                                    
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03029':                                                                        
    { name: 'Warding Blast',                                                       
      factions: 9,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03030':                                                                        
    { name: 'As Nagash Commands',                                                  
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 2,                                                              
      faq: '-' },                                                                  
   '03031':                                                                        
    { name: 'Death Sentence',                                                      
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03032':                                                                        
    { name: 'Drag Them Down',                                                      
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03033':                                                                        
    { name: 'Execution',                                                           
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03034':                                                                        
    { name: 'Swarming Spirits',                                                    
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03035':                                                                        
    { name: 'Take the City',                                                       
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03036':                                                                        
    { name: 'The Vengeful Dead',                                                   
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03037':                                                                        
    { name: 'Treacherous Foe',                                                     
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 0,                                                              
      faq: '-' },                                                                  
   '03038':                                                                        
    { name: 'Vengeful Advance',                                                    
      factions: 10,                                                              
      type: 0,                                                                   
      rule: '',                                                                    
      set: 8,                                                                    
      scoreType: 1,                                                              
      faq: '-' },                                                                  
   '03039':                                                                        
    { name: 'Drifting Advance',                                                    
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03040':                                                                        
    { name: 'Endless Malice',                                                      
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03041':                                                                        
    { name: 'Grasping Chains',                                                     
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03042':                                                                        
    { name: 'Howling Vortex',                                                      
      factions: 10,                                                                
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03043':                                                                        
    { name: 'Maddening Cackle',                                                    
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03044':                                                                        
    { name: 'Rending Scream',                                                      
      factions: 10,                                                                
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03045':                                                                        
    { name: 'Spectral Parry',                                                      
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03046':                                                                        
    { name: 'Spectral Touch',                                                      
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03047':                                                                        
    { name: 'Sudden Appearance',                                                   
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03048':                                                                        
    { name: 'Vengeful Curse',                                                      
      factions: 10,                                                                
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03049':                                                                        
    { name: 'Chill Touch',                                                         
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03050':                                                                        
    { name: 'Creeping Terror',                                                     
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03051':                                                                        
    { name: 'Curse of Unbinding',                                                  
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03052':                                                                        
    { name: 'Driven by Hatred',                                                    
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03053':                                                                        
    { name: 'Face of Death',                                                       
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03054':                                                                        
    { name: 'Grasping Thorns',                                                     
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03055':                                                                        
    { name: 'Inescapable Vengeance',                                               
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03056':                                                                        
    { name: 'Sadistic Strike',                                                     
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03058':                                                                        
    { name: 'Strangling Coil',                                                     
      factions: 10,                                                                
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03294':                                                                        
    { name: 'Annihilation',                                                        
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03306':                                                                        
    { name: 'Conquest',                                                            
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03310': { name: 'Denial', factions: 0, type: 0, rule: '', set: 8, faq: '-' },  
   '03330':                                                                        
    { name: 'Hold Objective 1',                                                    
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03331':                                                                        
    { name: 'Hold Objective 2',                                                    
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03332':                                                                        
    { name: 'Hold Objective 3',                                                    
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03333':                                                                        
    { name: 'Hold Objective 4',                                                    
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03334':                                                                        
    { name: 'Hold Objective 5',                                                    
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03374':                                                                        
    { name: 'Supremacy',                                                           
      factions: 0,                                                                 
      type: 0,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03403':                                                                        
    { name: 'Confusion',                                                           
      factions: 0,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03409':                                                                        
    { name: 'Determined Effort',                                                   
      factions: 0,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03419':                                                                        
    { name: 'Grinding Earth',                                                      
      factions: 0,                                                                 
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03446':                                                                        
    { name: 'Sidestep',                                                            
      factions: 0,                                                                 
      type: 1,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03471':                                                                        
    { name: 'Vital Surge',                                                         
      factions: 0,                                                                 
      type: 3,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03497':                                                                        
    { name: 'Escape Artist',                                                       
      factions: 0,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03504':                                                                        
    { name: 'Great Fortitude',                                                     
      factions: 0,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03505':                                                                        
    { name: 'Great Speed',                                                         
      factions: 0,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03506':                                                                        
    { name: 'Great Strength',                                                      
      factions: 0,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' },                                                                  
   '03512':                                                                        
    { name: 'Lucky Trinket',                                                       
      factions: 0,                                                                 
      type: 2,                                                                     
      rule: '',                                                                    
      set: 8,                                                                      
      faq: '-' }                                                                 
}