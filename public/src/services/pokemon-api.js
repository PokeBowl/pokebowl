const URL = 'https://alchemy-pokedex.herokuapp.com/api/pokedex';

export function getUserPokemonApi() {
    const url = `${URL}?page=1&perPage=25&attack=50&defense=50&hp=50&sort=hp&direction=asc`;
    
    return fetch(url)
        
        .then(response => response.json())
        
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log('fetch err:', err);
        });
}

export function getRivalPokemon(stats) {
    const attack = stats.attack;
    const defense = stats.defense;
    const hp = stats.hp;

    const url = `${URL}?page=1&perPage=25&attack=${attack}&defense=${defense}&hp=${hp}&sort=hp&direction=asc`;

    return fetch(url)
        
        .then(response => response.json())
        
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log('fetch err:', err);
        });

}