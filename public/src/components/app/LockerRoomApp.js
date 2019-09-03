import Component from '../Component.js';
import Header from './Header.js';
import UserPokemon from '../locker-room/UserPokemon.js';
import HistoricalData from '../locker-room/HistoricalData.js';
import pokemonData from '../../../data/pokemonData.js';


class LockerRoomApp extends Component {
    onRender(dom) {
        const userPokemon = pokemonData[0];
        const historicalDataContainer = dom.querySelector('#historical-data-container');
        const userPokemonContainer = dom.querySelector('#user-pokemon-container');

        const header = new Header();
        dom.prepend(header.renderDOM());

        const historicalData = new HistoricalData();
        historicalDataContainer.appendChild(historicalData.renderDOM());

        const props = { pokemon: userPokemon };
        const lockerRoomPokemon = new UserPokemon(props);
        userPokemonContainer.appendChild(lockerRoomPokemon.renderDOM());
    }
    
    renderHTML() {
        return /*html*/`
            <main>
                <div id="user-pokemon-container"></div>
                <div id="historical-data-container"></div>
                <div id="how-to-play-container">
                    <p id="instructions">
                    Game Play Instructions Go Here
                    </p>
                    <button>Enter the PokeBowl</button>
                </div>
            </main>
        `;
    }
}

export default LockerRoomApp;