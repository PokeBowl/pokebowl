import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';
import pokemonData from '../../../data/pokemonData.js';

class Field extends Component {
    onRender(dom) {
        const userPokemon = pokemonData[0];
        const opponentPokemon = pokemonData[1];

        let props = { pokemon: userPokemon };
        const userPokemonRender = new PokemonRender(props);

        const userPokemonDiv = dom.querySelector('#user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());

        props = { pokemon: opponentPokemon };
        const opponentPokemonRender = new PokemonRender(props);

        const opponentPokemonDiv = dom.querySelector('#opponent-pokemon');
        opponentPokemonDiv.appendChild(opponentPokemonRender.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <img src="./assets/stadium.jpg" alt="The Field">

                <div id="user-pokemon"></div>
                <div id="opponent-pokemon"></div>
            </div>
        `;
    }
}

export default Field;