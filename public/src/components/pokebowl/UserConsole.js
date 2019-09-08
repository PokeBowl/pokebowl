import Component from '../Component.js';
import PokemonRender from './PokemonRender.js';


class UserConsole extends Component {

    onRender(dom) {
        let userPokemon = this.props.userPokemon;
        let textFieldContent = this.props.textFieldContent;
        let attack = this.props.attack;
        let defend = this.props.defend;
        let buttonState = this.props.buttonState;


        let props = { pokemon: userPokemon };
        const userPokemonRender = new PokemonRender(props);
        const userPokemonDiv = dom.querySelector('#mobile-user-pokemon');
        userPokemonDiv.appendChild(userPokemonRender.renderDOM());

        
        let gameplayText = dom.querySelector('#gameplay-text');
        textFieldContent.map(string => {
            const paragraph = document.createElement('P');
            paragraph.textContent = string;
            gameplayText.appendChild(paragraph);
        });

        const attackButton = dom.querySelector('#attack-button');
        const defenseButton = dom.querySelector('#defense-button');
        const lockerRoomButton = dom.querySelector('#forfeit-button');

        if(buttonState === 'attack') {
            attackButton.disabled = false;
            defenseButton.disabled = true;
            lockerRoomButton.disabled = true;
        } else if(buttonState === 'defend') {
            attackButton.disabled = true;
            defenseButton.disabled = false;
            lockerRoomButton.disabled = true;
        } else if(buttonState === 'final') {
            attackButton.disabled = true;
            defenseButton.disabled = true;
            lockerRoomButton.disabled = false;
        }

        attackButton.addEventListener('click', () => {
            attack();
        });
        
        defenseButton.addEventListener('click', () => {
            defend();
        });

        lockerRoomButton.addEventListener('click', () => {
            window.location = `./locker-room.html`;
        });
    }
    
    renderHTML() {
        return /*html*/`
            <div id="user-console">
                <div id="gameplay-text-container">
                    <span id="gameplay-text"></span>
                </div>
                <section id="console-flex-container">
                    <div id="mobile-user-pokemon"></div>
                    <div id="gameplay-action-container">
                        <button class="console-button" id="attack-button">ATTACK</button>
                        <button class="console-button" id="defense-button">DEFEND</button>
                        <button class="console-button" id="forfeit-button">RETURN TO LOCKER ROOM</button>
                    </div>
                </section>
            </div>
        `;
    }
}

export default UserConsole;