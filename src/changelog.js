const changelog = {
    "0.34.0": {
        "New FAR Update": "Keep Them Guessing and Aggresive Defence are now forsaken. Scrum, Temporary Victory, Transfixing Stare, Tome of Vitality and Rebound are restricted for Championship format.",
    },
    "0.33.0": {
        "Rippas And Gift Pack": "Quick and dirty fix for Rippas and Gift Pack",
    },
    "0.32.0": {
        "BAR 5": "Quick and dirty fix for new Championship format",
    },
    "0.31.3": {
        "The Grymwatch": "All Hail The King! Grymwatch is here!.. Now with card images (I hope). Thanks to Pietro Nucci from Underworld-Deckers for the images.",
        "Scroll bug fix": "Fixed bug on iOS when scrolling wasn't smooth or even impossible at times."
    },
    "0.30.0": {
        "Play Formats": "Organized play switch has been changed to play type switch. Deck's thumbnails show information which formats of play this deck is eligible for.",
        "Known bugs": "PDF export needs to be updated.",
    },
    "0.29.3": {
        "Bug fixes": "Either some bugs has been fixed or I have made things even worse."
    },
    "0.29.0": {
        "Beastgrave": "Added all the cards and factions from the Beastgrave Core Set",
        "Rotated Out Cards": "Added new icon depicting rotated out cards, which should be visible on all deck headers.",
        "Organized Play": "Add information to the deck headers whether this deck is valid for the Organized Play.",
        "Filter Rotate Out cards": "Switch Organized Play on the Deck Builder's Filters will remove sets and all the universals from the Season 1",
    },
    "0.28.0": {
        "Improved PDF export": "Decks exported as PDF should have now stamp whether they are valid or not valid for organized play. Also there is an icon next to restricted cards.",
        "Bug fixes": "The bug when decks exported to Vassal didn't have Delete trait should be fixed."
    },
    "0.27.0": {
        "Cards Ranks": "Now cards have faction specific ranking and general ranking for universal cards. In the deck builder you should see then ordered by faction specific rank first and then by their universal rank. The rank is from 0 to 10 reflected with stars."
    },
    "0.26.0" : {
        "Dreadfane": "Added Dreadfane expansion with Ironsoul's Condemners and Lady Harrow's Mournflight warbands",
    },
    "0.25.0" : {
        "Export to other builders": "It should be possible to export your decks to my fellas at https://www.underworldsdb.com and https://www.underworlds-deckers.com. It should also be possible to open from their builders here."
    },
    "0.24.1" : {
        "Updated BAR" : "'Longstrider' and 'Tome of Offerings' has been added to the BAR list.",
        "Power's Unbound": "Thanks to John (https://canyourollacrit.com) and Aman (https://www.hexesandwarbands.com/) expansion has been added. Images will be added when they are officially released."
    },
    "0.24.0" : {
        "Decks Page": "Decks page has been redesigned to be faster, pagination has been replaced with virtualization.",
        "Anonimous Deck Creation": "User should be able to not only create, but also update or delete decks created anonymously. When user logging in, all anonymously created decks should be merged with his own decks."
    },
    "0.23.0" : {
        "Card Search": "Now its possible to quickly search for any card right from the home page.",
        "Quick Filter By Type": "This addition should be useful for mobile users like me, you can now filter cards by type by clicking on type on the cards type of the deck builder.",
        "End Routes": "I have noticed that sometimes you want to just get back from the page you are now, especially when you use app pinned to home screen of your iPhone. Now the menu 'sandwich' button will be replaced with arrow back when you are on certain pages."
    },
    "0.22.1" : {
        "Card Scans": "109 cards from Thundrik’s Profiteers and Ylthari’s Guardians expansions have received official images"
    },
    "0.22.0" : {
        "New cards": "Added Thundrik’s Profiteers and Ylthari’s Guardians expansions. Cards images will be added after their official release at warhammerunderworlds.com",
        "Rules fallback": "Since cards' images usually released few weeks after info about expansions, a rules fallabck feature has been added. If by any reason you don't see card image, you still should be able to see card's rule.",
        "Faction specific cards first" : "You will see faction's specific cards first in the Deck Builder.",
        "Bug Fixes": "Fixed few minor bugs and issues reported by users.",
        "NOTE!" : "We've made few internal changes which should improve quality of the app, but because of that you might expirience other issues. Please, do not hesitate to report them."
    },
    "0.21.0" : {
        "Fighters Info": "Now it should be possible to see fighters cards when you are building your next deck",
        "Copy decks": "It should be possible to create a copy of a deck. After save it will receive its unique id. Note: Because it allows you to create exact copies of other decks, please, use reasonably :)"
    },
    "0.20.0" : {
        "Password Reset": "It should be possible to reset forgotten password from now on.",
        "Cards View": "On the desktop you can now swtich between names view and card's images view.",
        "UPDATED BAR list": "Latest BAR list restrictions has been applied",
    },
    "0.19.0" : {
        "New DB": "App has been moved to use another database, which should give better overall experience. No data should have been lost during migration, but if you experience something, please contact me asap.",
        "Cards sorted by usage rating": "Cards in the deck builder are now pre-sorted based on their popularity in tournament decks.",
        "Updated Home page": "Home page updated with quick links to see faction specific decks or create faction specific deck.",
        "Delete Decks": "Authorized users should be able to delete their decks.",
        "Export to Text file": "You can export your decks to txt files to share on social networks.",
        "Export To PNG (beta)": "First implementation of exporting the deck as png image, to make sharing your decks easier.",
        "Draft decks": "Logged in users should be able to save their decks as drafts. When the deck is in Draft state it should be visible on MyDecks page but not on Decks page.",
        "Bug fixes" : "Fixed bug when locally cached deck didn't updated after changes were made up until it was requested from the server."
    },
    "0.18.0" : {
        "Statistics": "Statistics page has been improved with duplicates merged and minor re-styling"
    },
    "0.17.0" : {
        "Validation": "Deck builder has validation for Objectives, Gambits and Upgrades, marking those sections red when then have issue and green when they are fine. Also provides explanations for deck building errors.",
        "New Icons": "New icons for mobile version of the deck builder, to clearly mark switch between cards library and your deck.",
        "Filtered Statistics": "Statistics page is based now only on winning decks since the introduction of Banned and Restricted cards list.",
        "Bug fix": "Fixed bug which caused search text to be preserved between the pages, so after using it during deck build it was still applied to the deck during edit.",
    },
    "0.16.0" : {
        "New Decks View": "New implementation of the decks browser. Currently in beta."
    }, 
    "0.15.1" : {
        "Bug fixes": "Fixed few bugs which has been noticed.",
    },
    "0.15.0" : {
        "Banned and Restricted cards": "You will see banned cards in red color now and restricted once in yellow.",
        "Shardfall" : "Mistakes I made should hopefully be less impactful now. If there is an issue with the page you will see a Shardfall token page. But application bar should be available meaning that you should be able to use those things which could still be stable." 
    },
    "0.14.0" : {
        "Export to PDF": "It should be possible now to save decks as pdf files."
    },
    "0.13.0" : {
        "Sign Up": "User can choose to sign up on the website and later login with email and password.",
        "Card Library as Images": "It is possible to choose how you want to browse card library - as simple names or as images"
    },
    "0.12.0" : {
        "Card Library (alpha)" : "Alpha version of card library has been added."
    },
    "0.11.0" : {
        "User Profile Page": "You should be able to change your name which will be assosiated with the deck of your authorship.",
        "Pagination for Decks": "Decks page was very slow, so the pagination has been added to improve performance."
    }, 
    "0.10.0" : {
        "Deck's editing" : "You should be able to edit deck's you've made, those which you can find on MyDecks page.",
        "Feedback page" : "You should be able to get in touch with author of this website via email",
        "Bug fixes" : "Small amount of known bugs were fixed."
    },
    "0.9.0" : {
        "New Factions, new sets": "Added Eyes of the Nine, Zarbag's Gitz, Garrek's Reavers, Stealhearth's Champions, Echoes of Glory expanstions.",
        "Application Bar": "Now sticks at top, always visible"
    },
    "0.8.1" : {
        "Hotfix": "Broken save deck functionality should be working now."
    },
    "0.8.0" : {
        "Statistics": "A new page for the game statistics visualization has been added."
    },
    "0.7.1" : {
        "Hotfix": "Hot fixed crash on reading **MyDecks**."
    },
    "0.7.0" : {
        "Filter Decks by Faction": "It's possible now to filter decks by chosing a faction. Finding decks should become much easier."
    },
    "0.6.1" : {
        "Hotfix": "Hot fixed saving deck logic for authorized users."
    },
    "0.6.0" : {
        "Fixed Deck Faction Images" : "Fixed images of the deck's faction not shown after the latest db changes.",
        "Deck Author": "It should be possible to see deck's author in the decks list.",
        "Description instead of Source": "When you create a deck you now have a field to provide some description for the deck. Old **Source** field has been removed because its usage was misleading."
    },
    "0.5.0" : {
        "User Profile foundation": "Minor changes to how users data store in the database, which is foundation for a future **profile page**.",
        "Minor fixes": "Some minor fixes for the **Deck Builder** page."
    },
    "0.4.0" : {
        "Redesign Faction Selector": "Faction selector in the Deck builder has been redesigned a bit to improve readability. Best viewed on mobile."
    },
    "0.3.0" : {
        "Social Login in PWA": "The issue with using social login when you run app from the homescreen should be solved now."
    },
    "0.2.0" : {
        "Nightvault Core Set": "Nightvault has been opened at YAWUdb:/n- Added **Stormsire's Cursebreakers** faction;/n - Added **Throns of the Briar Queen** faction;/n- Added **Nightvault Core Set** to the expansion toggle.",
        "Better visualization for Objectives scoring": "All **Objectives** from now on have an icon assosiated with them specifying how you score that objective:/n - *Flash* - Score it immediately;/n - *Empty Hour Glass* - Score it in the first or second end phase;/n- *Clock* - Score it in the end phase;/n- *Full Hour Glass* - Score it in the third end phase."
    },
    "0.1.0" : {
        "Caching": "More caching has been implemented for the *Deck Builder* page:/n- Selected **Faction** and **Sets** will stay selected until you change them;/n- Selected **cards** will stay selected until you save the deck or unselect them or click *RESET ALL* button;/n- Deck's **Name** and **Source** will be preserved until you change them or save the deck.",
        "PWA": "The app running from the homescreen will be set to the *last visited route* when re-started from homescreen or by comming from background (when you for example switched between the app and some other screen)."
    }
}

export default changelog;