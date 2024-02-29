const fs = require('fs/promises');
const axios = require('axios');

async function buscarDadosDoPokemon(urlPokemon) {
    try {
        const resposta = await axios.get(urlPokemon);
        const { name, types, weight, height, id, sprites } = resposta.data;

        const dadosDoPokemon = {
            nome: name,
            tipo: types.map(type => type.type.name),
            peso: weight,
            altura: height,
            numeroDex: id,
            urlSprite: sprites.front_default
        };

        return dadosDoPokemon;
    } catch (erro) {
        console.error(`Erro ao buscar dados para ${urlPokemon}: ${erro.message}`);
        throw erro;
    }
}

async function buscarUrlsDeTodosOsPokemons(limite) {
    try {
        const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        return resposta.data.results.map(pokemon => pokemon.url);
    } catch (erro) {
        console.error(`Erro ao buscar URLs dos Pokémons: ${erro.message}`);
        throw erro;
    }
}

async function buscarESalvarDadosDosPokemons(limite) {
    try {
        const urlsDosPokemons = await buscarUrlsDeTodosOsPokemons(limite);

        const dadosDosPokemonsArray = [];
        for (const url of urlsDosPokemons) {
            const dadosDoPokemon = await buscarDadosDoPokemon(url);
            dadosDosPokemonsArray.push(dadosDoPokemon);
        }

        await fs.writeFile('dadosDosPokemons.json', JSON.stringify(dadosDosPokemonsArray, null, 2));
        console.log(`Dados para ${limite} Pokémons salvos com sucesso.`);
    } catch (erro) {
        console.error(`Erro ao buscar e salvar dados dos Pokémons: ${erro.message}`);
    }
}

// Buscar e salvar dados para 151 Pokémons
buscarESalvarDadosDosPokemons(151);