let mainButton = document.getElementById('main_button');
let statsButton = document.getElementById('stats_button');
let evoButton = document.getElementById('evo_button');
let allPokemon = [];
let pokemonStart = 0;
let pokemonAmount = 18;
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
                                <P id="pokemon_name${pokeId}" class="poke-name">${currentPokemon.name}</p>
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
    myPokeModal.innerHTML = `<div class="single-id-container">
                                <P id="single_pokemon_id" class="poke-id">#${pokemonResponse.id}</p>
                                <P id="single_poke_id" class="single-pokemon-name">${pokemonResponse.name}</p>
                                <a id="close">
                                    <img class="nav-btn img_on" src="/assets/icons/icons8-löschen-48.png" onclick="closeModal()">
                                    <img class="nav-btn img_off" src="/assets/icons/icons8-löschen-48-red.png" onclick="closeModal()">
                                </a>
                            </div>
                                <div id="img_container">
                                <img class="single-poke-img" src="${pokemonResponse.sprites.other.home.front_default}">
                                </div>
                            <div id="single_pokemon_type"></div>
                            <div class="cat-button">
                                <div onclick="loadMainInfo(${pokeIndex})" id="main_button" class="btn-style main-btn">Main</div>
                                <div onclick="loadStats(${pokeIndex})"  id="stats_button" class="btn-style stats-btn">Stats</div>
                                <div onclick="loadEvo(${pokeIndex})" id="evo_button" class="btn-style evo-btn">Evo Chain</div>
                            </div>
                            <div class="bottom-bg">
                                <div id="info_container"></div>
                                <div id="stats_container"></div>
                                <div id="evo_container" class="evo-container">
                                    <div id="basic_pokemon"></div>
                                    <div id="different_evo"></div>
                                </div>
                                <div class="nav-btn-container">
                                    <div class="first-btn-row">
                                        <img class="nav-btn" src="./assets/icons/icons8-zurück-50.png" onclick="previousPokemon(${pokeIndex})">
                                        <img class="nav-btn" src="./assets/icons/icons8-forward-50.png" onclick="nextPokemon(${pokeIndex})">
                                    </div>
                                    
                                </div>
                            </div>`;
}

function getMainInfo(resultHeight, resultWeight, baseExperience) {
    let mainInfo = document.getElementById('info_container');
    mainInfo.innerHTML = `<div class="main-info">
                                <div class="single-info">
                                    <p class="info-title">Heigth: </p>
                                    <P>${resultHeight} m</p>
                                </div>
                                <div class="single-info">
                                    <p class="info-title">Weight: </p>
                                    <P>${resultWeight} kg</p>
                                </div>
                                <div class="single-info">
                                    <p class="info-title">Base experience: </p>
                                    <P>${baseExperience} xp</p>
                                </div>
                                    <div class="single-info ability-container">
                                        <p class="info-title">Abilities:</p>
                                        <div id="abilities_container"></div>
                                    </div>    
                            </div>`;
}

function getAbilities(abilities, abilityIndex) {
    let pokeAbilities = document.getElementById('abilities_container');
    pokeAbilities.innerHTML += `<p id="ability${abilityIndex}">${abilities}</p>`;
    firstLetterAbilitiy(abilityIndex);
}

function getPageButton() {
    let pokeCard = document.getElementById('main_section');
    pokeCard.innerHTML += `<div class="page-btn-container">
                                <button class="page-btn" onclick="loadPreviousPage()">Previous Page</button>
                                <button class="page-btn" onclick="loadNextPage()">Next Page</button>
                            </div>`;
}

function getEvoChain() {
    
}