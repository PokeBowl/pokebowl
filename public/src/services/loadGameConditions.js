import store from './store.js';
import getUserPkmnStats from './database-api.js';
import getRivalPokemon from './pokemon-api.js';

export function loadGameConditions() {
    const userPokemon = getUserPkmnStats();
    store.setUserPokemonLS(userPokemon);

    return getRivalPokemon(userPokemon)
        .then(options => {
            const i = Math.floor(Math.random() * 25);
            let opponentPokemon = options.results[i];
            store.setOpponentPokemonLS(opponentPokemon);
        });
}

