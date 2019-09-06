import Component from '../Component.js';
import Field from '../pokebowl/Field.js';
import UserConsole from '../pokebowl/UserConsole.js';
import store from '../../services/store.js';
import { getUserPkmnStats, updateUserPkmnStats, addHistoryItem } from '../../services/database-api.js';
import { getRivalPokemon } from '../../services/pokemon-api.js';
import { attackArray, defenseArray } from '../../../data/moves.js';

class PokebowlApp extends Component {

    onRender(dom) {

        function attack() {
            const userPokemon = store.getUserPokemonLS();
            const opponentPokemon = store.getOpponentPokemonLS();

            const attackOption = attackArray[Math.floor(Math.random() * attackArray.length)];
            const defenseOption = defenseArray[Math.floor(Math.random() * defenseArray.length)];

            const attackPoints = Math.floor(Math.random() * userPokemon.attack);
            const defensePoints = Math.floor(Math.random() * opponentPokemon.defense);

            const harm = attackPoints - defensePoints;

            if(harm > 0) {
                opponentPokemon.hp -= harm;
                if(opponentPokemon.hp < 0) {
                    opponentPokemon.hp = 0;
                }
                fieldProps.opponentPokemon = opponentPokemon;
                consoleProps.opponentPokemon = opponentPokemon;

                textFieldContent.push(`${userPokemon.pokemon} attacked ${opponentPokemon.pokemon} with ${attackOption} and did ${harm} points of damage!`);
                consoleProps.textFieldContent = textFieldContent;

                field.update(fieldProps);
                userConsole.update(consoleProps);

                if(opponentPokemon.hp > 0) {
                    textFieldContent.push(`${opponentPokemon.pokemon} is about to attack! Defend!`);
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'defend';
                    consoleProps.buttonState = buttonState;

                    store.updateOpponentPokemonLS(opponentPokemon);
                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                }
                else {
                    const hpIncrease = Math.floor(Math.random() * 10) + 1; 
                    const attackIncrease = Math.floor(Math.random() * 10) + 1; 
                    const defenseIncrease = Math.floor(Math.random() * 10) + 1;
                            
                    textFieldContent.push(`Your ${userPokemon.pokemon} has defeated ${opponentPokemon.pokemon}! 
                            You have gained ${hpIncrease} HP Points, ${attackIncrease} Attack Points, and ${defenseIncrease} Defense Points!
                            Head to the locker room! You deserve it.`);
                    consoleProps.textFieldContent = textFieldContent;
                    
                    buttonState = 'final';
                    consoleProps.buttonState = buttonState;
                    
                    field.update(fieldProps);
                    userConsole.update(consoleProps);

                    addHistoryItem({
                        user_char: userPokemon.pokemon,
                        opponent: opponentPokemon.pokemon,
                        result: 'win'
                    });

                    getUserPkmnStats()
                        .then(results => {
                            const userPokemon = results[0];
        
                            userPokemon.hp += hpIncrease;
                            userPokemon.attack += attackIncrease; 
                            userPokemon.defense += defenseIncrease;
        
                            updateUserPkmnStats(userPokemon);
                        });
                }
            }
            else {
                textFieldContent.push(`${opponentPokemon.pokemon} used ${defenseOption} to soundly deflect your ${userPokemon.pokemon}'s attack! ${opponentPokemon.pokemon} is about to attack! Defend!`);
                consoleProps.textFieldContent = textFieldContent;

                buttonState = 'defend';
                consoleProps.buttonState = buttonState;

                field.update(fieldProps);
                userConsole.update(consoleProps);
            }
        }

        function defend() {
            const userPokemon = store.getUserPokemonLS();
            const opponentPokemon = store.getOpponentPokemonLS();

            const attackOption = attackArray[Math.floor(Math.random() * attackArray.length)];
            const defenseOption = defenseArray[Math.floor(Math.random() * defenseArray.length)];

            const attackPoints = Math.floor(Math.random() * opponentPokemon.attack);
            const defensePoints = Math.floor(Math.random() * userPokemon.defense);

            const harm = attackPoints - defensePoints;

            if(harm > 0) {
                userPokemon.hp -= harm;
                if(userPokemon.hp < 0) {
                    userPokemon.hp = 0;
                }
                fieldProps.userPokemon = userPokemon;
                consoleProps.userPokemon = userPokemon;

                textFieldContent.push(`${opponentPokemon.pokemon} attacked your ${userPokemon.pokemon} with ${attackOption} and did ${harm} points of damage!`);
                consoleProps.textFieldContent = textFieldContent;
                field.update(fieldProps);
                userConsole.update(consoleProps);

                if(userPokemon.hp > 0) {
                    textFieldContent.push(`It is your ${userPokemon.pokemon}'s turn to attack!`);
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'attack';
                    consoleProps.buttonState = buttonState;

                    store.updateUserPokemonLS(userPokemon);
                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                }
                else {
                    textFieldContent.push(`${opponentPokemon.pokemon} has defeated your ${userPokemon.pokemon}! Return to the locker room and rest up for the next match!`);
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'final';
                    consoleProps.buttonState = buttonState;

                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                    
                    addHistoryItem({
                        user_char: userPokemon.pokemon,
                        opponent: opponentPokemon.pokemon,
                        result: 'loss'
                    });
                }
            }
            else {
                textFieldContent.push(`Your ${userPokemon.pokemon} used ${defenseOption} to soundly deflect ${opponentPokemon.pokemon}'s attack! It is your ${userPokemon.pokemon}'s turn to attack!`);
                consoleProps.textFieldContent = textFieldContent;
                buttonState = 'attack';
                consoleProps.buttonState = buttonState;

                field.update(fieldProps);
                userConsole.update(consoleProps);
            }
        }

        let textFieldContent = [`Welcome to the Pokebowl!`];
        let buttonState = 'attack';

        let userPokemon = { 
            pokemon: '',
            hp: '',
            url_image: ''
        };
        
        let opponentPokemon = {
            pokemon: '',
            hp: '',
            url_image: ''
        };

        let fieldProps = {
            userPokemon: userPokemon,
            opponentPokemon: opponentPokemon
        };

        let consoleProps = {
            userPokemon: userPokemon,
            opponentPokemon: opponentPokemon,
            textFieldContent: textFieldContent,
            attack,
            defend,
            buttonState: buttonState
        };


        const field = new Field(fieldProps);
        dom.appendChild(field.renderDOM());

        const userConsole = new UserConsole(consoleProps);
        dom.appendChild(userConsole.renderDOM());

        getUserPkmnStats()
            .then(results => {
                userPokemon = results[0];
                store.setUserPokemonLS(userPokemon);

                fieldProps.userPokemon = userPokemon;
                consoleProps.userPokemon = userPokemon;

                getRivalPokemon(userPokemon)
                    .then(results => {
                        const num = Math.floor(Math.random() * 25);
                        opponentPokemon = results.results[num];
                        store.setOpponentPokemonLS(opponentPokemon);

                        fieldProps.opponentPokemon = opponentPokemon;
                        consoleProps.opponentPokemon = opponentPokemon;
                            
                        textFieldContent.push(`Your ${userPokemon.pokemon}'s opponent is ${opponentPokemon.pokemon}! Attack first!`);
                        consoleProps.textFieldContent = textFieldContent;

                        field.update(fieldProps);
                        userConsole.update(consoleProps);
                    });
            });
    }

    renderHTML() {
        return /*html*/`
            <div></div>
        `;
    }
}

export default PokebowlApp;