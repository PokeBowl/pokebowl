import Component from '../Component.js';
import Header from './Header.js';
import UserPokemon from '../locker-room/UserPokemon.js';
import HistoricalData from '../locker-room/HistoricalData.js';
import userPokemonArray from '../../../data/userPokemonArray.js';
import { addUserPkmnStats, getUserPkmnStats, removeUserPkmnStats, getHistoryItems, deleteUserHistory } from '../../services/database-api.js';


class LockerRoomApp extends Component {
    onRender(dom) {
        const headerRoot = dom.querySelector('#header-root');
        const historicalDataContainer = dom.querySelector('#historical-data-container');
        const userPokemonContainer = dom.querySelector('#user-pokemon-container');
        const enterPokebowlButton = dom.querySelector('#enter-pokebowl');
        const generateButton = dom.querySelector('#generate-user-pokemon');
        const getNewPokemonButton = dom.querySelector('#get-new-pokemon');

        let historicalData = [`Your Battle History!`];


        const header = new Header();
        headerRoot.prepend(header.renderDOM());
        
        const historicalDataDom = new HistoricalData({ historicalData });
        historicalDataContainer.appendChild(historicalDataDom.renderDOM());

        getHistoryItems()
            .then(results => {
                results.map(obj => {
                    if(obj.result === 'win') {
                        historicalData.push(`Your ${obj.user_char} defeated ${obj.opponent}!`);
                    } else if(obj.result === 'loss') {
                        historicalData.push(`Your ${obj.user_char} was defeated by ${obj.opponent}!`);
                    }
                });
                historicalDataDom.update({ historicalData });
            });


        let lockerRoomPokemon = new UserPokemon({ });
    
        let pokemon;

        getUserPkmnStats()
            .then(results => {
                pokemon = results;
                if(pokemon.length === 0) {
                    generateButton.classList.remove('hidden');
                } else {
                    pokemon = results[0];
                    lockerRoomPokemon = new UserPokemon({ pokemon });
                    userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());
                    getNewPokemonButton.classList.remove('hidden');
                }
            });

        generateButton.addEventListener('click', () => {
            const num = Math.floor(Math.random() * 25);
            pokemon = userPokemonArray[num];
            
            addUserPkmnStats(pokemon)
                .then(added => {
                    lockerRoomPokemon = new UserPokemon({ pokemon: added });
                    userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());
                });
            generateButton.classList.add('hidden');
            getNewPokemonButton.classList.remove('hidden');
        });
    
        getNewPokemonButton.addEventListener('click', () => {
            if(window.confirm('Are you sure you want to get a new pokemon? Doing so will reset your stats and history.')) { 
                getUserPkmnStats()
                    .then(results => {  
                        pokemon = results[0];
                        removeUserPkmnStats(pokemon.id)
                        // eslint-disable-next-line no-unused-vars
                            .then(result => {
                                getNewPokemonButton.classList.add('hidden');
                                generateButton.classList.remove('hidden');
                                const childrenArray = userPokemonContainer.childNodes;
                                const pokemonDomItem = childrenArray[5];
                                userPokemonContainer.removeChild(pokemonDomItem);
                            });
                    
                    });
                    
                deleteUserHistory()
                                // eslint-disable-next-line no-unused-vars
                    .then(result => {
                        historicalData = [`Your Battle History!`];
                        historicalDataDom.update({ historicalData });
                    });
            }
        });

        enterPokebowlButton.addEventListener('click', () => {
            window.location = `./pokebowl.html`;
        });

        
    }

    renderHTML() {
        return /*html*/`
        <div>
            <div id="header-root">
                <main>
                    <div id="user-pokemon-container">
                        <button class="hidden" id="generate-user-pokemon">Get Your Pokemon!</button>
                        <button class="hidden" id="get-new-pokemon">Get A New Pokemon</button>
                    </div>
                    <div id="history-instructions-div">
                        <div id="historical-data-container"></div>
                        <div id="how-to-play-container">
                            <div class="scroll">
                                <p id="instructions">
                                Press "Enter the PokeBowl" to start a new match. <br><br>
                                To win, reduce your opponent's HP to 0.  <br> <br>
                                Your pokemon's stats will increase when you win! <br> <br>
                                However, you lose if your pokemon's HP falls to 0. <br> <br>
                                Attack and defend against the opponent pokemon to ensure victory! <br> <br>
                                Are you ready to enter the PokeBowl?
                                </p>
                            </div>
                            <button id="enter-pokebowl">Enter the PokeBowl</button>
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
        `;
    }
}

export default LockerRoomApp;