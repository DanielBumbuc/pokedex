const BASE_URL = 'https://pokeapi.co/api/v2/';

async function loadPokemon(path) {
    let response = await fetch(BASE_URL + path);        
    return responseToJson = await response.json();
}

async function loadPokemonInfo(path) {
    let response = await fetch(path);        
    return responseToJson = await response.json();
}

async function loadPokeType(path) {
    let response = await fetch(path);        
    return responseToJson = await response.json();
}

async function loadpokeSpecies(path) {
    let response = await fetch(path);        
    return responseToJson = await response.json();
}

async function loadEvoChain(path) {
    let response = await fetch(path);        
    return responseToJson = await response.json();
}