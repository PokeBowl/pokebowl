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
                fieldProps.textFieldContent = textFieldContent;
                consoleProps.textFieldContent = textFieldContent;
                field.update(fieldProps);
                userConsole.update(consoleProps);

                if(opponentPokemon.hp > 0) {
                    textFieldContent += ` ${opponentPokemon.pokemon} is about to attack! Defend!`;
                    fieldProps.textFieldContent = textFieldContent;
                    consoleProps.textFieldContent = textFieldContent;
                    store.updateOpponentPokemonLS(opponentPokemon);
                    field.update(fieldProps);
                    userConsole.update(consoleProps);
                }
                else {
                    textFieldContent += ` Your ${userPokemon.pokemon} has defeated ${opponentPokemon.pokemon}!`;
                    fieldProps.textFieldContent = textFieldContent;
                    consoleProps.textFieldContent = textFieldContent;
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
                textFieldContent += ` ${userPokemon.pokemon}'s attack did no damage to ${opponentPokemon.pokemon}!`;
                fieldProps.textFieldContent = textFieldContent;
                consoleProps.textFieldContent = textFieldContent;
                field.update(fieldProps);
                userConsole.update(consoleProps);
            }
            
            
        }

        let textFieldContent = `Welcome to the Pokebowl!`;
        
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