import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';


class Field extends Component {
    onRender(dom) {
        let userPokemon = this.props.userPokemon;
        let opponentPokemon = this.props.opponentPokemon;

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