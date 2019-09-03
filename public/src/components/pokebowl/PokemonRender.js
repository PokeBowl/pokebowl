import Component from '../Component.js';

class PokemonRender extends Component {
    renderHTML() {
        const pokemon = this.props.pokemon;

        return /*html*/`
            <div>
                <div id="stats">
                    <p>${pokemon.pokemon}</p>
                    <p>HP: ${pokemon.hp}</p>
                </div>
                <img src="${pokemon.url_image}" alt="${pokemon.pokemon}">
            </div>
        `;
    }
}

export default PokemonRender;