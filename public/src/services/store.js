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


    setUserPokemonLS(pokemon) {
        return localStorage.setItem(USER_POKEMON_KEY, JSON.stringify(pokemon));
    },
    getUserPokemonLS() {
        return JSON.parse(localStorage.getItem(USER_POKEMON_KEY));
    },
    updateUserPokemonLS(pokemon) {
        this.removeUserPokemonLS();
        return this.setUserPokemonLS(pokemon);
    },
    removeUserPokemonLS() {
        localStorage.removeItem(USER_POKEMON_KEY);
    },

    
    setOpponentPokemonLS(pokemon) {
        return localStorage.setItem(OPPONENT_POKEMON_KEY, JSON.stringify(pokemon));
    },
    getOpponentPokemonLS() {
        const opponentPokemon = localStorage.getItem(OPPONENT_POKEMON_KEY);
        return JSON.parse(opponentPokemon);
    },
    updateOpponentPokemonLS(pokemon) {
        this.removeOpponentPokemonLS();
        return this.setOpponentPokemonLS(pokemon);
    },
    removeOpponentPokemonLS() {
        localStorage.removeItem(OPPONENT_POKEMON_KEY);
    },
};