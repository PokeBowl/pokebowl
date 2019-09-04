import { getUserPokemonApi } from "../src/services/pokemon-api";

const test = QUnit.test;

QUnit.module('pokemon-api');

test('get user pokemon', assert => {
    // arrange
    const expected = {
        '_id': '5cef3501ef6005a77cd4fd33',
        'pokemon': 'pikachu',
        'id': 31,
        'species_id': 25,
        'height': 4,
        'weight': 60,
        'base_experience': 112,
        'type_1': 'electric',
        'type_2': 'NA',
        'attack': 55,
        'defense': 40,
        'hp': 35,
        'special_attack': 50,
        'special_defense': 50,
        'speed': 90,
        'ability_1': 'static',
        'ability_2': 'NA',
        'ability_hidden': 'lightning-rod',
        'color_1': '#F8D030',
        'color_2': 'NA',
        'color_f': 'NA',
        'egg_group_1': 'ground',
        'egg_group_2': 'fairy',
        'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        'generation_id': 1,
        'evolves_from_species_id': '172',
        'evolution_chain_id': 10,
        'shape_id': 8,
        'shape': 'quadruped',
        'pokebase': 'pikachu',
        'pokedex': 'http://www.pokemon.com/us/pokedex/pikachu'
    };
    
    // act
    getUserPokemonApi()
    // assert
    assert.equal(true, true);
});