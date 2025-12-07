import axios from 'axios';

// Use environment variable for API base URL; fallback to public API if not set
const BASE_URL = process.env.REACT_APP_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

const cache = new Map();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getPokemonList = async (offset = 0, limit = 25) => {
  const cacheKey = `pokemon-list-${offset}-${limit}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
    
    // Get details for each Pokémon
    const detailedPokemon = await Promise.all(
      response.data.results.map(async (pokemon, index) => {
        const id = offset + index + 1;
        try {
          return await getPokemonById(id);
        } catch (error) {
          console.error(`Error fetching Pokemon ${id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null results
    const validPokemon = detailedPokemon.filter(p => p !== null);
    
    const result = {
      ...response.data,
      results: validPokemon
    };
    
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const getPokemonByName = async (name) => {
  const cacheKey = `pokemon-${name}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await api.get(`/pokemon/${name}`);
    const data = response.data;
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon ${name}:`, error);
    throw error;
  }
};

export const getPokemonById = async (id) => {
  return getPokemonByName(id.toString());
};

export const searchPokemon = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await api.get('/pokemon?limit=1000');
    const filtered = response.data.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Return only first 10 matches with basic info
    const limitedResults = filtered.slice(0, 10);
    
    // Get basic info for each result
    const resultsWithInfo = await Promise.all(
      limitedResults.map(async (pokemon) => {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        try {
          const details = await getPokemonById(id);
          return {
            id: details.id,
            name: details.name,
            sprites: details.sprites,
            types: details.types
          };
        } catch (error) {
          return {
            id: parseInt(id),
            name: pokemon.name,
            sprites: {},
            types: []
          };
        }
      })
    );
    
    return resultsWithInfo;
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    return [];
  }
};

export const getPokemonSpecies = async (id) => {
  const cacheKey = `species-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await api.get(`/pokemon-species/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species ${id}:`, error);
    throw error;
  }
};

export const getEvolutionChain = async (url) => {
  const cacheKey = `evolution-${url}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    return null;
  }
};

export const getPokemonMoveDetails = async (url) => {
  const cacheKey = `move-${url}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching move details:', error);
    return null;
  }
};
