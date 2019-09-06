import Component from '../Component.js';
import Field from '../pokebowl/Field.js';
import UserConsole from '../pokebowl/UserConsole.js';
import store from '../../services/store.js';
import { getUserPkmnStats, updateUserPkmnStats } from '../../services/database-api.js';
import { getRivalPokemon } from '../../services/pokemon-api.js';

class PokebowlApp extends Component {

    onRender(dom) {

        function attack() {
            const userPokemon = store.getUserPokemonLS();
            const opponentPokemon = store.getOpponentPokemonLS();

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

                textFieldContent += ` ${userPokemon.pokemon} did ${harm} points of damage to ${opponentPokemon.pokemon}!`;
                consoleProps.textFieldContent = textFieldContent;

                field.update(fieldProps);
                userConsole.update(consoleProps);

                if(opponentPokemon.hp > 0) {
                    textFieldContent += ` ${opponentPokemon.pokemon} is about to attack! Defend!`;
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'defend';
                    consoleProps.buttonState = buttonState;

                    store.updateOpponentPokemonLS(opponentPokemon);
                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                }
                else {
                    textFieldContent += ` Your ${userPokemon.pokemon} has defeated ${opponentPokemon.pokemon}!`;
                    consoleProps.textFieldContent = textFieldContent;
                    
                    buttonState = 'final';
                    consoleProps.buttonState = buttonState;

                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                    // add win to history
                    getUserPkmnStats()
                        .then(results => {
                            const userPokemon = results[0];
                            userPokemon.hp += 5;
                            userPokemon.attack += 5; 
                            userPokemon.defense += 5;
                            updateUserPkmnStats(userPokemon);
    
                        });
                }
            }
            else {
                textFieldContent += ` ${userPokemon.pokemon}'s attack did no damage to ${opponentPokemon.pokemon}! ${opponentPokemon.pokemon} is about to attack! Defend!`;
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

                textFieldContent += ` ${opponentPokemon.pokemon} did ${harm} points of damage to your ${userPokemon.pokemon}!`;
                consoleProps.textFieldContent = textFieldContent;
                field.update(fieldProps);
                userConsole.update(consoleProps);

                if(userPokemon.hp > 0) {
                    textFieldContent += ` It is your ${userPokemon.pokemon}'s turn to attack!`;
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'attack';
                    consoleProps.buttonState = buttonState;

                    store.updateUserPokemonLS(userPokemon);
                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                }
                else {
                    textFieldContent += ` ${opponentPokemon.pokemon} has defeated your ${userPokemon.pokemon}!`;
                    consoleProps.textFieldContent = textFieldContent;

                    buttonState = 'final';
                    consoleProps.buttonState = buttonState;

                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                    // add loss to history
                }
            }
            else {
                textFieldContent += ` ${opponentPokemon.pokemon}'s attack did no damage to your ${userPokemon.pokemon}! It is your ${userPokemon.pokemon}'s turn to attack!`;
                consoleProps.textFieldContent = textFieldContent;
                buttonState = 'attack';
                consoleProps.buttonState = buttonState;

                field.update(fieldProps);
                userConsole.update(consoleProps);
            }
        }

        let textFieldContent = `Welcome to the Pokebowl!` ;
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
                            
                        textFieldContent += ` Your opponent is ${opponentPokemon.pokemon}! Attack first with ${userPokemon.pokemon}!`;
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