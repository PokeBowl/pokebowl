import Component from '../Component.js';
import Field from '../pokebowl/Field.js';
import UserConsole from '../pokebowl/UserConsole.js';
import store from '../../services/store.js';
import { getUserPkmnStats } from '../../services/database-api.js';
import { getRivalPokemon } from '../../services/pokemon-api.js';

class PokebowlApp extends Component {
    onRender(dom) {
        const attack = {
            
        }
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
            opponentPokemon: opponentPokemon
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
                        field.update(fieldProps);
                        userConsole.update(consoleProps);
                    });

            });
        
        
        
        
    }

    renderHTML() {
        return /*html*/`
            <div></div>
        `;
    }
}

export default PokebowlApp;