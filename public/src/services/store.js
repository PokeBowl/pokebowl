import pokemonData from '../../data/pokemonData.js';

const USER_POKEMON_KEY = 'user-pokemon';
const OPPONENT_POKEMON_KEY = 'opponent-pokemon';

const TOKEN_KEY = 'token';

export default {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token) {
        return localStorage.setItem(TOKEN_KEY, token);
    },
    hasToken() {
        return this.getToken() !== null;
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    getUserPokemonLS() {
        return localStorage.getItem(USER_POKEMON_KEY);
    },
    setUserPokemonLS() {
        return localStorage.setItem(USER_POKEMON_KEY, pokemonData[0]);
    },
    hasUserPokemonLS() {
        return this.getUserPokemonLS() !== null;
    },
    removeUserPokemonLS() {
        localStorage.removeItem(USER_POKEMON_KEY);
    },
    getOpponentPokemonLS() {
        return localStorage.getItem(OPPONENT_POKEMON_KEY);
    },
    setOpponentPokemonLS() {
        return localStorage.setItem(OPPONENT_POKEMON_KEY, pokemonData[1]);
    },
    hasOpponentPokemonLS() {
        return this.getOpponentPokemonLS() !== null;
    },
    removeOpponentPokemonLS() {
        localStorage.removeItem(OPPONENT_POKEMON_KEY);
    }
};