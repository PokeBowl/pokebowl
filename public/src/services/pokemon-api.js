const URL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';

export function getUserPokemon() {
    const url = `${URL}?page=1&perPage=25&attack=50&defense=50&hp=50&sort=hp&direction=asc`;

    return fetch(url)
        .then(response => response.json())
        .then(console.log())

        .catch(err => {
            // eslint-disable-next-line no-console
            console.log('fetch err:', err);
        });
}