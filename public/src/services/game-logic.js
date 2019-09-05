// imports = api and database methods
import store from './store.js';

// hp boxes
const enemyHpText = document.querySelector('#opponent-pokemon > .pokemon-card > #stats > .pokemon-hp');
const userPokemonHptext = document.querySelector('#user-pokemon > .pokemon-card > #stats > .pokemon-hp');

// text box
const gameplayText = document.getElementById('gameplay-text');
    
// buttons
const attackButton = document.getElementById('attack-button');
const defenseButton = document.getElementById('defense-button');
const forfeitButton = document.getElementById('forfeit-button');

// get user pokemon from the database
// get opponent pokemon from the api
// store user and opponent pokemon in local storage

// initial vars
// att, def, hp, spd

// onclick events
attackButton.addEventListener('click', () => {
    
});

defenseButton.addEventListener('click', () => {
    // opponent pokemon attacks
    // update text box
    // user pokemon takes damage equal to att - def + multiplier
    // update user pokemon stats in local storage
});

forfeitButton.addEventListener('click', () => {
    // confirm user wants to perform this action
    // update history in db
    // delete local storage
    // return user to locker rm
});

// win
    // update text box
    // update history in db
    // add to user pkmn stats
    // store pkmn update in db
    // delete local storage
    // return user to locker rm

// loss
    // update text box
    // update history in db
    // delete local storage
    // return user to locker rm