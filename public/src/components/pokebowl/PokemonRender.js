import Component from '../Component.js';

class PokemonRender extends Component {
    renderHTML() {
        const pokemon = this.props.pokemon;

        return /*html*/`
            <div class="pokemon-card">
                <div id="stats">
                    <p>${pokemon.pokemon}</p>
                    <p class="pokemon-hp">HP: ${pokemon.hp}</p>
                </div>
                <div class="pokemon-image-container">
                    <img src="${pokemon.url_image}" alt="${pokemon.pokemon}">
                </div>
            </div>
        `;
    }
}

export default PokemonRender;