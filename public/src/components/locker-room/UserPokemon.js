import Component from '../Component.js';

class UserPokemon extends Component {
    renderHTML() {
        const pokemon = this.props.pokemon;
        return /*html*/`
            <div id="user-pokemon-item">
                <h2>${pokemon.pokemon}</h2>
                <div id="user-image-container">
                    <img src="${pokemon.url_image}" alt="${pokemon.pokemon}">
                </div>
                <div id="pokemon-stats">
                    <p>Attack Points: ${pokemon.attack}</p>
                    <p>Defense Points: ${pokemon.defense}</p>
                    <p>Health Points: ${pokemon.hp}</p>
                </div>
            </div>
        `;
    }
}

export default UserPokemon;
