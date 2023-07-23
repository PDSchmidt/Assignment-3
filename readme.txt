/**
 * Paul Schmidt
 * Assignment 3
 * TCSS 460 - Summer 2023
 * Node.js application
 * GITHUB LINK: https://github.com/PDSchmidt/NPCGENERATOR
 * DESCRIPTION: Provides a few api endpoints to use for generating information about NPC(non-player characters) in roleplaying games.
 */

 In order to use the Node.js backend, simply navigate a terminal to the folder containing the app.js Node application. Then enter the command 'node app.js' into the terminal.
 If successful, you should see a message in the terminal that looks like: "API VERSION 1.0.0 IS RUNNING ON PORT 3000".

 To access the api endpoints, use 'http://localhost:3000' and append with appropriate information to access the different services.

 SERVICE -------- Append
 Random NPC       /random/npc
 Random Name      /random/Name
 List of Races    /races
 Random Traits    /random/traits/:race WHERE :race is replaced with a valid character race (see below)
 Random Stats     /random/stats/:race WHERE :race is replaced with a valid character race (see below)

 VALID CHARACTER RACES:
 ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling']

 ---------------------------------------------------------------------------

 RUNNING THE FRONTEND index.html

 There are four buttons and a drop-down text selection that you can use to generate different information about your NPC.

 1.BUTTON "Generate Random (all)"
    Clicking this button will make an api request that returns a json object containing all the information needed to create an NPC. This json object is then parsed in order to display the information in the right-hand card.
2.BUTTON "Generate Name"
    Clicking this button will make an api reques that returns a new name for the NPC and displays at the top of the right-hand card.
3.BUTTON "Generate Trait"
    Clicking this button will make an api request that returns a list of traits tailored to the current character race of the NPC (as displayed in the Traits section of the right-hand card)
4.BUTTON "Generate from Race"
    Clicking this button will use the currently selected value in the drop-down menu to generate traits and statistics for the NPC.
5.DROPDOWN
    This dropdown contains the currently valid character races used by the api to generate NPC information. An api call is made when the document is ready to populate the options for this dropdown. Changing this value and clicking the "Generate from Race" button will generate new traits and statistics for the NPC based on the value of the dropdown.