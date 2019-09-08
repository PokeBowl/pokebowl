Pokebowl
v 1.0.0

Programmed by:
    Phil Fitch
    Antonella Guitierrez
    Ollie Hill
    Joe Klause

Pokebowl is an interactive computer game where the user fights their pokemon against an enemy pokemon in an effort to grow their pokemon to be stronger and stronger.

Pokemon is an expensive and complicated game. We are creating a simplified version for people who want to experience Pokemon who are either unable to afford the full version, or who are overwhelmed by the complexity of the full game.

Please Download Node Dependencies!

API:
https://alchemy-pokedex.herokuapp.com/api/pokedex

Sample Response from API:

results.results[0] = {
    "_id": "5cef3501ef6005a77cd4fd16",
    "pokemon": "venusaur",
    "id": 3,
    "species_id": 3,
    "height": 20,
    "weight": 1000,
    "base_experience": 236,
    "type_1": "grass",
    "type_2": "poison",
    "attack": 82,
    "defense": 83,
    "hp": 80,
    "special_attack": 100,
    "special_defense": 100,
    "speed": 80,
    "ability_1": "overgrow",
    "ability_2": "NA",
    "ability_hidden": "chlorophyll",
    "color_1": "#78C850",
    "color_2": "#A040A0",
    "color_f": "#81A763",
    "egg_group_1": "monster",
    "egg_group_2": "plant",
    "url_image": "http://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    "generation_id": 1,
    "evolves_from_species_id": "2",
    "evolution_chain_id": 1,
    "shape_id": 8,
    "shape": "quadruped",
    "pokebase": "venusaur",
    "pokedex": "http://www.pokemon.com/us/pokedex/venusaur"
}



Database Schemas:
table: users
| id  | email  | hash  | display_name  |
|---|---|---|---|
| 0  | joe@joe.com  | (some crazy stuff) | joe |



table: history
| id  | user_char  | opponent  | result  | user_id  |
|---|---|---|---|---|
| 0  | charzar  | pikachu  | 'win'  | 0  |



table user_pokemon_stats
| id  | pokemon  | attack  | defense  | hp  | url_image  | user_id  |
|---|---|---|---|---|---|---|
| 0  | charzar  | 50  | 50  | 50  | (url link to picture)  | 0  |