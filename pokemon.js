function getEvolucaoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('evolucao');
  }
  
  function updatePageTitleAndHeader() {
    const evolucao = getEvolucaoFromURL();
    if (evolucao) {
      document.title = `Página do ${evolucao}`;
      const headerTitle = document.querySelector('#header h1');
      if (headerTitle) {
        headerTitle.textContent = evolucao;
      }
    }
  }
  
  function fetchPokemonData() {
    const evolucao = getEvolucaoFromURL();
    if (evolucao) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${evolucao}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const pokemonImage = document.createElement('img');
          pokemonImage.src = data.sprites.front_default;
          pokemonImage.alt = evolucao;
          pokemonImage.setAttribute('aria-label', `Imagem de ${evolucao}`);
  
          const pokemonImageSection = document.querySelector('#pokemon-image');
          if (pokemonImageSection) {
            pokemonImageSection.appendChild(pokemonImage);
          }
        })
        .catch(error => console.error('Erro ao obter imagem do Pokémon:', error));
    }
  }
  
  function main() {
    updatePageTitleAndHeader();
    fetchPokemonData();
  }
  
window.onload = main;  