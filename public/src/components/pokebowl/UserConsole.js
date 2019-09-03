import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';
import pokemonData from '../../../data/pokemonData.js';

class UserConsole extends Component {

    onRender(dom) {
        const userPokemon = pokemonData[0];

        let props = { pokemon: userPokemon };
        const userPokemonRender = new PokemonRender(props);

        const userPokemonDiv = dom.querySelector('#mobile-user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());
    }
    
    renderHTML() {
        return /*html*/`
            <div>
                <div class="hidden" id="mobile-user-pokemon"></div>
                <div id="gameplay-text-container">
                    <span id="gameplay-text">Action text goes here.</span>
                </div>
                <div id="gameplay-action-container">
                    <button id="attack-button">ATTACK</button>
                    <button id="defense-button">DEFEND</button>
                    <button id="forfeit-button">FORFEIT</button>
                </div>
            </div>
        `;
    }
}

export default UserConsole;