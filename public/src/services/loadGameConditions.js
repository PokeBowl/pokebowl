import store from './store.js';
import { getUserPkmnStats } from './database-api.js';
import { getRivalPokemon } from './pokemon-api.js';

export function loadGameConditions() {
    const userPokemon = getUserPkmnStats();
    store.setUserPokemonLS(userPokemon);

    return getRivalPokemon(userPokemon)
        .then(options => {
            const i = Math.floor(Math.random() * 25);
            const pokemon = options.results[i];
            const opponentPokemon = {
                pokemon: pokemon.pokemon,
                attack: pokemon.attack,
                defense: pokemon.defense,
                hp: pokemon.hp,
                url_image: pokemon.url_image,
            };
            store.setOpponentPokemonLS(opponentPokemon);
        });
}

