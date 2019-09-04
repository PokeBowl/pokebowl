import Component from '../Component.js';
import Header from './Header.js';
import UserPokemon from '../locker-room/UserPokemon.js';
import HistoricalData from '../locker-room/HistoricalData.js';
import pokemonData from '../../../data/pokemonData.js';
import { getUserPokemon } from '../../services/pokemon-api.js';


class LockerRoomApp extends Component {
    onRender(dom) {
        const headerRoot = dom.querySelector('#header-root');
        const historicalDataContainer = dom.querySelector('#historical-data-container');
        const userPokemonContainer = dom.querySelector('#user-pokemon-container');
        const enterPokebowlButton = dom.querySelector('#enter-pokebowl');
        
        const header = new Header();
        headerRoot.prepend(header.renderDOM());
        
        const historicalData = new HistoricalData();
        historicalDataContainer.appendChild(historicalData.renderDOM());
        
        const userPokemon = pokemonData[0];
        const props = { pokemon: userPokemon };

        const lockerRoomPokemon = new UserPokemon(props);
        userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());

        enterPokebowlButton.addEventListener('click', () => {
            getUserPokemon();
        });
    }

    renderHTML() {
        return /*html*/`
        <div>
            <div id="header-root">
                <main>
                    <div id="user-pokemon-container"></div>
                    <div id="history-instructions-div">
                        <div id="historical-data-container"></div>
                        <div id="how-to-play-container">
                            <p id="instructions">
                            Game Play Instructions Go Here
                            </p>
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