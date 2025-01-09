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






async function postPokemon(path, name) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name)
    });
    return responseToJson = await response.json();
}

async function putPokemon(path, name) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name)
    });
    return responseToJson = await response.json();
}

async function deletePokemon(path='') {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'DELETE',
    });
    return responseToJson = await response.json();
}