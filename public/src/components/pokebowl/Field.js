import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';
import store from '../../services/store.js';
import { getUserPkmnStats } from '../../services/database-api.js';
import { getRivalPokemon } from '../../services/pokemon-api.js';

class Field extends Component {
    onRender(dom) {
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

        let props = { pokemon: userPokemon };
        const userPokemonRender = new PokemonRender(props);

        const userPokemonDiv = dom.querySelector('#user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());

        props = { pokemon: opponentPokemon };
        const opponentPokemonRender = new PokemonRender(props);

        const opponentPokemonDiv = dom.querySelector('#opponent-pokemon');
        opponentPokemonDiv.appendChild(opponentPokemonRender.renderDOM());

        getUserPkmnStats()
            .then(results => {
                userPokemon = results[0];
                userPokemonRender.update({ pokemon: userPokemon });

                getRivalPokemon(userPokemon)
                    .then(results => {
                        const num = Math.floor(Math.random() * 25);
                        opponentPokemon = results.results[num];
                        console.log(opponentPokemon);
                        store.setOpponentPokemonLS(opponentPokemon);
                        opponentPokemonRender.update({ pokemon: opponentPokemon });
                        
                    });
            });
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