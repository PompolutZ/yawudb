export const faction = ["Universal", "Garrek's Reavers", "Steelheart's Champions", "Sepulchral Guard", "Ironskull's Boyz", "The Chosen Axes", "Spiteclaw's Swarm", "Magore's Fiends", "The Farstriders"];
export const cardSet = ["Core set", "Sepulchral Guard expansion", "Ironskull's Boyz expansion", "The Chosen Axes expansion", "Spiteclaw's Swarm expansion", "Magore's Fiends expansion", "The Farstriders expansion"];
export const cardType = ["Objective", "Upgrade", "Ploy"]

export const expansionCards = {
    1: ["59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "240", "250", "254", "259", "281", "287", "290", "293", "296", "297", "299", "324", "325", "332", "339", "353", "357", "364", "368", "370", "371", "375", "377", "379", "380", "393", "401", "414", "418", "420", "426"],
    2: ["88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "239", "241", "248", "255", "256", "260", "282", "288", "291", "302", "305", "308", "312", "315", "318", "319", "320", "341", "345", "346", "359", "381", "382", "387", "396", "402", "405", "411", "416", "423", "430"],
    3: ["117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "237", "251", "268", "270", "277", "280", "284", "294", "300", "301", "303", "310", "314", "316", "321", "327", "337", "344", "348", "366", "369", "392", "400", "403", "404", "408", "409", "417", "419", "425", "435"],
    4: ["146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "235", "242", "249", "257", "272", "274", "276", "279", "286", "295", "298", "309", "313", "317", "336", "342", "349", "351", "352", "358", "362", "374", "376", "386", "394", "399", "412", "415", "421", "428", "432"],
    5: ["175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "233", "244", "262", "269", "271", "273", "275", "283", "285", "306", "307", "323", "328", "331", "335", "340", "343", "350", "354", "365", "367", "383", "384", "388", "398", "410", "424", "427", "433", "434", "436"],
    6: ["204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "234", "238", "243", "245", "246", "252", "258", "261", "278", "289", "304", "322", "326", "329", "333", "334", "338", "347", "356", "361", "372", "373", "378", "395", "397", "406", "407", "413", "422", "429", "437"]
}

export const cardsDb =    {
    "1": {
        "name": "A Worthy Skull",
        "faction": 1,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 0,
        "faq": "-"
    },
    "2": {
        "name": "Blood For The Blood God!",
        "faction": 1,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action in this phase",
        "set": 0,
        "faq": "-"
    },
    "3": {
        "name": "Coward!",
        "faction": 1,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter begins a Move action adjacent to one of your fighters and ends it adjacent to none of your fighters",
        "set": 0,
        "faq": "-"
    },
    "4": {
        "name": "Draw The Gaze Of Khorne",
        "faction": 1,
        "type": 0,
        "rule": "Score this immediately if your warband takes two or more enemy fighters out of action in this phase",
        "set": 0,
        "faq": "-"
    },
    "5": {
        "name": "It Begins",
        "faction": 1,
        "type": 0,
        "rule": "Score this in an end phase if at least one fighter from each warband is out of action",
        "set": 0,
        "faq": "-"
    },
    "6": {
        "name": "Khorne Cares Not",
        "faction": 1,
        "type": 0,
        "rule": "Score this in an end phase if five or more fighters are out of action",
        "set": 0,
        "faq": "-"
    },
    "7": {
        "name": "Khorne's Champion",
        "faction": 1,
        "type": 0,
        "rule": "Score this in the third end phase if all fighters except one of your fighters are out of action",
        "set": 0,
        "faq": "-"
    },
    "8": {
        "name": "Let The Blood Flow",
        "faction": 1,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a successful Attack action in this phase",
        "set": 0,
        "faq": "-"
    },
    "9": {
        "name": "There Is Only Slaughter",
        "faction": 1,
        "type": 0,
        "rule": "Score this in an end phase if no fighter is holding an objective",
        "set": 0,
        "faq": "-"
    },
    "10": {
        "name": "Blood Offering",
        "faction": 1,
        "type": 1,
        "rule": "Choose a friendly fighter. They suffer 1 damage. Roll two extra attack dice for their first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "11": {
        "name": "Blood Rain",
        "faction": 1,
        "type": 1,
        "rule": "All Attack actions in the next activation have the Sword characteristic, even if they would normally have the Hammer characteristic",
        "set": 0,
        "faq": ""
    },
    "12": {
        "name": "Boon Of Khorne",
        "faction": 1,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. Remove all wound tokens from one friendly fighter",
        "set": 0,
        "faq": "-"
    },
    "13": {
        "name": "Desecrate",
        "faction": 1,
        "type": 1,
        "rule": "Remove one objective that you hold from the battlefield",
        "set": 0,
        "faq": "-"
    },
    "14": {
        "name": "Final Blow",
        "faction": 1,
        "type": 1,
        "rule": "Reaction: Play this after an enemy fighter's Attack action that takes an adjacent friendly fighter out of action. Their attacker suffers 1 damage",
        "set": 0,
        "faq": "-"
    },
    "15": {
        "name": "Fuelled By Slaughter",
        "faction": 1,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. A friendly fighter can make an Attack action",
        "set": 0,
        "faq": "-"
    },
    "16": {
        "name": "Insensate",
        "faction": 1,
        "type": 1,
        "rule": "The first friendly fighter who suffers any amount of damage in the next activation only suffers one damage",
        "set": 0,
        "faq": "-"
    },
    "17": {
        "name": "Khorne Calls",
        "faction": 1,
        "type": 1,
        "rule": "Roll one extra attack dice for your first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "18": {
        "name": "Rebirth In Blood",
        "faction": 1,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes your last surviving fighter out of action. Roll a defense dice. If you roll a Shield or Critical Hit remove all wound tokens from them, and place them on a starting hex in your territory",
        "set": 0,
        "faq": ""
    },
    "19": {
        "name": "Skulls For The Skull Throne!",
        "faction": 1,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. Draw up to two power cards",
        "set": 0,
        "faq": "-"
    },
    "20": {
        "name": "Berserk Charge",
        "faction": 1,
        "type": 2,
        "rule": "Both Sword and Hammer symbols are successes when this fighter makes a Charge action",
        "set": 0,
        "faq": "-"
    },
    "21": {
        "name": "Bloodslick",
        "faction": 1,
        "type": 2,
        "rule": "+1 Defence",
        "set": 0,
        "faq": "-"
    },
    "22": {
        "name": "Deadly Spin",
        "faction": 1,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets adjacent enemy fighters - roll for each",
        "set": 0,
        "faq": "-"
    },
    "23": {
        "name": "Ever-Advancing",
        "faction": 1,
        "type": 2,
        "rule": "Reaction: When this fighter could be driven back during an Attack action (whether or not your opponent chooses to do so), you can instead push them one hex",
        "set": 0,
        "faq": ""
    },
    "24": {
        "name": "Frenzy",
        "faction": 1,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 0,
        "faq": "-"
    },
    "25": {
        "name": "Grisly Trophy",
        "faction": 1,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, gain 1 additional glory point",
        "set": 0,
        "faq": "-"
    },
    "26": {
        "name": "Terrifying Howl",
        "faction": 1,
        "type": 2,
        "rule": "Action: Push each adjacent enemy fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "27": {
        "name": "Unstoppable Charge",
        "faction": 1,
        "type": 2,
        "rule": "When this fighter makes a Charge action they can move through other fighters, but their move must end in an empty hex",
        "set": 0,
        "faq": "-"
    },
    "28": {
        "name": "Whirlwind of Death",
        "faction": 1,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 0,
        "faq": "-"
    },
    "29": {
        "name": "Wicked Blade",
        "faction": 1,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2 If you roll at least one Critical Hit this Attack action has Cleave",
        "set": 0,
        "faq": "-"
    },
    "30": {
        "name": "Awe-Inspiring",
        "faction": 2,
        "type": 0,
        "rule": "Score this immediately if your warband has taken two or more fighters out of action in this phase",
        "set": 0,
        "faq": "-"
    },
    "31": {
        "name": "Cleanse",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if you hold all objectives in enemy territory",
        "set": 0,
        "faq": "-"
    },
    "32": {
        "name": "Consecrated Area",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if there are no enemy fighters adjacent to your fighters",
        "set": 0,
        "faq": "-"
    },
    "33": {
        "name": "Eternals",
        "faction": 2,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 0,
        "faq": "-"
    },
    "34": {
        "name": "Immovable Object",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if the same friendly fighter has held the same objective at the end of two consecutive action phases",
        "set": 0,
        "faq": "-"
    },
    "35": {
        "name": "Lightning Strikes",
        "faction": 2,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter is taken out of action by a Charge action made by one of your fighters",
        "set": 0,
        "faq": "-"
    },
    "36": {
        "name": "Seize Ground",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if you hold an objective in enemy territory",
        "set": 0,
        "faq": "-"
    },
    "37": {
        "name": "Sigmar's Bulwark",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if none of your fighters suffered any damage in the preceding action phase",
        "set": 0,
        "faq": ""
    },
    "38": {
        "name": "Slayers Of Tyrants",
        "faction": 2,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 0,
        "faq": "-"
    },
    "39": {
        "name": "Heroic Guard",
        "faction": 2,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 0,
        "faq": "-"
    },
    "40": {
        "name": "Peal Of Thunder",
        "faction": 2,
        "type": 1,
        "rule": "Choose any enemy fighter and push them one hex in any direction",
        "set": 0,
        "faq": "-"
    },
    "41": {
        "name": "Righteous Zeal",
        "faction": 2,
        "type": 1,
        "rule": "+1 Damage to the first Attack action with a Range of 1 or 2 in the next activation",
        "set": 0,
        "faq": "-"
    },
    "42": {
        "name": "Sigmarite Wall",
        "faction": 2,
        "type": 1,
        "rule": "Choose two adjacent friendly fighters and put them on Guard",
        "set": 0,
        "faq": "-"
    },
    "43": {
        "name": "Stormforged Resistance",
        "faction": 2,
        "type": 1,
        "rule": "Friendly fighters cannot be driven back by the first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "44": {
        "name": "Stormforged Tactics",
        "faction": 2,
        "type": 1,
        "rule": "In the next activation make the following Reaction. Reaction: After an enemy fighter's Attack action that fails, choose up to two friendly fighters and push them up to one hex each",
        "set": 0,
        "faq": "-"
    },
    "45": {
        "name": "Tireless Assault",
        "faction": 2,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. That fighter can make another Attack action that targets the same fighter",
        "set": 0,
        "faq": ""
    },
    "46": {
        "name": "Undaunted",
        "faction": 2,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a friendly fighter out of action leaving one surviving friendly fighter on the battlefield. Remove all wound tokens from the surviving fighter",
        "set": 0,
        "faq": "-"
    },
    "47": {
        "name": "Unstoppable Strike",
        "faction": 2,
        "type": 1,
        "rule": "The first Attack action in the next activation gains Cleave",
        "set": 0,
        "faq": "-"
    },
    "48": {
        "name": "Valiant Attack",
        "faction": 2,
        "type": 1,
        "rule": "Enemy fighters cannot support the target of the first Attack action in the next activation",
        "set": 0,
        "faq": "-"
    },
    "49": {
        "name": "Blessed by Sigmar",
        "faction": 2,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 0,
        "faq": "-"
    },
    "50": {
        "name": "Block",
        "faction": 2,
        "type": 2,
        "rule": "Action: This fighter and all adjacent friendly fighters go on Guard",
        "set": 0,
        "faq": "-"
    },
    "51": {
        "name": "Brave Strike",
        "faction": 2,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 Roll an extra attack dice if there are no adjacent friendly fighters",
        "set": 0,
        "faq": "-"
    },
    "52": {
        "name": "Fatal Riposte",
        "faction": 2,
        "type": 2,
        "rule": "Reaction: During an Attack action that targets this fighter and fails, roll an attack dice. On a roll of Hammer or Critical Hit this fighter cannot be driven back and they can make an Attack action. It must target the attacker.",
        "set": 0,
        "faq": ""
    },
    "53": {
        "name": "Heroic Might",
        "faction": 2,
        "type": 2,
        "rule": "This fighter's Attack action gains Cleave",
        "set": 0,
        "faq": "-"
    },
    "54": {
        "name": "Heroic Stride",
        "faction": 2,
        "type": 2,
        "rule": "Reaction: After an enemy fighter ends their activation within two hexes of this fighter, you can push this fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "55": {
        "name": "Lightning Blade",
        "faction": 2,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 1 On a critical hit, this Attack action has +1 Damage",
        "set": 0,
        "faq": "-"
    },
    "56": {
        "name": "Lightning Blast",
        "faction": 2,
        "type": 2,
        "rule": "When they make a critical hit, this fighter also inflicts 1 damage on enemy fighters adjacent to the target's hex",
        "set": 0,
        "faq": ""
    },
    "57": {
        "name": "Righteous Strike",
        "faction": 2,
        "type": 2,
        "rule": "Hex 1 Hammer 3 Damage 2 Reaction: After this Attack action, if it failed and the target was an enemy leader, make this Attack action again",
        "set": 0,
        "faq": "-"
    },
    "58": {
        "name": "Shield Bash",
        "faction": 2,
        "type": 2,
        "rule": "Reaction: During an adjacent fighter's Attack action that targets this fighter and fails, this fighter cannot be driven back and you can push their attacker one hex",
        "set": 0,
        "faq": ""
    },
    "59": {
        "name": "Battle Without End",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if two or more friendly fighters returned to the battlefield in the preceding action phase",
        "set": 1,
        "faq": ""
    },
    "60": {
        "name": "Claim The City",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if you hold every objective",
        "set": 1,
        "faq": ""
    },
    "61": {
        "name": "Fearless In Death",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if there is only one friendly fighter on the battlefield",
        "set": 1,
        "faq": "-"
    },
    "62": {
        "name": "March Of The Dead",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least five) made a Move action in the preceding action phase",
        "set": 1,
        "faq": "-"
    },
    "63": {
        "name": "More Able Bodies",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if your warband took two or more enemy fighters out of action in the preceding action phase",
        "set": 1,
        "faq": "-"
    },
    "64": {
        "name": "Peerless General",
        "faction": 3,
        "type": 0,
        "rule": "Score this in the third end phase if you have four or more surviving fighters, and none are Inspired",
        "set": 1,
        "faq": "-"
    },
    "65": {
        "name": "Skills Unforgotten",
        "faction": 3,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 1,
        "faq": "-"
    },
    "66": {
        "name": "The Invigorated Dead",
        "faction": 3,
        "type": 0,
        "rule": "Score this in the third end phase if all of your surviving fighters (at least three) are Inspired",
        "set": 1,
        "faq": "-"
    },
    "67": {
        "name": "Undead Swarm",
        "faction": 3,
        "type": 0,
        "rule": "Score this in an end phase if each enemy fighter is adjacent to at least two friendly fighters",
        "set": 1,
        "faq": "-"
    },
    "68": {
        "name": "Bone Shrapnel",
        "faction": 3,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. The fighter that took them out of action suffers 1 damage",
        "set": 1,
        "faq": "-"
    },
    "69": {
        "name": "Ceaseless Attacks",
        "faction": 3,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action. Make an Attack action with another friendly fighter",
        "set": 1,
        "faq": "-"
    },
    "70": {
        "name": "Clawing Hands",
        "faction": 3,
        "type": 1,
        "rule": "Each friendly fighter that is not on the battlefield is considered to be supporting the first Attack action in the next activation",
        "set": 1,
        "faq": "-"
    },
    "71": {
        "name": "Dance Macabre",
        "faction": 3,
        "type": 1,
        "rule": "Any friendly fighters that make a Move action in the next activation can move one additional hex",
        "set": 1,
        "faq": "-"
    },
    "72": {
        "name": "Grasping Hands",
        "faction": 3,
        "type": 1,
        "rule": "Reduce the Move characteristic of the first fighter to be activated in the next activation by the number of friendly fighters that are not on the battlefield, to a minimum of 0",
        "set": 1,
        "faq": "-"
    },
    "73": {
        "name": "Restless Dead",
        "faction": 3,
        "type": 1,
        "rule": "Place a friendly fighter that was taken out of action (other than the Sepulchral Warden) on a starting hex in your territory",
        "set": 1,
        "faq": "-"
    },
    "74": {
        "name": "Spectral Form",
        "faction": 3,
        "type": 1,
        "rule": "Any friendly fighters that make a Move action in the next activation can move through additional fighters, but must end their moves on empty hexes",
        "set": 1,
        "faq": "-"
    },
    "75": {
        "name": "Swift Evasion",
        "faction": 3,
        "type": 1,
        "rule": "Choose one friendly fighter and push them up to two hexes. Their new position must be further away from all enemy fighters",
        "set": 1,
        "faq": "-"
    },
    "76": {
        "name": "Terrifying Screams",
        "faction": 3,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 1,
        "faq": "-"
    },
    "77": {
        "name": "The Necromancer Commands",
        "faction": 3,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. Make the Attack action again",
        "set": 1,
        "faq": ""
    },
    "78": {
        "name": "Ancient Commander",
        "faction": 3,
        "type": 2,
        "rule": "Action: Choose three other friendly fighters. Make Move actions with these fighters. This does not allow a fighter to move twice in a phase",
        "set": 1,
        "faq": "-"
    },
    "79": {
        "name": "Assumed Command  ",
        "faction": 3,
        "type": 2,
        "rule": "Each friendly fighter that supports this fighter is considered to be two supporting fighters",
        "set": 1,
        "faq": "-"
    },
    "80": {
        "name": "Deathly Charge",
        "faction": 3,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage in a phase in which they make a Charge action",
        "set": 1,
        "faq": "-"
    },
    "81": {
        "name": "Fatal Strike",
        "faction": 3,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 Reaction: Make this Attack action during an Attack action that takes this fighter out of action, before they are removed from the battlefield. It must target their attacker",
        "set": 1,
        "faq": "-"
    },
    "82": {
        "name": "Focused Attack",
        "faction": 3,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 If you roll at least one Critical Hit this Attack action has Cleave",
        "set": 1,
        "faq": "-"
    },
    "83": {
        "name": "Frightning Speed",
        "faction": 3,
        "type": 2,
        "rule": "+2 Move",
        "set": 1,
        "faq": "-"
    },
    "84": {
        "name": "Grim Cleave",
        "faction": 3,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 1,
        "faq": "-"
    },
    "85": {
        "name": "Lethal Lunge",
        "faction": 3,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 3 Cleave",
        "set": 1,
        "faq": "-"
    },
    "86": {
        "name": "Remembered Shield",
        "faction": 3,
        "type": 2,
        "rule": "This fighter's Defence characteristic changes to Shield",
        "set": 1,
        "faq": "-"
    },
    "87": {
        "name": "Undying",
        "faction": 3,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 1,
        "faq": "-"
    },
    "88": {
        "name": "Ard As Iron",
        "faction": 4,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 2,
        "faq": "-"
    },
    "89": {
        "name": "Biggest 'an da Best",
        "faction": 4,
        "type": 0,
        "rule": "Score this in an end phase if your leader took an enemy fighter out of action in the preceding action phase",
        "set": 2,
        "faq": "-"
    },
    "90": {
        "name": "Call Of The Waaagh!",
        "faction": 4,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action this phase",
        "set": 2,
        "faq": "-"
    },
    "91": {
        "name": "Dead Kunnin'",
        "faction": 4,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter has two more supporting fighters than their target when making an Attack action",
        "set": 2,
        "faq": "-"
    },
    "92": {
        "name": "Dere's More Of Us",
        "faction": 4,
        "type": 0,
        "rule": "Score this in an end phase if you have more fighters on the battlefield than your opponent",
        "set": 2,
        "faq": "-"
    },
    "93": {
        "name": "Get da Boss",
        "faction": 4,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 2,
        "faq": "-"
    },
    "94": {
        "name": "Good Scrap",
        "faction": 4,
        "type": 0,
        "rule": "Score this in an end phase if three or more fighters were taken out of action in the preceding action phase",
        "set": 2,
        "faq": "-"
    },
    "95": {
        "name": "Punch-up",
        "faction": 4,
        "type": 0,
        "rule": "Score this in an end phase if each of your surviving fighters (at least two) made an Attack action against a different enemy fighter in the preceding action phase",
        "set": 2,
        "faq": "-"
    },
    "96": {
        "name": "Too Dumb to Die",
        "faction": 4,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter suffers 3 or more damage in a single attack and is not take out of action",
        "set": 2,
        "faq": "-"
    },
    "97": {
        "name": "Avin a Good Time",
        "faction": 4,
        "type": 1,
        "rule": "Choose a fighter and roll an attack dice. If you roll a Hammer or Critical Hit the can make an Attack action",
        "set": 2,
        "faq": "-"
    },
    "98": {
        "name": "Brutal but Kunnin'",
        "faction": 4,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action. You can push that fighter up to three hexes",
        "set": 2,
        "faq": "-"
    },
    "99": {
        "name": "Deafening Bellow",
        "faction": 4,
        "type": 1,
        "rule": "Choose an enemy fighter adjacent to one of your fighters. Push that fighter one hex",
        "set": 2,
        "faq": "-"
    },
    "100": {
        "name": "Gorkamorka's Blessing",
        "faction": 4,
        "type": 1,
        "rule": "The first Attack action with a Range of 1 or 2 in the next activation has +1 Damage",
        "set": 2,
        "faq": "-"
    },
    "101": {
        "name": "Kunnin' but Brutal",
        "faction": 4,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Move action. That fighter can make an Attack action. You cannot play this during a Charge action",
        "set": 2,
        "faq": "-"
    },
    "102": {
        "name": "Last Lunge",
        "faction": 4,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action or ploy that will take a friendly fighter out of action, before removing them from the battlefield. Roll an attack dice. On a roll of Hammer or Critical Hit make an Attack action with that fighter. It must target the attacker",
        "set": 2,
        "faq": "-"
    },
    "103": {
        "name": "Leadin' by Example",
        "faction": 4,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action made by your leader that takes an enemy fighter out of action. Another friendly fighter that has not already made a Move or Charge action can make a Charge action",
        "set": 2,
        "faq": ""
    },
    "104": {
        "name": "More Choppin'",
        "faction": 4,
        "type": 1,
        "rule": "Roll an extra attack dice for the first Attack action in the next activation",
        "set": 2,
        "faq": "-"
    },
    "105": {
        "name": "Pillage",
        "faction": 4,
        "type": 1,
        "rule": "Remove one objective that you hold from the battlefield",
        "set": 2,
        "faq": "-"
    },
    "106": {
        "name": "Scrag 'Em",
        "faction": 4,
        "type": 1,
        "rule": "Each friendly fighter that supports the first Attack action in the next activation is considered to be two supporting fighters",
        "set": 2,
        "faq": "-"
    },
    "107": {
        "name": "Ard Head",
        "faction": 4,
        "type": 2,
        "rule": "When this fighter suffers damage, reduce that damage by 1 to a minimum of 1",
        "set": 2,
        "faq": "-"
    },
    "108": {
        "name": "Aspiring Boss",
        "faction": 4,
        "type": 2,
        "rule": "Reaction: During an Attack action by this fighter that targets an enemy leader and fails, you can re-roll one attack dice",
        "set": 2,
        "faq": "-"
    },
    "109": {
        "name": "Brutal Frenzy",
        "faction": 4,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 2,
        "faq": "-"
    },
    "110": {
        "name": "Brutal Swing",
        "faction": 4,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 2,
        "faq": "-"
    },
    "111": {
        "name": "Crush and Cleave",
        "faction": 4,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 2,
        "faq": "-"
    },
    "112": {
        "name": "Dead 'Ard",
        "faction": 4,
        "type": 2,
        "rule": "This fighter can only be driven back by a critical hit",
        "set": 2,
        "faq": "-"
    },
    "113": {
        "name": "Eadbutt",
        "faction": 4,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 If this Attack action succeeds, the target cannot be activated for the rest of the phase",
        "set": 2,
        "faq": "-"
    },
    "114": {
        "name": "Headlong Rush",
        "faction": 4,
        "type": 2,
        "rule": "This fighter's Attack actions gain Knockback 1 in a phase in which they make a Charge action",
        "set": 2,
        "faq": "-"
    },
    "115": {
        "name": "Unkillable",
        "faction": 4,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit they suffer no damage and are not taken out of action, and you discard this upgrade",
        "set": 2,
        "faq": "-"
    },
    "116": {
        "name": "Waaagh!",
        "faction": 4,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage in a phase in which they make a Charge action",
        "set": 2,
        "faq": "-"
    },
    "117": {
        "name" : "A Claim Retaken",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if a friendly fighter holds an objective that an enemy fighter held at the beginning of the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "118": {
        "name" : "A Grim Promise",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "119": {
        "name" : "Ferocious Charge",
        "faction": 5,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter takes an enemy fighter out of action with a Charge action",
        "set": 3,
        "faq": "-"
    },
    "120": {
        "name" : "For The Ur-Gold",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if all your surviving fighters (at least three) are Inspired",
        "set": 3,
        "faq": "-"
    },
    "121": {
        "name" : "Fury of the Lodge",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) made a Charge action in the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "122": {
        "name" : "Hoarders",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your fighters and no enemy fighters are holding objectives",
        "set": 3,
        "faq": "-"
    },
    "123": {
        "name" : "Oaths Still to Fulfil",
        "faction": 5,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 3,
        "faq": "-"
    },
    "124": {
        "name" : "Scion of Grminir",
        "faction": 5,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 3,
        "faq": "-"
    },
    "125": {
        "name" : "Unstoppable Advance",
        "faction": 5,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters are in enemy territory",
        "set": 3,
        "faq": "-"
    },
    "126": {
        "name" : "Berserk Fury",
        "faction": 5,
        "type": 1,
        "rule": "The first time a friendly fighter suffers damage in the next activation, roll a defence dice. If the result is a Shield they suffer no damage",
        "set": 3,
        "faq": "-"
    },
    "127": {
        "name" : "Indomitable",
        "faction": 5,
        "type": 1,
        "rule": "The first time a friendly fighter suffers damage in the next activation, they only suffer 1 damage",
        "set": 3,
        "faq": "-"
    },
    "128": {
        "name" : "Living Wall",
        "faction": 5,
        "type": 1,
        "rule": "Choose two friendly fighters and push each of them up to one hex. They must end up adjacent to one another",
        "set": 3,
        "faq": "-"
    },
    "129": {
        "name" : "Oathsworn",
        "faction": 5,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that fails. That fighter can make another Attack action that targets the same fighter",
        "set": 3,
        "faq": "-"
    },
    "130": {
        "name" : "Piercing Stare",
        "faction": 5,
        "type": 1,
        "rule": "Choose an enemy fighter. They cannot make an Attack action or a Charge action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "131": {
        "name" : "Slaying Blow",
        "faction": 5,
        "type": 1,
        "rule": "If the first Attack action in the next activation is a critical hit, double its Damage characteristic",
        "set": 3,
        "faq": "-"
    },
    "132": {
        "name" : "The Earth Shakes",
        "faction": 5,
        "type": 1,
        "rule": "Choose a fighter and push them one hex",
        "set": 3,
        "faq": "-"
    },
    "133": {
        "name" : "Treasure-lust",
        "faction": 5,
        "type": 1,
        "rule": "Choose a friendly fighter and push them up to three hexes. They must end up holding an objective",
        "set": 3,
        "faq": "-"
    },
    "134": {
        "name" : "Ur-Gold Boon",
        "faction": 5,
        "type": 1,
        "rule": "Choose a friendly fighter and roll a defence dice. On a roll of Shield or Critical Hit remove up to two wound tokens from them. Otherwise remove one wound token from them",
        "set": 3,
        "faq": "-"
    },
    "135": {
        "name" : "We Shall Not Be Moved",
        "faction": 5,
        "type": 1,
        "rule": "Friendly fighters holding objectives cannot be driven back by the first Attack action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "136": {
        "name" : "Activated Runes",
        "faction": 5,
        "type": 2,
        "rule": "Each time this fighter make an Attack action, you can re-roll one dice",
        "set": 3,
        "faq": "-"
    },
    "137": {
        "name" : "Brute Strength",
        "faction": 5,
        "type": 2,
        "rule": "This fighter's Attack actions gain Knockback 1",
        "set": 3,
        "faq": "-"
    },
    "138": {
        "name" : "Defiant Strike",
        "faction": 5,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Reaction: During an Attack action that succeeds against this fighter, this fighter cannot be driven back and makes this Attack action. It must target the attacker.",
        "set": 3,
        "faq": "-"
    },
    "139": {
        "name" : "Flurry of Blows",
        "faction": 5,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 2",
        "set": 3,
        "faq": "-"
    },
    "140": {
        "name" : "Great Swing",
        "faction": 5,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 3,
        "faq": "-"
    },
    "141": {
        "name" : "Grimnir's Blessing",
        "faction": 5,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that would take this fighter out of action, roll a defence dice. If you roll a Shield the damage suffered by this fighter is ignored",
        "set": 3,
        "faq": "-"
    },
    "142": {
        "name" : "Grimnir's Fortitude",
        "faction": 5,
        "type": 2,
        "rule": "+1 Defence",
        "set": 3,
        "faq": "-"
    },
    "143": {
        "name" : "Grimnir's Speed",
        "faction": 5,
        "type": 2,
        "rule": "+2 Move",
        "set": 3,
        "faq": "-"
    },
    "144": {
        "name" : "Returning Axe",
        "faction": 5,
        "type": 2,
        "rule": "Hex 3 Sword 2 Damage 1 On a critical hit this Attack action has +1 Damage",
        "set": 3,
        "faq": "-"
    },
    "145": {
        "name" : "War Song",
        "faction": 5,
        "type": 2,
        "rule": "This fighter is considered to be two supporting fighters when they support, rather than one",
        "set": 3,
        "faq": "-"
    },
    "146": {
        "name" : "Arm's Length",
        "faction": 6,
        "type": 0,
        "rule": "Score this immediately if your warband takes an enemy fighter out of action while they are adjacent to none of your fighters",
        "set": 4,
        "faq": "-"
    },
    "147": {
        "name" : "Brilliant, Brilliant!",
        "faction": 6,
        "type": 0,
        "rule": "Score this in an end phase if you scored two or more other objective cards in the preceding action phase",
        "set": 4,
        "faq": "-"
    },
    "148": {
        "name" : "Feast-feast",
        "faction": 6,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 4,
        "faq": "-"
    },
    "149": {
        "name" : "Honed Survival Instincts",
        "faction": 6,
        "type": 0,
        "rule": "Score this in an end phase if no friendly fighter was taken out of action in the preceding action phase",
        "set": 4,
        "faq": "-"
    },
    "150": {
        "name" : "Leading from the Back",
        "faction": 6,
        "type": 0,
        "rule": "Score this in the third end phase if your leader is in your territory and not adjacent to an enemy",
        "set": 4,
        "faq": "-"
    },
    "151": {
        "name" : "Live to Fight Another Day",
        "faction": 6,
        "type": 0,
        "rule": "Score this in the third end phase if the only surviving friendly fighter is your leader",
        "set": 4,
        "faq": "-"
    },
    "152": {
        "name" : "Lives Are Cheap",
        "faction": 6,
        "type": 0,
        "rule": "Score this in an end phase if two or more friendly fighters were taken out of action in the preceding action phase",
        "set": 4,
        "faq": "-"
    },
    "153": {
        "name" : "Numberless Swarm",
        "faction": 6,
        "type": 0,
        "rule": "Score this in the third end phase if there are five friendly fighters on the battlefield",
        "set": 4,
        "faq": "-"
    },
    "154": {
        "name" : "Skritch is The Greatest, Yes-yes",
        "faction": 6,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 4,
        "faq": "-"
    },
    "155": {
        "name" : "Aversion to Death",
        "faction": 6,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. Push up to two friendly fighters one hex each",
        "set": 4,
        "faq": "-"
    },
    "156": {
        "name" : "Frenzied Stabbing",
        "faction": 6,
        "type": 1,
        "rule": "The first Attack action with a Range of 1 or 2 in the next activation has +1 Damage",
        "set": 4,
        "faq": "-"
    },
    "157": {
        "name" : "Heightened Caution",
        "faction": 6,
        "type": 1,
        "rule": "Roll an extra defence dice for the first friendly fighter to be targeted by an Attack action in the next activation",
        "set": 4,
        "faq": "-"
    },
    "158": {
        "name" : "Momentary Boldness",
        "faction": 6,
        "type": 1,
        "rule": "Choose a friendly fighter adjacent to two or more friendly fighters. That fighter makes a Charge action",
        "set": 4,
        "faq": "-"
    },
    "159": {
        "name" : "Musk of Fear",
        "faction": 6,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 4,
        "faq": "-"
    },
    "160": {
        "name" : "Nervous Scrabbling",
        "faction": 6,
        "type": 1,
        "rule": "Choose a friendly fighter. They switch places with any adjacent fighter",
        "set": 4,
        "faq": ""
    },
    "161": {
        "name" : "Scratching in the Shadows",
        "faction": 6,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 4,
        "faq": "-"
    },
    "162": {
        "name" : "Skaven Courage",
        "faction": 6,
        "type": 1,
        "rule": "Play this if there are at least three friendly fighters adjacent to the same enemy fighter. One of those friendly fighters can make an Attack action",
        "set": 4,
        "faq": "-"
    },
    "163": {
        "name" : "Sudden Skittering",
        "faction": 6,
        "type": 1,
        "rule": "Double the Move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again this phase",
        "set": 4,
        "faq": "-"
    },
    "164": {
        "name" : "There Are Always More",
        "faction": 6,
        "type": 1,
        "rule": "Choose one friendly fighter that is out of action (other than Skritch or Krrk). Remove all wound tokens from them and place them on any starting hex",
        "set": 4,
        "faq": "-"
    },
    "165": {
        "name" : "Black Hunger",
        "faction": 6,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 have +1 Damage, and target all adjacent fighters (friend and foe) - roll for each. Fighters do not provide support for Attack actions against friendly models (in attack or defence)",
        "set": 4,
        "faq": "-"
    },
    "166": {
        "name" : "Bodyguard for a Price",
        "faction": 6,
        "type": 2,
        "rule": "If Skritch is adjacent to this fighter, Skritch is on Guard (even if Skritch has made a Charge action this phase)",
        "set": 4,
        "faq": "-"
    },
    "167": {
        "name" : "Expendable",
        "faction": 6,
        "type": 2,
        "rule": "Reaction: During an Attack action that will cause any damage to this fighter, you can remove them from the battlefield and deal 1 damage to their attacker",
        "set": 4,
        "faq": ""
    },
    "168": {
        "name" : "Festering Blades",
        "faction": 6,
        "type": 2,
        "rule": "On a critical hit, this fighter's Attack actions with a Range of 1 or 2 have +2 Damage",
        "set": 4,
        "faq": "-"
    },
    "169": {
        "name" : "Flee!",
        "faction": 6,
        "type": 2,
        "rule": "Action: This fighter and one adjacent friendly fighter can make a Move action. Both fighters must end their move further away from all enemy fighters",
        "set": 4,
        "faq": ""
    },
    "170": {
        "name" : "Skitter-scurry",
        "faction": 6,
        "type": 2,
        "rule": "Reaction: After any action that this fighter makes, you can push this fighter one hex",
        "set": 4,
        "faq": ""
    },
    "171": {
        "name" : "Sneaky Stab-stab",
        "faction": 6,
        "type": 2,
        "rule": "You can push this fighter one hex before they take an Attack action, though not when this fighter takes a Charge action",
        "set": 4,
        "faq": ""
    },
    "172": {
        "name" : "Swarm of Rats",
        "faction": 6,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets all adjacent enemy fighters - roll for each",
        "set": 4,
        "faq": "-"
    },
    "173": {
        "name" : "Throwing Stars",
        "faction": 6,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1",
        "set": 4,
        "faq": "-"
    },
    "174": {
        "name" : "Whirling Halberd",
        "faction": 6,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 Targets all adjacent enemy fighters - roll for each",
        "set": 4,
        "faq": "-"
    },
    "175": {
        "faction": 7,
        "type": 0,
        "rule": "Score this immediately if all friendly fighters (at least three) are adjacent to a different enemy fighter",
        "set": 5,
        "faq": "-"
    },
    "176": {
        "faction": 7,
        "type": 0,
        "rule": "Score this immediately if Riptooth takes an enemy leader out of action",
        "set": 5,
        "faq": "-"
    },
    "177": {
        "faction": 7,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 5,
        "faq": "-"
    },
    "178": {
        "faction": 7,
        "type": 0,
        "rule": "Score this immediately if your warband takes two or more enemy fighters out of action in a phase",
        "set": 5,
        "faq": "-"
    },
    "179": {
        "faction": 7,
        "type": 0,
        "rule": "Score this in an end phase if at least two fighters from each warband are out of action",
        "set": 5,
        "faq": "-"
    },
    "180": {
        "faction": 7,
        "type": 0,
        "rule": "Score this immediately if three or more of your fighters made a Charge action this phase",
        "set": 5,
        "faq": "-"
    },
    "181": {
        "faction": 7,
        "type": 0,
        "rule": "Score this in an end phase if all surviving fighters (at least four) are wounded",
        "set": 5,
        "faq": "-"
    },
    "182": {
        "faction": 7,
        "type": 0,
        "rule": "Score this in an end phase if an enemy leader is the only surviving enemy fighter",
        "set": 5,
        "faq": "-"
    },
    "183": {
        "faction": 7,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy fighter out of action",
        "set": 5,
        "faq": "-"
    },
    "184": {
        "faction": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. Roll one extra attack dice for the first Attack action in the next activation. Both Hammer and Sword are successes for that Attack action",
        "set": 5,
        "faq": "-"
    },
    "185": {
        "faction": 7,
        "type": 1,
        "rule": "In the next activation, enemy fighters have -2 Move",
        "set": 5,
        "faq": "-"
    },
    "186": {
        "faction": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that takes a friendly fighter out of action. A friendly fighter adjacent to the attacker makes an Attack action against that fighter",
        "set": 5,
        "faq": "-"
    },
    "187": {
        "faction": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. The first Attack action in the next activation has +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "188": {
        "faction": 7,
        "type": 1,
        "rule": "The first friendly fighter who suffers any amount of damage in the next activation only suffers 1 damage",
        "set": 5,
        "faq": "-"
    },
    "189": {
        "faction": 7,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a fighter out of action. All friendly fighters have +1 Defence in the next activation",
        "set": 5,
        "faq": "-"
    },
    "190": {
        "faction": 7,
        "type": 1,
        "rule": "Choose a friendly fighter. The become Inspired",
        "set": 5,
        "faq": "-"
    },
    "191": {
        "faction": 7,
        "type": 1,
        "rule": "Roll one extra attack dice for the first Attack action made by a friendly fighter in the next activation",
        "set": 5,
        "faq": "-"
    },
    "192": {
        "faction": 7,
        "type": 1,
        "rule": "Choose an enemy fighter that is adjacent to a friendly fighter and push them up to two hexes",
        "set": 5,
        "faq": "-"
    },
    "193": {
        "faction": 7,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter with a Wounds characteristic of 3 or more out of action. Draw three power cards",
        "set": 5,
        "faq": "-"
    },
    "194": {
        "faction": 7,
        "type": 2,
        "rule": "Roll an extra attack dice when this fighter makes a Charge action",
        "set": 5,
        "faq": "-"
    },
    "195": {
        "faction": 7,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 3 If this Attack action succeeds, remove one wound token from this fighter",
        "set": 5,
        "faq": "-"
    },
    "196": {
        "faction": 7,
        "type": 2,
        "rule": "When this fighter makes a Charge action both Hammer and Sword are successes",
        "set": 5,
        "faq": "-"
    },
    "197": {
        "faction": 7,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that will take this fighter out of action, you can make an Attack action with them",
        "set": 5,
        "faq": "-"
    },
    "198": {
        "faction": 7,
        "type": 2,
        "rule": "When this fighter makes a Charge action they can move through other fighters, but their move must end in an empty hex",
        "set": 5,
        "faq": "-"
    },
    "199": {
        "faction": 7,
        "type": 2,
        "rule": "This fighter's Attack actions with a Range of 1 or 2 have +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "200": {
        "faction": 7,
        "type": 2,
        "rule": "This fighter's successful Attack actions with a Range of 1 can push the target one hex (instead of driving them back) in addition to inflicting damage",
        "set": 5,
        "faq": "-"
    },
    "201": {
        "faction": 7,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, gain 1 additional glory point",
        "set": 5,
        "faq": "-"
    },
    "202": {
        "faction": 7,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chooses to do so), you can instead push them one hex",
        "set": 5,
        "faq": "-"
    },
    "203": {
        "faction": 7,
        "type": 2,
        "rule": "All of this fighter's Attack actions have +1 Dice",
        "set": 5,
        "faq": "-"
    },
    "204": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 6,
        "faq": "-"
    },
    "205": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if you have at least one surviving fighter and none of your fighters suffered any damage in the preceding action phase",
        "set": 6,
        "faq": "-"
    },
    "206": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if three friendly fighters are adjacent to enemy fighters",
        "set": 6,
        "faq": "-"
    },
    "207": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if you hold three of more objectives",
        "set": 6,
        "faq": "-"
    },
    "208": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least two) are in enemy territory",
        "set": 6,
        "faq": "-"
    },
    "209": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 6,
        "faq": "-"
    },
    "210": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if you made at least three successful Boltstorm Pistol or Overcharged Boltstorm Pistol Attack actions in the preceding action phase",
        "set": 6,
        "faq": "-"
    },
    "211": {
        "faction": 8,
        "type": 0,
        "rule": "Score this immediately if your warband has taken two or more fighters out of action in this phase",
        "set": 6,
        "faq": "-"
    },
    "212": {
        "faction": 8,
        "type": 0,
        "rule": "Score this in an end phase if your surviving fighters (at least one) are outnumbered by surviving enemy fighters by at least three to one",
        "set": 6,
        "faq": "-"
    },
    "213": {
        "faction": 8,
        "type": 1,
        "rule": "Choose an enemy fighter adjacent to a friendly fighter. Push them one hex",
        "set": 6,
        "faq": "-"
    },
    "214": {
        "faction": 8,
        "type": 1,
        "rule": "Roll an extra defence dice for friendly fighters holding objectives in the next activation",
        "set": 6,
        "faq": "-"
    },
    "215": {
        "faction": 8,
        "type": 1,
        "rule": "The first Attack action in the next activation has +1 Damage",
        "set": 6,
        "faq": "-"
    },
    "216": {
        "faction": 8,
        "type": 1,
        "rule": "Double the Move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again this phase",
        "set": 6,
        "faq": "-"
    },
    "217": {
        "faction": 8,
        "type": 1,
        "rule": "The first friendly fighter to be targeted by an Attack action in the next activation has +1 Defence",
        "set": 6,
        "faq": "-"
    },
    "218": {
        "faction": 8,
        "type": 1,
        "rule": "Choose two friendly fighters and push them one hex",
        "set": 6,
        "faq": "-"
    },
    "219": {
        "faction": 8,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Boltstorm Pistol or Overcharged Boltstorm Pistol Attack action. That fighter can make another Boltstorm Pistol or Overcharged Boltstorm Pistol Attack action that targets the same fighter",
        "set": 6,
        "faq": "-"
    },
    "220": {
        "faction": 8,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action that damages a friendly fighter. That fighter can make an Attack action that must target the attacker",
        "set": 6,
        "faq": "-"
    },
    "221": {
        "faction": 8,
        "type": 1,
        "rule": "The first friendly fighter to make a Boltstorm Pistol or Overcharged Bolstorm Pistol Attack action in the next activation can be pushed one hex before they do so",
        "set": 6,
        "faq": "-"
    },
    "222": {
        "faction": 8,
        "type": 1,
        "rule": "Choose a friendly fighter and put them on Guard",
        "set": 6,
        "faq": "-"
    },
    "223": {
        "faction": 8,
        "type": 2,
        "rule": "This fighter can move through other fighters during a Move action, but must end their move in an empty hex",
        "set": 6,
        "faq": "-"
    },
    "224": {
        "faction": 8,
        "type": 2,
        "rule": "This fighter can support an adjacent friendly fighter targeted by an Attack action, even if this fighter is not adjacent to the attacker",
        "set": 6,
        "faq": "-"
    },
    "225": {
        "faction": 8,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Cleave",
        "set": 6,
        "faq": "-"
    },
    "226": {
        "faction": 8,
        "type": 2,
        "rule": "Reaction: During an Attack action that targets this fighter and has failed, this fighter cannot be driven back and can make an Attack action. It must target the attacker",
        "set": 6,
        "faq": "-"
    },
    "227": {
        "faction": 8,
        "type": 2,
        "rule": "Rolls of Single Support made for this fighter when they are targeted by an Attack action also count as successes when they are adjacent to no friendly fighters",
        "set": 6,
        "faq": "-"
    },
    "228": {
        "faction": 8,
        "type": 2,
        "rule": "Hex 3 Hammer 3 Damage 1 Cleave",
        "set": 6,
        "faq": "-"
    },
    "229": {
        "faction": 8,
        "type": 2,
        "rule": "This fighter's Attack actions gain Cleave",
        "set": 6,
        "faq": "-"
    },
    "230": {
        "faction": 8,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Targets all adjacent enemy fighters - roll for each",
        "set": 6,
        "faq": "-"
    },
    "231": {
        "faction": 8,
        "type": 2,
        "rule": "+2 Move",
        "set": 6,
        "faq": "-"
    },
    "232": {
        "faction": 8,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Cleave",
        "set": 6,
        "faq": "-"
    },
    "233": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all of your fighters are out of action",
        "set": 5,
        "faq": "-"
    },
    "234": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately when your warband takes an enemy fighter standing in enemy territory out of action",
        "set": 6,
        "faq": "-"
    },
    "235": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if there are no adjacent fighters on the battlefield",
        "set": 4,
        "faq": "-"
    },
    "236": {
        "name": "Annihilation",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all enemy fighters have been taken out of action",
        "set": 0,
        "faq": "-"
    },
    "237": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband took an enemy leader out of action in the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "238": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately when making an Attack action if both the attacker and the target have two supporting fighters",
        "set": 6,
        "faq": "-"
    },
    "239": {
        "name": "Blooded",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) have at least one wound token",
        "set": 2,
        "faq": "-"
    },
    "240": {
        "name": "Bloodless",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if no fighter suffered any damage in the preceding action phase",
        "set": 1,
        "faq": "-"
    },
    "241": {
        "name": "Brawl",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all friendly fighters (at least three) are adjacent to enemy fighters",
        "set": 2,
        "faq": "-"
    },
    "242": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband took three or more enemy fighters out of action in the preceding action phase",
        "set": 4,
        "faq": "-"
    },
    "243": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter on Guard makes a Charge action",
        "set": 6,
        "faq": "-"
    },
    "244": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if a surviving friendly fighter has three or more upgrades",
        "set": 5,
        "faq": "-"
    },
    "245": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if none of your fighters are out of action",
        "set": 6,
        "faq": "-"
    },
    "246": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if three or more friendly fighters made an Attack action against the same enemy fighter in this phase",
        "set": 6,
        "faq": "-"
    },
    "247": {
        "name": "Conquest",
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all of your surviving fighters are in your opponent's territory",
        "set": 0,
        "faq": ""
    },
    "248": {
        "name": "Contained",
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if all surviving enemy fighters are in their territory",
        "set": 2,
        "faq": ""
    },
    "249": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a Move action of six or more hexes",
        "set": 4,
        "faq": "-"
    },
    "250": {
        "name": "Crushing Force",
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a successful attack that deals at least twice as much damage as is needed to take their target out of action",
        "set": 1,
        "faq": "-"
    },
    "251": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your fighters are outnumbered by at least three to one",
        "set": 3,
        "faq": "-"
    },
    "252": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately when your warband takes an enemy fighter standing in your territory out of action",
        "set": 6,
        "faq": "-"
    },
    "253": {
        "name": "Denial",
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if there are no enemy fighters in your territory",
        "set": 0,
        "faq": "-"
    },
    "254": {
        "name": "Determined Defender",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if the same friendly fighter has held the same objective at the end of two consecutive action phases",
        "set": 1,
        "faq": "-"
    },
    "255": {
        "name": "Devide and Conquer",
        "faction": 0,
        "type": 0,
        "rule": "Score this is an end phase if each player has at least one fighter in their own territory and at least one fighter in enemy territory",
        "set": 2,
        "faq": "-"
    },
    "256": {
        "name": "Endless Slaughter",
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if five or more enemy fighters are out of action",
        "set": 2,
        "faq": "-"
    },
    "257": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if three or more upgrade cards were played in the preceding action phase",
        "set": 4,
        "faq": "-"
    },
    "258": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if there are at least three enemy fighters adjacent to the same friendly fighter",
        "set": 6,
        "faq": "-"
    },
    "259": {
        "name": "Flawless Strategy",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored two or more other objective cards in this phase",
        "set": 1,
        "faq": "-"
    },
    "260": {
        "name": "Geared for War",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if each of your surviving fighters (at least three) has at least one upgrade",
        "set": 2,
        "faq": "-"
    },
    "261": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) are Inspired",
        "set": 6,
        "faq": "-"
    },
    "262": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter's Attack action succeeds when their target has two or more supporting fighters more then the attacker",
        "set": 5,
        "faq": "-"
    },
    "263": {
        "name": "Hold Objective 1",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 1",
        "set": 0,
        "faq": "-"
    },
    "264": {
        "name": "Hold Objective 2",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 2",
        "set": 0,
        "faq": "-"
    },
    "265": {
        "name": "Hold Objective 3",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 3",
        "set": 0,
        "faq": "-"
    },
    "266": {
        "name": "Hold Objective 4",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 4",
        "set": 0,
        "faq": "-"
    },
    "267": {
        "name": "Hold Objective 5",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you are holding objective 5",
        "set": 0,
        "faq": "-"
    },
    "268": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you played no ploy cards during the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "269": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if at least one fighter was taken out of action in the preceding action phase in enemy territory, in your territory and in no one's territory",
        "set": 5,
        "faq": "-"
    },
    "270": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold all objectives (at least one) in your opponent's territory",
        "set": 3,
        "faq": "-"
    },
    "271": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if your fighters deal 7 or more damage in an action phase (damage in excess of a fighter's Wounds characteristic is included)",
        "set": 5,
        "faq": "-"
    },
    "272": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored an objective card, played a ploy card and played an upgrade card in this round",
        "set": 4,
        "faq": "-"
    },
    "273": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter is taken out of action by an Attack action made as a Reaction by your warband or a Reaction made by your warband that causes damage",
        "set": 5,
        "faq": "-"
    },
    "274": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters is the target of an enemy Attack action with a Dice characteristic of 3 or more that fails",
        "set": 4,
        "faq": "-"
    },
    "275": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your warband dealt damage to three or more enemy fighters in the preceding action phase",
        "set": 5,
        "faq": "-"
    },
    "276": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you have no power cards in your hand",
        "set": 4,
        "faq": "-"
    },
    "277": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters takes an enemy fighter out of action with an Attack action with a Damage characteristic greater than the target's Wounds characteristic",
        "set": 3,
        "faq": "-"
    },
    "278": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold three or more objectives",
        "set": 6,
        "faq": "-"
    },
    "279": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold every objective",
        "set": 4,
        "faq": "-"
    },
    "280": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if none of your fighters made a Move action in the preceding action phase",
        "set": 3,
        "faq": "-"
    },
    "281": {
        "name": "Plant A Standard",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your leader is holding an objective in enemy territory",
        "set": 1,
        "faq": "-"
    },
    "282": {
        "name": "Ploymaster",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you played three or more ploys in the preceding action phase",
        "set": 2,
        "faq": "-"
    },
    "283": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if at least three friendly fighters are adjacent to the same enemy fighter",
        "set": 5,
        "faq": "-"
    },
    "284": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes a successful Attack action that deals exactly enough damage to take their target out of action",
        "set": 3,
        "faq": "-"
    },
    "285": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if seven or more fighters are out of action",
        "set": 5,
        "faq": "-"
    },
    "286": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all remaining enemy fighters (at least three) have an upgrade",
        "set": 4,
        "faq": "-"
    },
    "287": {
        "name": "Reaper",
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter's attack takes two or more enemy fighters out of action",
        "set": 1,
        "faq": "-"
    },
    "288": {
        "name": "Scent of Victory",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving enemy fighters (at least three) have at least one wound token",
        "set": 2,
        "faq": "-"
    },
    "289": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving friendly fighters (at least two) are on edge hexes",
        "set": 6,
        "faq": "-"
    },
    "290": {
        "name": "Stymied",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if your opponent played no power cards in the preceding action phase",
        "set": 1,
        "faq": "-"
    },
    "291": {
        "name": "Superior Tactician",
        "faction": 0,
        "type": 0,
        "rule": "Score this in the third end phase if you have scored six or more other objective cards",
        "set": 2,
        "faq": "-"
    },
    "292": {
        "name": "Supremacy",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold three or more objectives",
        "set": 0,
        "faq": "-"
    },
    "293": {
        "name": "Swift Advance",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters are in enemy territory",
        "set": 1,
        "faq": "-"
    },
    "294": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 1, 2 and 3",
        "set": 3,
        "faq": "-"
    },
    "295": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 3, 4 and 5",
        "set": 4,
        "faq": "-"
    },
    "296": {
        "name": "Tactical Supremacy 1-2",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 1 and 2",
        "set": 1,
        "faq": "-"
    },
    "297": {
        "name": "Tactical Supremacy 3-4",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you hold objectives 3 and 4",
        "set": 1,
        "faq": "-"
    },
    "298": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter takes an enemy fighter out of action with an Attack action that had a Damage characteristic of 1",
        "set": 4,
        "faq": "-"
    },
    "299": {
        "name": "The Harvest Begins",
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if a friendly fighter makes an Attack action that damages three or more enemy fighters",
        "set": 1,
        "faq": "-"
    },
    "300": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in the first or second end phase if all enemy fighters have been taken out of action",
        "set": 3,
        "faq": "-"
    },
    "301": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if an enemy fighter takes damage from a friendly fighter's Attack action because they cannot be driven back",
        "set": 3,
        "faq": "-"
    },
    "302": {
        "name": "Twilight Conquerer",
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all of your surviving fighters (at least three) are neither in your territory nor enemy territory",
        "set": 2,
        "faq": "-"
    },
    "303": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if all surviving friendly fighters (at least three) are in a single group with each friendly fighter adjacent to another friendly fighter",
        "set": 3,
        "faq": "-"
    },
    "304": {
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if one of your fighters makes a successful Attack action against an enemy fighter on Guard",
        "set": 6,
        "faq": "-"
    },
    "305": {
        "name": "Victorious Duel",
        "faction": 0,
        "type": 0,
        "rule": "Score this immediately if your leader takes an enemy leader out of action",
        "set": 2,
        "faq": "-"
    },
    "306": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if you scored three or more other objective cards in this round",
        "set": 5,
        "faq": "-"
    },
    "307": {
        "faction": 0,
        "type": 0,
        "rule": "Score this in an end phase if the same number of fighters (at least one) from each warband are out of action",
        "set": 5,
        "faq": "-"
    },
    "308": {
        "name": "Anticipation",
        "faction": 0,
        "type": 1,
        "rule": "Play this card after the final activation in an action phase. Name an objective card. If an opponent scores that objective in the end phase, score a glory point",
        "set": 2,
        "faq": "-"
    },
    "309": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action with a Range of 3 or greater (before any dice are rolled). The Attacks characteristic of that Attack action is changed to Sword 1",
        "set": 4,
        "faq": "-"
    },
    "310": {
        "faction": 0,
        "type": 1,
        "rule": "Switch two objectives that are currently being held",
        "set": 3,
        "faq": "-"
    },
    "311": {
        "name": "Confusion",
        "faction": 0,
        "type": 1,
        "rule": "Choose two fighters that are adjacent to each other and switch them",
        "set": 0,
        "faq": "-"
    },
    "312": {
        "name": "Cruel Taunt",
        "faction": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll an attack dice. On a roll of Hammer or Critical Hit they are no longer Inspired, and cannot be Inspired this game",
        "set": 2,
        "faq": "-"
    },
    "313": {
        "faction": 0,
        "type": 1,
        "rule": "For the first Attack action in the next activation, Hammer characteristics become Sword characteristics and vice versa, and Dodge characteristics become Shield characteristics and vice versa",
        "set": 4,
        "faq": "-"
    },
    "314": {
        "faction": 0,
        "type": 1,
        "rule": "The first Attack action in the next activation has a Range of 1",
        "set": 3,
        "faq": "-"
    },
    "315": {
        "name": "Daylight Robbery",
        "faction": 0,
        "type": 1,
        "rule": "Roll an attack dice. If you roll a Hammer or Critical Hit take one of your opponent's unspent glory points",
        "set": 2,
        "faq": "-"
    },
    "316": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this card during an Attack action or ploy that will take a friendly fighter out of action. Choose an enemy fighter adjacent to the target. They suffer 1 damage",
        "set": 3,
        "faq": "-"
    },
    "317": {
        "faction": 0,
        "type": 1,
        "rule": "When resolving the first Attack action in the next activation, you and your opponent roll off. The winner chooses whether the Attack action fails or succeeds",
        "set": 4,
        "faq": "-"
    },
    "318": {
        "name": "Distractions",
        "faction": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and push them one hex",
        "set": 2,
        "faq": "-"
    },
    "319": {
        "name": "Dual Strike",
        "faction": 0,
        "type": 1,
        "rule": "One fighter supporting the first Attack action in the next activation is considered to be two supporting fighters",
        "set": 2,
        "faq": ""
    },
    "320": {
        "name": "Duel of Wits",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this when an opponent plays a ploy. Draw two power cards",
        "set": 2,
        "faq": "-"
    },
    "321": {
        "faction": 0,
        "type": 1,
        "rule": "Push all fighters one hex. You must push them all in the same direction. Any that cannot be pushed this way are not pushed",
        "set": 3,
        "faq": ""
    },
    "322": {
        "faction": 0,
        "type": 1,
        "rule": "The first friendly fighter to be targeted by an Attack action in the next activation has +1 Defence",
        "set": 6,
        "faq": "-"
    },
    "323": {
        "faction": 0,
        "type": 1,
        "rule": "Roll eight dice. Choose a friendly fighter and push them up to a number of hexes equal to the number of Critical Hit rolled",
        "set": 5,
        "faq": "-"
    },
    "324": {
        "name": "Forceful Denial",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this when an opponent plays a ploy. Roll a defence dice. On a roll of Shield or Critical Hit that ploy has no effect",
        "set": 1,
        "faq": ""
    },
    "325": {
        "name": "Fortify",
        "faction": 0,
        "type": 1,
        "rule": "Friendly fighters holding objectives have +1 Defence for the next activation",
        "set": 1,
        "faq": "-"
    },
    "326": {
        "faction": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll a defence dice. On a roll of Shield or Critical Hit that fighter cannot make any actions or be damaged in this phase",
        "set": 6,
        "faq": "-"
    },
    "327": {
        "faction": 0,
        "type": 1,
        "rule": "You can re-roll any attack dice for the first friendly fighter's Attack action in the next activation",
        "set": 3,
        "faq": "-"
    },
    "328": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after an adjacent enemy fighter makes an Attack action that drives a friendly fighter back. Push the attacker into the hex the friendly fighter was driven back from",
        "set": 5,
        "faq": "-"
    },
    "329": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a hex on the battlefield, then push all fighters one hex (in whichever order you choose). This push must move them away from the chosen hex. If there is no hex you could push a fighter into, do not push them",
        "set": 6,
        "faq": "-"
    },
    "330": {
        "name": "Healing Potion",
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter and roll a defence dice. On a roll of Shield or Critical Hit remove up to two wound tokens from them. Otherwise remove one wound token from them",
        "set": 0,
        "faq": "-"
    },
    "331": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter that hasn't made a Move action this phase and is on any edge hex. Place them on any other edge hex. They are considered to have made a Move action",
        "set": 5,
        "faq": "-"
    },
    "332": {
        "name": "Illusory Fighter",
        "faction": 0,
        "type": 1,
        "rule": "Choose one of your fighters on the battlefield. Place them on a starting hex in your territory",
        "set": 1,
        "faq": "-"
    },
    "333": {
        "faction": 0,
        "type": 1,
        "rule": "Discard all power cards in your hand and draw three power cards",
        "set": 6,
        "faq": "-"
    },
    "334": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter. They become Inspired",
        "set": 6,
        "faq": "-"
    },
    "335": {
        "faction": 0,
        "type": 1,
        "rule": "All fighters' Move characteristics are reduced to 1 for the next activation",
        "set": 5,
        "faq": "-"
    },
    "336": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action that would take a friendly fighter out of action. Roll a defence dice. If the result would not normally be a success for this fighter, ignore the damage from that Attack action on this fighter",
        "set": 4,
        "faq": ""
    },
    "337": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that takes a friendly fighter out of action. Choose one of their universal upgrades and give it to an adjacent friendly fighter",
        "set": 3,
        "faq": "-"
    },
    "338": {
        "faction": 0,
        "type": 1,
        "rule": "If the first Attack action in the next activation is a critical hit, double its Damage characteristic for that Attack action",
        "set": 6,
        "faq": "-"
    },
    "339": {
        "name": "Mighty Swing",
        "faction": 0,
        "type": 1,
        "rule": "Your first Attack action with a Range characteristic of 1 in the next activation targets all adjacent enemy fighters. Roll for each",
        "set": 1,
        "faq": ""
    },
    "340": {
        "faction": 0,
        "type": 1,
        "rule": "Taking it in turns with your opponent(s), starting with you and going clockwise, move each objective one hex. Objectives cannot be moved into a hex that already contains an objective",
        "set": 5,
        "faq": "-"
    },
    "341": {
        "name": "Misdirection",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this when a friendly fighter is chosen by a ploy. Choose another friendly fighter that could be chosen by that ploy. That fighter is chosen instead",
        "set": 2,
        "faq": ""
    },
    "342": {
        "faction": 0,
        "type": 1,
        "rule": "Choose an enemy fighter and roll an attack dice. If you roll a Hammer or Critical Hit make an Attack action with them as if they were a friendly fighter. Fighters do not provide support for this Attack action (in attack or defence)",
        "set": 4,
        "faq": ""
    },
    "343": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after an Attack action or ploy that damage a friendly fighter. Push them up to one hex and make an Attack action with them",
        "set": 5,
        "faq": "-"
    },
    "344": {
        "faction": 0,
        "type": 1,
        "rule": "No more power cards can be played until after the next activation",
        "set": 3,
        "faq": "-"
    },
    "345": {
        "name": "On Your Feet",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during an Attack action or ploy that would take a friendly fighter out of action, when there is a friendly fighter adjacent to them. Roll a defence dice. On a roll of Shield or Critical Hit the fighter does not suffer damage and is not taken out of action",
        "set": 2,
        "faq": "-"
    },
    "346": {
        "name": "Parry",
        "faction": 0,
        "type": 1,
        "rule": "The first time one of your fighters is targeted in the next activation, roll an extra defence dice. When counting your successes, ignore one of the defence dice",
        "set": 2,
        "faq": "-"
    },
    "347": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after an enemy fighter's Move action. Make a Move action with a friendly fighter who has not already made a Move action in this phase",
        "set": 6,
        "faq": "-"
    },
    "348": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after you upgrade a fighter in an action phase. They can make a Move or Attack action",
        "set": 3,
        "faq": "-"
    },
    "349": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during an enemy Attack action that would succeed. Roll a defence dice. On a roll of Dodge or Critical Hit the attacker suffers the damage, rather than the target, and neither fighter is driven back",
        "set": 4,
        "faq": "-"
    },
    "350": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter with at least one wound token, and an adjacent enemy fighter. The enemy fighter suffers 1 damage",
        "set": 5,
        "faq": "-"
    },
    "351": {
        "faction": 0,
        "type": 1,
        "rule": "Discard any number of objective cards and draw that number of objective cards",
        "set": 4,
        "faq": "-"
    },
    "352": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter. If they are taken out of action in the next activation, you gain a glory point",
        "set": 4,
        "faq": "-"
    },
    "353": {
        "name": "Scavenge",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an adjacent enemy fighter with an upgrade out of action. Gain an additional glory point",
        "set": 1,
        "faq": "-"
    },
    "354": {
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter that made a Charge action this phase. In the next activation, they can be activated as if they had Moved rather than Charged",
        "set": 5,
        "faq": "-"
    },
    "355": {
        "name": "Shardfall",
        "faction": 0,
        "type": 1,
        "rule": "Place a Shardfall token in an unoccupied hex. That hex is blocked until the end of the phase",
        "set": 0,
        "faq": ""
    },
    "356": {
        "faction": 0,
        "type": 1,
        "rule": "All fighters suffer 1 damage",
        "set": 6,
        "faq": "-"
    },
    "357": {
        "name": "Shattering Terrain",
        "faction": 0,
        "type": 1,
        "rule": "Any fighters that make a Move action, are pushed or are driven back in the next activation suffer 1 damage",
        "set": 1,
        "faq": ""
    },
    "358": {
        "faction": 0,
        "type": 1,
        "rule": "Choose an enemy fighter, and choose one of their upgrades. Roll an attack dice. On a roll of Hammer or Critical Hit that upgrade is discarded",
        "set": 4,
        "faq": "-"
    },
    "359": {
        "name": "Shiting Shards",
        "faction": 0,
        "type": 1,
        "rule": "Move an unheld objective one hex. You cannot move it into a hex that already contains an objective",
        "set": 2,
        "faq": ""
    },
    "360": {
        "name": "Sidestep",
        "faction": 0,
        "type": 1,
        "rule": "Choose a friendly fighter and push them one hex",
        "set": 0,
        "faq": "-"
    },
    "361": {
        "name": "Stumble",
        "faction": 0,
        "type": 1,
        "rule": "The first fighter to make a Move action in the next activation has +2 Move",
        "set": 6,
        "faq": "-"
    },
    "362": {
        "faction": 0,
        "type": 1,
        "rule": "Play an upgrade card. This doesn't cost a glory point",
        "set": 4,
        "faq": "-"
    },
    "363": {
        "name": "Sprint",
        "faction": 0,
        "type": 1,
        "rule": "Double the move characteristic of the first friendly fighter to make a Move action in the next activation. They may not make a Charge action. Once they have moved, they cannot be activated again in this phase",
        "set": 0,
        "faq": ""
    },
    "364": {
        "name": "Stumble",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action drives an enemy fighter back. They are driven back an additional hex in the same direction",
        "set": 1,
        "faq": "-"
    },
    "365": {
        "faction": 0,
        "type": 1,
        "rule": "Remove one wound token from each fighter who has at least one wound token",
        "set": 5,
        "faq": "-"
    },
    "366": {
        "faction": 0,
        "type": 1,
        "rule": "The first friendly fighter to take a Move action in the next activation can move up to an additional two hexes if they end their move on an objective",
        "set": 3,
        "faq": "-"
    },
    "367": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this card during a friendly fighter's Attack action, before rolling any dice. Push another friendly fighter one hex",
        "set": 5,
        "faq": "-"
    },
    "368": {
        "name": "Time Trap",
        "faction": 0,
        "type": 1,
        "rule": "Choose a fighter. They can take an action. Skip your next activation (you cannot play this card after your fourth activation)",
        "set": 1,
        "faq": ""
    },
    "369": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during a friendly fighter's Attack action that drives an enemy fighter back. The enemy fighter suffers 1 damage",
        "set": 3,
        "faq": "-"
    },
    "370": {
        "name": "Triumphant Roar",
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this after a friendly fighter's Attack action that takes an enemy fighter out of action. You can push each enemy fighter adjacent to the friendly fighter one hex",
        "set": 1,
        "faq": "-"
    },
    "371": {
        "name": "Trust To Luck",
        "faction": 0,
        "type": 1,
        "rule": "Discard any number of power cards and draw up to that number of power cards from your deck",
        "set": 1,
        "faq": "-"
    },
    "372": {
        "faction": 0,
        "type": 1,
        "rule": "Reaction: Play this during a friendly fighter's Attack action that has a Range of 1 and will succeed. It has +1 Damage for that Attack action",
        "set": 6,
        "faq": "-"
    },
    "373": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is not out of action at the end of the third action phase, gain 1 additional glory point",
        "set": 6,
        "faq": "-"
    },
    "374": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has a Dodge Defence characteristic or has a Shield Defence characteristic but is on Guard, roll an extra defence dice when they are the target of an Attack action",
        "set": 4,
        "faq": "-"
    },
    "375": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is the last friendly fighter on the battlefield, they have +1 Defence and all of their Attack actions have +1 Dice",
        "set": 1,
        "faq": "-"
    },
    "376": {
        "faction": 0,
        "type": 2,
        "rule": "You can re-roll one attack dice each time this fighter makes an Attack action",
        "set": 4,
        "faq": "-"
    },
    "377": {
        "faction": 0,
        "type": 2,
        "rule": "When you roll a Critical Hit for this fighter when they are targeted by an Attack action, remove one wound token from them before any damage is dealt",
        "set": 1,
        "faq": ""
    },
    "378": {
        "faction": 0,
        "type": 2,
        "rule": "On a critical hit, this fighter's Attack actions with a Range of 1 have +2 Damage",
        "set": 6,
        "faq": "-"
    },
    "379": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Sword 2 Damage 2 When making this Attack action, roll an extra attack dice for each other friendly fighter adjacent to the target",
        "set": 1,
        "faq": "-"
    },
    "380": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: During this fighter's Attack action that succeeds against an adjacent enemy fighter, instead of driving the target back you can switch the two fighters' places",
        "set": 1,
        "faq": "-"
    },
    "381": {
        "name": "Cursed Artefact",
        "faction": 0,
        "type": 2,
        "rule": "+1 Defense, -1 Wounds",
        "set": 2,
        "faq": "-"
    },
    "382": {
        "name": "Daemonic Weapon",
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 Each time this fighter makes this Attack action, they first suffer 1 damage",
        "set": 2,
        "faq": ""
    },
    "383": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1 Cleave",
        "set": 5,
        "faq": "-"
    },
    "384": {
        "faction": 0,
        "type": 2,
        "rule": "-2 Move, +2 Wounds",
        "set": 5,
        "faq": "-"
    },
    "385": {
        "name": "Disengage",
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 Reaction: After this Attack action, if it is successful, you can push this fighter one hex",
        "set": 0,
        "faq": "-"
    },
    "386": {
        "faction": 0,
        "type": 2,
        "rule": "This fighter's Defence characteristic changes to Shield",
        "set": 4,
        "faq": "-"
    },
    "387": {
        "name": "Flickering Image",
        "faction": 0,
        "type": 2,
        "rule": "Reaction: After an Attack action made by this fighter that scores a critical hit, you can push them up to two hexes",
        "set": 2,
        "faq": "-"
    },
    "388": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 When rolling defence dice, only rolls of Crit are successes for the target of this Attack action. This Attack action can never cause more than 1 damage to a target",
        "set": 5,
        "faq": "-"
    },
    "389": {
        "name": "Great Fortitude",
        "faction": 0,
        "type": 2,
        "rule": "+1 Wounds",
        "set": 0,
        "faq": "-"
    },
    "390": {
        "name": "Great Speed",
        "faction": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 0,
        "faq": "-"
    },
    "391": {
        "name": "Great Strength",
        "faction": 0,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 0,
        "faq": "-"
    },
    "392": {
        "faction": 0,
        "type": 2,
        "rule": "When this fighter makes a Charge action, increase their Move characteristic by 1 until the end of the activation",
        "set": 3,
        "faq": "-"
    },
    "393": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has no adjacent friendly fighters, rolls of Single Support are a success when they make an Attack action",
        "set": 1,
        "faq": "-"
    },
    "394": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 1 Damage 4",
        "set": 4,
        "faq": "-"
    },
    "395": {
        "faction": 0,
        "type": 2,
        "rule": "+1 Damage to all Attack actions with a Range of 1 or 2",
        "set": 6,
        "faq": "-"
    },
    "396": {
        "name": "Katophrane's Belt",
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 2,
        "faq": "-"
    },
    "397": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 6,
        "faq": "-"
    },
    "398": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 5,
        "faq": "-"
    },
    "399": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 4,
        "faq": "-"
    },
    "400": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 3,
        "faq": "-"
    },
    "401": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter has two or more Katophrane Relics, they gain the following (cumulative) abilities: 2+ Relics: Reaction: During an Attack action that targets this fighter, re-roll the defence dice 3+ Relics: Reaction: During this fighter's Attack action, re-roll the attack dice 4+ Relics: Reaction: After this fighter's action, draw two power cards 6+ Relics: Action: Gain 4 glory points",
        "set": 1,
        "faq": "- "
    },
    "402": {
        "name": "Legendary Swiftness",
        "faction": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 2,
        "faq": "-"
    },
    "403": {
        "faction": 0,
        "type": 2,
        "rule": "Rolls of Critical Hit on a defence dice are no longer a success for this fighter. Roll an extra attack dice when this fighter make an Attack action",
        "set": 3,
        "faq": "-"
    },
    "404": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chose to), you can instead push them one hex",
        "set": 3,
        "faq": "-"
    },
    "405": {
        "name": "Low Blow",
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 1 Both Swordand Hammer symbols are successes for this Attack action",
        "set": 2,
        "faq": "-"
    },
    "406": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: After a failed Attack action that targets this fighter, you can push them one hex",
        "set": 6,
        "faq": "-"
    },
    "407": {
        "faction": 0,
        "type": 2,
        "rule": "At the beginning of each action phase, remove up to one wound token from this fighter",
        "set": 6,
        "faq": "-"
    },
    "408": {
        "faction": 0,
        "type": 2,
        "rule": "If your warband's leader is out of action, this fighter is considered to be a leader. While this fighter is on the battlefield, opponents cannot score objectives for having taken your leader out of action",
        "set": 3,
        "faq": "-"
    },
    "409": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage Hex 3 Hammer 2 Damage 2 After a fighter makes this Attack action, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 3,
        "faq": "-"
    },
    "410": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 3 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 5,
        "faq": "-"
    },
    "411": {
        "name": "Shadeglass Darts",
        "faction": 0,
        "type": 2,
        "rule": "Hex 3 Sword 3 Damage 1 On a critical hit, this Attack action has +1 Damage",
        "set": 2,
        "faq": "-"
    },
    "412": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 2 Damage 3 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 4,
        "faq": "-"
    },
    "413": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 2 Hammer 2 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 6,
        "faq": "-"
    },
    "414": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 3 Damage 2 When this Attack action is successful, discard this upgrade. On a critical hit, this Attack action has +1 Damage",
        "set": 1,
        "faq": "-"
    },
    "415": {
        "faction": 0,
        "type": 2,
        "rule": "This fighter can move through other fighters during a Move action, but must end their move in an empty hex",
        "set": 4,
        "faq": "-"
    },
    "416": {
        "name": "Shardcaller",
        "faction": 0,
        "type": 2,
        "rule": "At the beginning of each action phase, you can switch an objective held by this fighter with any other objective",
        "set": 2,
        "faq": ""
    },
    "417": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: After any Attack action in which you roll a Critical Hit for this fighter (with an attack or defence dice), you can push this fighter one hex",
        "set": 3,
        "faq": "-"
    },
    "418": {
        "faction": 0,
        "type": 2,
        "rule": "Your opponent can never consider a Double Support as a success for Attack actions that target this fighter",
        "set": 1,
        "faq": "-"
    },
    "419": {
        "faction": 0,
        "type": 2,
        "rule": "This fighter can only be driven back by a critical hit",
        "set": 3,
        "faq": "-"
    },
    "420": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit they suffer no damage and are not taken out of action, and you discard this upgrade",
        "set": 1,
        "faq": "-"
    },
    "421": {
        "faction": 0,
        "type": 2,
        "rule": "+1 Move",
        "set": 4,
        "faq": "-"
    },
    "422": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action that could drive this fighter back (whether or not your opponent chose to), you can instead push them one hex",
        "set": 6,
        "faq": "-"
    },
    "423": {
        "name": "Swift Strike",
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Sword 3 Damage 1 Reaction: Before making this Attack action, push this fighter one hex",
        "set": 2,
        "faq": ""
    },
    "424": {
        "faction": 0,
        "type": 2,
        "rule": "Reaction: During an Attack action or ploy that takes this fighter out of action, roll a defence dice. If you roll a Shield or Critical Hit place them on any starting hex in your territory, ignore the damage and discard this upgrade. If you cannot, they are taken out of action",
        "set": 5,
        "faq": "-"
    },
    "425": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 3 in the third end phase, score 2 glory points",
        "set": 3,
        "faq": "-"
    },
    "426": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 4 in the third end phase, score 2 glory points",
        "set": 1,
        "faq": "-"
    },
    "427": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding an objective in the third end phase, score 1 glory point",
        "set": 5,
        "faq": "-"
    },
    "428": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 5 in the third end phase, score 2 glory points",
        "set": 4,
        "faq": "-"
    },
    "429": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 1 in the third end phase, score 2 glory points",
        "set": 6,
        "faq": "-"
    },
    "430": {
        "name": "The Shadowed Key",
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is holding objective 2 in the third end phase, score 2 glory points",
        "set": 2,
        "faq": "-"
    },
    "431": {
        "name": "Total Offence",
        "faction": 0,
        "type": 2,
        "rule": "You can roll two additional attack dice when this fighter takes an Attack action, though not when this fighter takes a Charge action. If you do so, this fighter cannot be activated again this phase",
        "set": 0,
        "faq": ""
    },
    "432": {
        "faction": 0,
        "type": 2,
        "rule": "If this fighter is on the battlefield, you can play a single ploy card at the beginning of each action phase",
        "set": 4,
        "faq": "-"
    },
    "433": {
        "faction": 0,
        "type": 2,
        "rule": "You can re-roll one defence dice for this fighter when they are the target of an Attack action",
        "set": 5,
        "faq": "-"
    },
    "434": {
        "faction": 0,
        "type": 2,
        "rule": "Hex 1 Hammer 1 Damage 2 Rolls of Hammer are considered to be rolls of Critical Hit for this Attack action",
        "set": 5,
        "faq": "-"
    },
    "435": {
        "faction": 0,
        "type": 2,
        "rule": "When this fighter takes an enemy fighter out of action, remove one wound token from this fighter",
        "set": 3,
        "faq": "-"
    },
    "436": {
        "faction": 0,
        "type": 2,
        "rule": "When this fighter makes a Charge action, their Attack actions gain Knockback 1 for that activation",
        "set": 5,
        "faq": "-"
    },
    "437": {
        "faction": 0,
        "type": 2,
        "rule": "This fighter is considered to have an additional supporting fighter while they are holding an objective",
        "set": 6,
        "faq": "-"
    }
}
