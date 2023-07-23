/**
 * Paul Schmidt
 * Assignment 3
 * TCSS 460 - Summer 2023
 * Client-Side Script
 * 
 * DESCRIPTION: Uses the Node.js app.js api to provide some functionality to the web page.
 */
// Standard link to the api
const apiLink = 'http://localhost:3000/';
// References for HTML elems
var npcname, race, sex, age, height, job;
var str, dex, con, intl, wis, chrm;
var raceSelector;
// Keep track of the current race of the NPC in order to pass to the api
var theRace;
// When the doc is ready, assign HTML references, generate options for 
// the dropdown, and add functions to button clicks
// Finally, generate a random NPC to start
$(document).ready(function () {
    npcname = $('#characterName');
    race = $('#race');
    sex = $('#sex');
    age = $('#age');
    height = $('#height');
    job = $('#job');
    str = $('#strength');
    dex = $('#dexterity');
    con = $('#constitution');
    intl = $('#intelligence');
    wis = $('#wisdom');
    chrm = $('#charisma');
    raceSelector = $('#raceSelector');
    $.get(apiLink + 'races') 
        .done(function (data) {
            console.log(data);
            var options = "";
            for (i = 0; i < data.length; i++) {
                options += "<option>" + data[i] + "</option>";
            }
            raceSelector.html(options);
        });
    
    $('#ranName').on('click', async function () {
        randomName();
    })
    $('#all').on('click', function () {
        randomNPC();
    })
    $('#ranTrait').on('click', function () {
        randomTraits(theRace);
    })
    $('#ranStats').on('click', function () {
        randomStats(raceSelector.prop('value'));
    })
    randomNPC();
});
// Using the api, generate a random name
function randomName() {
    $.get(apiLink + 'random/name')
        .done(function (data) {
            console.log(data);
            npcname.html(capatalize(data.name.fname) + ' ' + capatalize(data.name.lname));
        })
        .fail(function (jqXHR) {
            alert("Error: " + jqXHR.status);
        });
}
// Using the api, generate an entire NPC
function randomNPC() {
    $.get(apiLink + 'random/npc')
        .done(function (data) {
            console.log(data);
            npcname.html(capatalize(data.name.fname) + ' ' + capatalize(data.name.lname));
            race.html(capatalize(data.race));
            theRace = data.race;
            sex.html(capatalize(data.physical_traits.sex));
            age.html(capatalize(data.physical_traits.age));
            height.html(data.physical_traits.height.feet + `'` + data.physical_traits.height.inches + `"`);
            job.html(capatalize(data.job));
            str.html(data.statblock.strength);
            dex.html(data.statblock.dexterity);
            con.html(data.statblock.constitution);
            intl.html(data.statblock.intelligence);
            wis.html(data.statblock.wisdom);
            chrm.html(data.statblock.charisma);
        })
        .fail(function (jqXHR) {
            alert("Error: " + jqXHR.status);
        });
}
// Using the current NPC race, make an api call, generate
// the traits, and finally assign the proper values
function randomTraits(theRace) {
    $.get(apiLink + 'random/traits/' + theRace.toLowerCase())
        .done(function (data) {
            console.log(data);
            sex.html(capatalize(data.physical_traits.sex));
            age.html(capatalize(data.physical_traits.age));
            height.html(data.physical_traits.height.feet + `'` + data.physical_traits.height.inches + `"`);
            job.html(capatalize(data.job));
        })
        .fail(function (jqXHR) {
            alert("Error: " + jqXHR.status);
        });
}
// Using the selected option in the dropdown, make an api call, generate
// the statblock, and finally assign the proper values
function randomStats(selected) {
    $.get(apiLink + 'random/stats/' + selected)
        .done(function (data) {
            console.log(data);
            theRace = selected;
            race.html(capatalize(selected));
            str.html(data.statblock.strength);
            dex.html(data.statblock.dexterity);
            con.html(data.statblock.constitution);
            intl.html(data.statblock.intelligence);
            wis.html(data.statblock.wisdom);
            chrm.html(data.statblock.charisma);
            randomTraits(selected);
        })
        .fail(function (jqXHR) {
            alert("Error: " + jqXHR.status);
        });
}
// Used to capatalize the first letter in a string
function capatalize(sentance) {
    sentance = sentance.charAt(0).toUpperCase() + sentance.slice(1);
    return sentance;
}