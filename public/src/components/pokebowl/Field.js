import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';


class Field extends Component {
    onRender(dom) {
        let userPokemon = this.props.userPokemon;
        let opponentPokemon = this.props.opponentPokemon;

        const userPokemonRender = new PokemonRender({ pokemon: userPokemon });

        const userPokemonDiv = dom.querySelector('#user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());

        const opponentPokemonRender = new PokemonRender({ pokemon: opponentPokemon });

        const opponentPokemonDiv = dom.querySelector('#opponent-pokemon');
        opponentPokemonDiv.appendChild(opponentPokemonRender.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div id="field">
                <div id="pokebowl-header">
                    <img src="./assets/pokebowl-header.png">
                </div>

                <div id="opp-user-pk">
                    <div id="user-pokemon"></div>
                    <div id="opponent-pokemon"></div>
                </div> 
            </div>
        `;
    }
}

export default Field;