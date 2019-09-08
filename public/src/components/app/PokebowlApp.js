import Component from '../Component.js';
import Field from '../pokebowl/Field.js';
import UserConsole from '../pokebowl/UserConsole.js';
import store from '../../services/store.js';
import { getUserPkmnStats, updateUserPkmnStats, addHistoryItem } from '../../services/database-api.js';
import { getRivalPokemon } from '../../services/pokemon-api.js';
import { attackArray, defenseArray, finishingMovesArray, defenseAdvAdjArray, attackAdvAdjArray } from '../../../data/moves.js';

class PokebowlApp extends Component {

    onRender(dom) {

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
    
                const attackAdvAdjOption = attackAdvAdjArray[Math.floor(Math.random() * attackAdvAdjArray.length)];
                const attackOption = attackArray[Math.floor(Math.random() * attackArray.length)];
                    
                textFieldContent = [];
                textFieldContent.push(`${userPokemon.pokemon} ${attackAdvAdjOption} ${opponentPokemon.pokemon} with ${attackOption} and did ${harm} points of damage!`);
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
                    const hpIncrease = Math.floor(Math.random() * 9) + 2; 
                    const attackIncrease = Math.floor(Math.random() * 9) + 2; 
                    const defenseIncrease = Math.floor(Math.random() * 9) + 2;
                        
                    const finishingMovesOption = finishingMovesArray[Math.floor(Math.random() * finishingMovesArray.length)];
    
                    textFieldContent.push(`Your ${userPokemon.pokemon} has ${finishingMovesOption} ${opponentPokemon.pokemon}!`); 
                    textFieldContent.push(`You have gained ${hpIncrease} HP Points, ${attackIncrease} Attack Points, and ${defenseIncrease} Defense Points!`);
                    textFieldContent.push(`Head to the locker room and bask in your victory! You deserve it.`);
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
                const defenseOption = defenseArray[Math.floor(Math.random() * defenseArray.length)];
                const defenseAdvAdjOption = defenseAdvAdjArray[Math.floor(Math.random() * defenseAdvAdjArray.length)];
    
                textFieldContent = [];
                textFieldContent.push(`${opponentPokemon.pokemon} used ${defenseOption} to ${defenseAdvAdjOption} your ${userPokemon.pokemon}'s attack!`); 
                textFieldContent.push(`${opponentPokemon.pokemon} is about to attack! Defend!`);
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
    
                const attackOption = attackArray[Math.floor(Math.random() * attackArray.length)];
                const attackAdvAdjOption = attackAdvAdjArray[Math.floor(Math.random() * attackAdvAdjArray.length)];
    
                textFieldContent = [];
                textFieldContent.push(`${opponentPokemon.pokemon} ${attackAdvAdjOption} your ${userPokemon.pokemon} with ${attackOption} and did ${harm} points of damage!`);
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
                    const finishingMovesOption = finishingMovesArray[Math.floor(Math.random() * finishingMovesArray.length)];
    
                    textFieldContent.push(`${opponentPokemon.pokemon} has ${finishingMovesOption} your ${userPokemon.pokemon}!`);
                    textFieldContent.push(`Return to the locker room and hang your head in shame!`);
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
                const defenseOption = defenseArray[Math.floor(Math.random() * defenseArray.length)];
                const defenseAdvAdjOption = defenseAdvAdjArray[Math.floor(Math.random() * defenseAdvAdjArray.length)];
    
                textFieldContent = [];
                textFieldContent.push(`Your ${userPokemon.pokemon} used ${defenseOption} to ${defenseAdvAdjOption} ${opponentPokemon.pokemon}'s attack and took no damage!`);
                textFieldContent.push(`It is your ${userPokemon.pokemon}'s turn to attack!`);
                consoleProps.textFieldContent = textFieldContent;
                buttonState = 'attack';
                consoleProps.buttonState = buttonState;
    
                field.update(fieldProps);
                userConsole.update(consoleProps);
            }
        }
    }

    renderHTML() {
        return /*html*/`
            <div></div>
        `;
    }
}

export default PokebowlApp;