let mainButton = document.getElementById('main_button');
let statsButton = document.getElementById('stats_button');
let evoButton = document.getElementById('evo_button');
let allPokemon = [];
let pokemonStart = 0;
mainButton = true;
statsButton = false;
evoButton = false;

function getMainSection(currentPokemon) {
    let pokeId = currentPokemon.id;
    let pokeImgUrl = currentPokemon.sprites.other.home.front_default;
    let mainSection = document.getElementById('main_section');
    mainSection.innerHTML += `<div onclick="openModal(${currentPokemon, pokeId})" id="poke_card${pokeId}" class="poke-card"></div>
        <div id="poke_modal" class="modal d-none"></div>`;
    getPokeInfo(pokeImgUrl, pokeId, currentPokemon);
}

function getPokemon(currentPokemon, pokeId) {
    let myPokeCard = document.getElementById('poke_card' + pokeId);
    myPokeCard.innerHTML += `<div class="id-container">
                                <P id="pokemon_id${pokeId}">#${pokeId}</p>
                                <P class="poke-name">${currentPokemon.name}</p>
                            </div>
                            <div id="pokemon_img${pokeId}" class="poke-img-container"></div>
                            <div id="pokemon_type${pokeId}" class="pokemon-type"></div>`;
                            
}

function getTypeImg(typeUrl, pokeId) {
    let myPokeType = document.getElementById('pokemon_type' + pokeId);
    myPokeType.innerHTML += `<img class="type-icon" src="${typeUrl}">`;
}

function getCurrentPokemon(pokemonResponse, pokeIndex) {
    let myPokeModal = document.getElementById('poke_modal');

    myPokeModal.innerHTML = `<P id="single_pokemon_id">#${pokemonResponse.id}</p>
                                <P>${pokemonResponse.name}</p>
                                <div id="img_container">
                                <img class="single-poke-img" src="${pokemonResponse.sprites.other.home.front_default}">
                                </div>
                            <div id="single_pokemon_type"></div>
                            <div class="category-buttons">
                                <button onclick="loadMainInfo(${pokeIndex})" id="main_button">Main</button>
                                <button onclick="loadStats(${pokeIndex})"  id="stats_button">Stats</button>
                                <button onclick="loadEvo(${pokeIndex})" id="evo_button">Evo chain</button>
                            </div>
                            <div id="info_container"></div>
                            <div>
                                <button onclick="previousPokemon(${pokeIndex})">Prev</button>
                                <button onclick="nextPokemon(${pokeIndex})">Next</button>
                                <button onclick="closeModal()">Close</button>
                            </div>`;

}

function getMainInfo(pokemonHeight, pokemonWeight, baseExperience) {
    let mainInfo = document.getElementById('info_container');
    mainInfo.innerHTML = `<P>${pokemonHeight}</p>
                            <P>${pokemonWeight}</p>
                            <P>${baseExperience}</p>
                            <div id="abilities_container"></div>`;
}

function getAbilities(abilities) {
    let PokeAbilities = document.getElementById('abilities_container');
    PokeAbilities.innerHTML += `<p>${abilities}</p>`;
}

function getStats(pokemonHp, pokemonattack, basedefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed) {
    let statsInfo = document.getElementById('info_container');
    statsInfo.innerHTML = `<P>${pokemonHp}</p>
                            <P>${pokemonattack}</p>
                            <P>${basedefense}</p>
                            <P>${pokemonSpecialAttack}</p>
                            <P>${pokemonSpecialDefense}</p>
                            <P>${pokemonSpeed}</p>`;
}

function getPageButton() {
    let pokeCard = document.getElementById('main_section');
    pokeCard.innerHTML += `<div class="page-button">
                                <button onclick="loadPreviousPage()">prev</button>
                                <button onclick="loadNextPage()">next</button>
                            </div>`;
}