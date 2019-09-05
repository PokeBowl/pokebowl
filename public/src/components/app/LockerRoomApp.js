import Component from '../Component.js';
import Header from './Header.js';
import UserPokemon from '../locker-room/UserPokemon.js';
import HistoricalData from '../locker-room/HistoricalData.js';
import userPokemonArray from '../../../data/userPokemonArray.js';
import { addUserPkmnStats, getUserPkmnStats } from '../../services/database-api.js';


class LockerRoomApp extends Component {
    onRender(dom) {
        const headerRoot = dom.querySelector('#header-root');
        const historicalDataContainer = dom.querySelector('#historical-data-container');
        const userPokemonContainer = dom.querySelector('#user-pokemon-container');
        const enterPokebowlButton = dom.querySelector('#enter-pokebowl');
        const button = dom.querySelector('#generate-user-pokemon');

        const header = new Header();
        headerRoot.prepend(header.renderDOM());
        
        const historicalData = new HistoricalData();
        historicalDataContainer.appendChild(historicalData.renderDOM());

        let lockerRoomPokemon = new UserPokemon({ });
    
        let pokemon;

        getUserPkmnStats()
            .then(results => {
                pokemon = results;
                if(pokemon.length === 0) {
                    button.classList.remove('hidden');
                } else {
                    pokemon = results[0];
                    lockerRoomPokemon = new UserPokemon({ pokemon });
                    userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());
                }
            });

        button.addEventListener('click', () => {
            const num = Math.floor(Math.random() * 25);
            pokemon = userPokemonArray[num];
            
            addUserPkmnStats(pokemon)
                .then(added => {
                    lockerRoomPokemon = new UserPokemon({ pokemon: added });
                    userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());
                });
            button.classList.add('hidden');
            
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
                    </div>
                    <div id="history-instructions-div">
                        <div id="historical-data-container"></div>
                        <div id="how-to-play-container">
                            <div class="scroll">
                                <p id="instructions">
                                Press "Enter the PokeBowl" to start a new match. <br> <br>
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