const URL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';

export function getRivalPokemon(stats) {
    const hp = stats.hp;

    const url = `${URL}?page=1&perPage=25&hp=${hp}&sort=hp&direction=asc`;

    return fetch(url)

        .then(response => response.json())

        .catch(err => {
            // eslint-disable-next-line no-console
            console.log('fetch err:', err);
            throw err;
        });
}