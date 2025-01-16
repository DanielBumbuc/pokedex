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
    let imgContainer = document.getElementById('img_container');
    for (let typesIndex = 0; typesIndex < pokemonResponse.types.length; typesIndex++) {
        let typeUrl = pokemonResponse.types[typesIndex].type.url;
        let typeName = pokemonResponse.types[0].type.name;
        let typeResponse = await loadPokeType(typeUrl);
        imgContainer.classList.add(`bg-${typeName}`);
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

function checkEvoTwo(evoChain) {
    let evoTwoArr = evoChain.chain.evolves_to;
    if (evoTwoArr.length == 0) {
        showEvo(evoChain);
    } else {
        let evoTwo = `pokemon/${evoChain.chain.evolves_to[0].species.name}/`;
        checkEvoThree(evoChain, evoTwo);
    }
}

function checkEvoThree(evoChain, evoTwo) {
    let evoThreeArr = evoChain.chain.evolves_to[0].evolves_to;
    if (evoThreeArr.length == 0) {
        showEvo(evoChain, evoTwo);
    } else {
        let evoThree = `pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}/`;
        showEvo(evoChain, evoTwo, evoThree);
    }
}

async function showEvo(evoChain, evoTwo, evoThree) {
    let infoContainer = document.getElementById('info_container');
    let evoOne = `pokemon/${evoChain.chain.species.name}/`;
    let evoOneResponse = await loadPokemon(evoOne);
    let evoOneImg = evoOneResponse.sprites.other.home.front_default;
    if (evoTwo != null) {
        let evoTwoResponse = await loadPokemon(evoTwo);
        let evoTwoImg = evoTwoResponse.sprites.other.home.front_default;
        infoContainer.innerHTML = `<img class="evo-img" src = "${evoOneImg}" >
            <img class="evo-img" src="${evoTwoImg}">`;
    } else {
        infoContainer.innerHTML = `<img class="evo-img" src="${evoOneImg}">`;
        return;
    } if (evoThree != null) {
        let evoTwoResponse = await loadPokemon(evoTwo);
        let evoThreeResponse = await loadPokemon(evoThree);
        let evoTwoImg = evoTwoResponse.sprites.other.home.front_default;
        let evoThreeImg = evoThreeResponse.sprites.other.home.front_default;
        infoContainer.innerHTML = `<img class="evo-img" src = "${evoOneImg}" >
            <img class="evo-img" src="${evoTwoImg}">
                <img class="evo-img" src="${evoThreeImg}">`;
    } else {
        let evoTwoResponse = await loadPokemon(evoTwo);
        let evoTwoImg = evoTwoResponse.sprites.other.home.front_default;
        infoContainer.innerHTML = `<img class="evo-img" src = "${evoOneImg}" >
            <img class="evo-img" src="${evoTwoImg}">`;
    }
    if (evoChain.chain.evolves_to.length > 1) {
        infoContainer.innerHTML = `<img class="evo-img" src = "${evoOneImg}">`;
        for (let evoIndex = 0; evoIndex < evoChain.chain.evolves_to.length; evoIndex++) {
            let evoNames = `pokemon/${evoChain.chain.evolves_to[evoIndex].species.name}/`;
            let evoNamesResponse = await loadPokemon(evoNames);
            let evoNamesImg = evoNamesResponse.sprites.other.home.front_default;
            infoContainer.innerHTML += `<div><img class="evo-img" src = "${evoNamesImg}"></div>`;
        }
    }

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