async function init() {
    loadAllPokemon();
}

async function loadAllPokemon() {
    let allPokemonResponse = await loadPokemon('pokemon?limit=1025&offset=0');
    let pokemonResponse = await loadPokemon('pokemon?limit=20&offset=' + pokemonStart);
    showInfos(pokemonResponse.results);
    allPokemon.push(allPokemonResponse);
}


async function showInfos(pokemonResponse) {
    let pokeCard = document.getElementById('main_section');
    pokeCard.innerHTML = '';
    for (let pokeIndex = 0; pokeIndex < pokemonResponse.length; pokeIndex++) {
        let pokemonUrl = pokemonResponse[pokeIndex].url;
        let loadCurrentPokemon = await loadPokemonInfo(pokemonUrl);
        getMainSection(loadCurrentPokemon);
    }
    getPageButton(); 
}

function showFilteredInfos(pokemonResponse) {
    let pokeCard = document.getElementById('main_section');
    pokeCard.innerHTML = '';
    for (let pokeIndex = 0; pokeIndex < pokemonResponse.length; pokeIndex++) {
        let pokemon = pokemonResponse;
        let pokemonId = BASE_URL + 'pokemon/' + pokemonResponse[pokeIndex].id;
        pokeCard.innerHTML += `<div onclick="loadPokeInfo(${pokemon, pokeIndex})" id="poke_card${pokeIndex}" class="poke-card"></div>
        <div id="poke_modal" class="modal d-none"></div>`;
        getPokeInfo(pokemonId, pokeIndex, pokemon);
    }
    getPageButton();
}

function getPokeInfo(pokeImgUrl, pokeId, currentPokemon) {
    getPokemon(currentPokemon, pokeId);
    getPokeImg(pokeImgUrl, pokeId);
    getPokeType(currentPokemon, pokeId);
}

async function getPokeType(currentPokemon, pokeId) {
    let backgroundImg = document.getElementById('pokemon_img' + pokeId);
    let typeName = currentPokemon.types[0].type.name;
    backgroundImg.classList.add(`bg-${typeName}`);
    for (let typeIndex = 0; typeIndex < currentPokemon.types.length; typeIndex++) {
        let currentType = currentPokemon.types[typeIndex];
        let imgResponse = await loadPokemonInfo(currentType.type.url);
        let generation = 'generation-ix';
        let generationName = 'scarlet-violet';
        let typeSprite = imgResponse.sprites[generation];
        let typeUrl = typeSprite[generationName].name_icon;
        getTypeImg(typeUrl, pokeId);
    }
}

async function getPokeImg(pokeImgUrl, pokeId) {
    let myPokeImg = document.getElementById('pokemon_img' + pokeId);
    myPokeImg.innerHTML += `<img src="${pokeImgUrl}" class="pokemon-img">`;
}

async function loadPokeInfo(currentPokemon) {
    let pokeId = currentPokemon;
    let path = `pokemon/${pokeId}/`;
    let pokemonResponse = await loadPokemon(path);
    let speciesResponse = await loadpokeSpecies(pokemonResponse.species.url);
    let evoChain = await loadEvoChain(speciesResponse.evolution_chain.url, currentPokemon);
    getCurrentPokemon(pokemonResponse, pokeId);
    getTypeInfo(pokemonResponse);
    if (mainButton == true) {
        showMainInfo(pokemonResponse);
        return mainButton = false;
    } if (statsButton == true) {
        showStats(pokemonResponse);
        return statsButton = false;
    } if (evoButton == true) {
        checkEvoTwo(evoChain);
        return evoButton = false;
    }
}

async function searchPokemon() {
    let input = document.getElementById('my_input');
    let minTextInfo = document.getElementById('min_text_info');
    let txtValue = input.value;
    let myPokemon = allPokemon[0].results;
    let result = myPokemon.filter(pokeName => pokeName.name.includes(txtValue.toLowerCase()));
    let filteredPokemon = [];
    filteredPokemon.push(result);
    if (txtValue.length >= 3) {
        minTextInfo.innerHTML = '';
        showInfos(filteredPokemon[0])
    } else {
        minTextInfo.innerHTML = 'type min three letters';
    } if(txtValue.length <= 0) {
        minTextInfo.innerHTML = '';
    } if (txtValue.length < 2) {
        return
    } if (txtValue.length < 3) {
        loadAllPokemon();
    } 
}

async function getPokeIndex(myPokeIndex, txtValue) {
    let pokeArr = [];
    pokeArr.push(myPokeIndex);
    let myFilteredPokemon = myPokeIndex.filter(pokeName => pokeName.includes(txtValue.toLowerCase()));
    if (txtValue.length >= 3) {
        if (myFilteredPokemon != '') {
            console.log(myFilteredPokemon);
        }
    }
}

async function loadCurrentPage() {
    let pokeCard = document.getElementById('main_section');
    let currentPokemons = pokemonStart;
    let pokemonResponse = await loadPokemon('pokemon?limit=20&offset=' + currentPokemons);
    pokeCard.innerHTML = '';
    showInfos(pokemonResponse.results);
}

async function loadNextPage() {
    let pokeCard = document.getElementById('main_section');
    let nextPokemons = pokemonStart + 20;
    let pokemonResponse = await loadPokemon('pokemon?limit=20&offset=' + nextPokemons);
    if (pokemonStart >= 1005) {
        return
    }
    pokeCard.innerHTML = '';
    pokemonStart = nextPokemons;
    showInfos(pokemonResponse.results);
}

async function loadPreviousPage() {
    let pokeCard = document.getElementById('main_section');
    let previousPokemons = pokemonStart - 20;
    let pokemonResponse = await loadPokemon('pokemon?limit=20&offset=' + previousPokemons);
    if (previousPokemons < 0) {
        return
    }
    pokeCard.innerHTML = '';
    pokemonStart = previousPokemons;
    showInfos(pokemonResponse.results);
}

// outsource modal Code in modal.js
// outsorce evo Images in template
