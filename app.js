/**
 * Paul Schmidt
 * Assignment 3
 * TCSS 460 - Summer 2023
 * Node.js application
 * 
 * DESCRIPTION: Provides a few api endpoints to use for generating information about NPC(non-player characters) in roleplaying games.
 */

var express = require("express");
var app = express();

//For use in various functions
const races = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling'];

// enable a port to listen to incoming HTTP requests
app.listen(3000, function () {
    console.log("API VERSION 1.0.0 IS RUNNING ON PORT 3000");
});
// Needed for some CORS issues
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
// Generates a complete random NPC in json format
app.get('/random/npc', function (req, res) {
    res.status(200);
    res.json(randomNPC());
    console.log("a request has been processed for a random NPC");
});
// Generates a random name in json format
app.get('/random/name', function (req, res) {
    res.status(200);
    res.json({'name' : randomName()});
    console.log("a request has been processed for a random Name");
});
// Generates some random traits based on a character race paramater
app.get('/random/traits/:race', function (req, res) {
    res.status(200);
    res.json(
        {
            'job' : randomJob(),
            'physical_traits' : randomTraits(req.params.race)
        });
    console.log("a request has been processed for random traits based on race: " + req.params.race);
});
// Generates some random statistics for an NPC based on a character race paramater
app.get('/random/stats/:race', function (req, res) {
    res.status(200);
    res.json(
        {
            'statblock' : statBlock(req.params.race)
        }
    );
    console.log("A request has been processed for random stats based on race: " + req.params.race);
})
// Provides a list of available races for use with the api
app.get('/races', function (req, res) {
    res.status(200);
    res.send(races);
    console.log("A request has been prcoessed to generate a list of available races");
})
// Generates a name, race, traits, and stats for an NPC
function randomNPC() {
    var npcJSON = {
        'race' : randomRace(),
        'name' : randomName(),
        'job' : randomJob(),
    };
    npcJSON.physical_traits = randomTraits(npcJSON.race);
    npcJSON.statblock = statBlock(npcJSON.race);
    return npcJSON;
};
// Generates a random race for an NPC
function randomRace() {
    return races[Math.floor(Math.random() * (races.length))];
}
// Generates a random job for an NPC
function randomJob() {
    const jobs = ['adventurer', 'cartographer', 'town guard', 'unemployed', 'bartender', 'soldier', 'lumberjack', 'mason', 'shopkeep', 'jester', 'jeweler', 'armorer', 'leatherworker', 'farmer', 'tailor', 'poet', 'musician', 'historian', 'philosopher', 'scholar', 'apothecary', 'healer', 'herbalist', 'traveling merchant', 'mercenary', 'scout', 'cook', 'laborer', 'messenger', 'servant', 'bounty hunter', 'explorer', 'fortune teller', 'theif'];
    return jobs[Math.floor(Math.random()*jobs.length)];
}
// Uses some syllables and some random numbers to generate a first and last name
function randomName() {
    const syllables = ['dun', 'kie', 'car', 'son', 'mu', 'rai', 'ker', 'mut', 'coi', 'ru', 'ai', 'ri', 'tris', 'tain', 'don', 'nen', 'phe', 'lam', 'n', 'jal', 'ky', 'la', 'an', 'dra', 'sta', 'cas', 'san', 'dry', 'mor', 'ganne', 'do', 'lang', 'bri', 'ga', 'da', 'caz', 'zi', 'a', 'lie', 'bri', 'gi', 'da', 'kay', 'li', 'se', 'us', 'pi', 'er', 're', 'cos', 'mo', 'i', 'san', 'dro', 'dei', 'on', 'gi', 'or', 'gi', 'o', 'i', 'sa', 'dore', 'am', 'bro', 'gi', 'o', 'pe', 'dro', 'kay'];
    var fname_num_syl = Math.floor(Math.random()*2 + 2);
    var lname_num_syl = Math.floor(Math.random()*3 + 2);
    var fname = "";
    var lname = "";
    for (var i = 0; i < fname_num_syl; i++) {
        fname += syllables[Math.floor(Math.random()*syllables.length)];
    }
    for (var i = 0; i < lname_num_syl; i++) {
        lname += syllables[Math.floor(Math.random()*syllables.length)];
    }
    return {"fname" : fname, "lname" : lname};
}
// Given a race, generates some traits
function randomTraits(race) {
    const sex = ['male', 'female', 'non-binary'];
    const age = ['young adult', 'middle-aged', 'older', 'very old', 'wizened'];
    var height;
    switch(race) {
        case 'dragonborn':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 6),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'dwarf':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 4),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'elf':
            height = {
                'feet' : '' + Math.floor(Math.random()*3 + 4),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'gnome':
            height = {
                'feet' : '' + 3,
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'half-elf':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 5),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'half-orc':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 5),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'halfling':
            height = {
                'feet' : '' + Math.floor(Math.random() + 3),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'human':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 5),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
        case 'tiefling':
            height = {
                'feet' : '' + Math.floor(Math.random()*2 + 5),
                'inches' : '' + Math.floor(Math.random()*12)
            };
            break;
    }
    return {
        "sex" : sex[Math.floor(Math.random()*sex.length)],
        "age" : age[Math.floor(Math.random()*age.length)],
        "height" : height
    };
}
// Given a race, generates a statblock
function statBlock(race) {
    var block =  {
        'strength' : rollStat(),
        'dexterity' : rollStat(),
        'constitution' : rollStat(),
        'intelligence' : rollStat(),
        'wisdom' : rollStat(),
        'charisma' : rollStat()
    };
    switch(race) {
        case 'dragonborn':
            block.strength += 2;
            block.charisma += 1;
            break;
        case 'dwarf':
            block.constitution += 2;
            break;
        case 'elf':
            block.dexterity += 2;
            break;
        case 'gnome':
            block.intelligence += 2;
            break;
        case 'half-elf':
            block.charisma += 2;
            block.dexterity += 1;
            block.wisdom += 1;
            break;
        case 'half-orc':
            block.strength += 2;
            block.constitution += 1;
            break;
        case 'halfling':
            block.dexterity += 2;
            break;
        case 'human':
            block.strength++;
            block.dexterity++;
            block.constitution++;
            block.wisdom++;
            block.intelligence++;
            block.charisma++;
            break;
        case 'tiefling':
            block.charisma += 2;
            block.intelligence += 1;
            break;
    };
    return block;
}
// Roll a (num)-sided dice
function rollDice(num) {
    return Math.floor(Math.random()*num + 1);
}
// Generats a stat by rolling 4d6 and dropping the lowest number
function rollStat() {
    var arr = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
    arr.sort();
    return arr[1] + arr[2] + arr[3];
}
