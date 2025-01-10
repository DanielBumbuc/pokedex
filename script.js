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
    pokeCard.innerHTML += `<div>
                                <button onclick="loadPreviousPage()">previous</button>
                                <button onclick="loadNextPage()">next</button>
                            </div>`
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
    pokeCard.innerHTML += `<div>
                                <button onclick="loadPreviousPage()">previous</button>
                                <button onclick="loadNextPage()">next</button>
                            </div>`
}

function getPokeInfo(pokeImgUrl, pokeId, currentPokemon) {
    getPokemon(currentPokemon, pokeId);
    getPokeImg(pokeImgUrl, pokeId);
    getPokeType(currentPokemon, pokeId);
}

async function getPokeType(currentPokemon, pokeId) {    
    let backgroundImg = document.getElementById('pokemon_img' + pokeId);
    for (let typeIndex = 0; typeIndex < currentPokemon.types.length; typeIndex++) {
        let currentType = currentPokemon.types[typeIndex];
        let imgResponse = await loadPokemonInfo(currentType.type.url);
        backgroundImg.classList.add(`bg-${currentType.type.name}`);    
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
        showEvo(evoChain);
        return evoButton = false;
    }
}

function openModal(currentPokemon) {
    let myModal = document.getElementById('poke_modal');
    let overlay = document.getElementById('overlay');
    myModal.classList.remove('d-none');
    overlay.classList.remove('d-none');
    mainButton = true;
    loadPokeInfo(currentPokemon);
}

function closeModal() {
    let myModal = document.getElementById('poke_modal');
    let overlay = document.getElementById('overlay');
    myModal.classList.add('d-none');
    overlay.classList.add('d-none');
}


async function getTypeInfo(pokemonResponse) {
    let singlePokeType = document.getElementById('single_pokemon_type');
    for (let typesIndex = 0; typesIndex < pokemonResponse.types.length; typesIndex++) {
        let typeUrl = pokemonResponse.types[typesIndex].type.url;
        let typeResponse = await loadPokeType(typeUrl);
        let generationName = 'scarlet-violet';
        let generation = 'generation-ix';
        let typeSprites = typeResponse.sprites[generation];
        singlePokeType.innerHTML += `<img class="type-icon" src="${typeSprites[generationName].name_icon}">`;
    }
}

function showMainInfo(pokemonResponse) {
    let pokemonHeight = pokemonResponse.height;
    let pokemonWeight = pokemonResponse.weight;
    let baseExperience = pokemonResponse.base_experience;
    getMainInfo(pokemonHeight, pokemonWeight, baseExperience);
    for (let abilitiesIndex = 0; abilitiesIndex < pokemonResponse.abilities.length; abilitiesIndex++) {
        let abilities = pokemonResponse.abilities[abilitiesIndex].ability.name;
        getAbilities(abilities);
    }
}

function loadMainInfo(pokeIndex) {
    let pokeId = pokeIndex;
    mainButton = true;
    loadPokeInfo(pokeId);
}

function loadStats(pokeIndex) {
    let pokeId = pokeIndex;
    statsButton = true;
    loadPokeInfo(pokeId);
}

function loadEvo(pokeIndex) {
    let pokeId = pokeIndex;
    evoButton = true;
    loadPokeInfo(pokeId);
}

function showStats(pokemonResponse) {
    let infoContainer = document.getElementById('info_container');
    let statArr = ['HP ', 'Attack ', 'Defense ', 'Special Attack ', 'Special Defense ', 'Speed '];
    for (let statsIndex = 0; statsIndex < pokemonResponse.stats.length; statsIndex++) {
        infoContainer.innerHTML += `<P>${statArr[statsIndex] + pokemonResponse.stats[statsIndex].base_stat}</p>`
    }
    statsButton = false;
}

async function showEvo(evoChain) {
    let evoOne = `pokemon/${evoChain.chain.species.name}/`;
    let evoTwo = `pokemon/${evoChain.chain.evolves_to[0].species.name}/`;
    let evoThree = `pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}/`;
    let infoContainer = document.getElementById('info_container');
    let evoOneResponse = await loadPokemon(evoOne);
    let evoTwoResponse = await loadPokemon(evoTwo);
    let evoThreeResponse = await loadPokemon(evoThree);
    let evoOneImg = evoOneResponse.sprites.other.home.front_default;
    let evoTwoImg = evoTwoResponse.sprites.other.home.front_default;
    let evoThreeImg = evoThreeResponse.sprites.other.home.front_default;
    console.log(evoThreeResponse.sprites.other.home.front_default);
    
    infoContainer.innerHTML = `<img class="evo-img" src="${evoOneImg}">
    <img class="evo-img" src="${evoTwoImg}">
    <img class="evo-img" src="${evoThreeImg}">`;
}

function nextPokemon(pokeIndex) {
    let pokeId = pokeIndex + 1;
    mainButton = true;
    if (pokeId > 1025) {
        return
    }
    loadPokeInfo(pokeId);
}

function previousPokemon(pokeIndex) {
    let pokeId = pokeIndex - 1;
    mainButton = true;
    if (pokeId < 1) {
        return
    }
    loadPokeInfo(pokeId);
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
        console.log(filteredPokemon[0]);
        showInfos(filteredPokemon[0])
    } else {
        minTextInfo.innerHTML = 'type min three letters';
    } if (txtValue.length < 2) {
        return
    } if (txtValue.length < 3) {
        loadAllPokemon();
    }
}

async function getPokeIndex(myPokeIndex, txtValue) {
    let pokeArr = [];
    pokeArr.push(myPokeIndex);
    console.log(pokeArr);
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

// if evo two or three not defined → exit
// 20th pokemon without bg-color, i have to check
// evo img 
// modal bg.color??
// loading spinner