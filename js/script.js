const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAtribute = document.querySelector('.table__atributo')

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const shiny = document.querySelector('.input__shiny');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let data;

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
        if (APIResponse.status === 200) {
        const response = await APIResponse.json();
        return response;
    }
}

const changeVersion = () => {
    var version = shiny.checked ? 'front_shiny' : 'front_default';
    
    const image = data['sprites']['versions']['generation-v']['black-white']['animated'][version];
    
    pokemonImage.src = image ? image : pokemonImage.src = data['sprites'][version];
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loding...';
    pokemonNumber.innerHTML = '';

    data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        changeVersion();
        
        input.value = '';
        searchPokemon = data.id;

        data.types.forEach(item => {
            var row = pokemonAtribute.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = 'Type ' + item.slot;
            cell2.innerHTML = item.type.name;
        })

        data.stats.forEach(item => {
            var row = pokemonAtribute.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = item.stat.name;
            cell2.innerHTML = item.base_stat;
        })

    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found' ;
        pokemonNumber.innerHTML = '';
    }
}
    
const clearTable = () => {
    while(pokemonAtribute.rows[1]) pokemonAtribute.deleteRow(1);
}

form.addEventListener('submit', (event) => {
    clearTable()
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        clearTable()
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    clearTable()
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

shiny.addEventListener('click', () => {
    changeVersion();
});

renderPokemon(searchPokemon)