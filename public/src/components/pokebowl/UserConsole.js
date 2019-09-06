import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';
import pokemonData from '../../../data/pokemonData.js';
import store from '../../services/store.js';


class UserConsole extends Component {

    onRender(dom) {
        let userPokemon = this.props.userPokemon;
        let textFieldContent = this.props.textFieldContent;
        let attack = this.props.attack;
        let defend = this.props.defend;
        let buttonState = this.props.buttonState;

        console.log(textFieldContent);

        let props = { pokemon: userPokemon };
        const userPokemonRender = new PokemonRender(props);


        const userPokemonDiv = dom.querySelector('#mobile-user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());

        let gameplayText = dom.querySelector('#gameplay-text');
        gameplayText.textContent = textFieldContent;
        console.log(gameplayText.textContent);


        const attackButton = dom.querySelector('#attack-button');
        const defenseButton = dom.querySelector('#defense-button');

        if(buttonState === 'attack') {
            attackButton.disabled = false;
            defenseButton.disabled = true;
        } else if(buttonState === 'defend') {
            attackButton.disabled = true;
            defenseButton.disabled = false;
        } else if(buttonState === 'final') {
            attackButton.disabled = true;
            defenseButton.disabled = true;
        }

        attackButton.addEventListener('click', () => {
            attack();
        });
        
        defenseButton.addEventListener('click', () => {
            defend();
        });
    }
    
    renderHTML() {
        return /*html*/`
            <div id="user-console">
                <div id="gameplay-text-container">
                    <span id="gameplay-text">Action text goes here.</span>
                </div>
                <section id="console-flex-container">
                    <div id="mobile-user-pokemon"></div>
                    <div id="gameplay-action-container">
                        <button class="console-button" id="attack-button">ATTACK</button>
                        <button class="console-button" id="defense-button">DEFEND</button>
                        <button class="console-button" id="forfeit-button">FORFEIT</button>
                    </div>
                </section>
            </div>
        `;
    }
}

export default UserConsole;