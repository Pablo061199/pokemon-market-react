export default class Marketplace {
  constructor() {
    this.pokemons = [];
  }

  addPokemon(pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonByName(name) {
    return this.pokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }

  filterByType(type) {
    return this.pokemons.filter(p => p.types.includes(type));
  }

  filterByPrice(min, max) {
    return this.pokemons.filter(p => p.price >= min && p.price <= max);
  }

  sortBy(field) {
    return this.pokemons.sort((a, b) => {
      if(field === 'name') return a.name.localeCompare(b.name);
      if(field === 'price') return a.price - b.price;
      return 0;
    });
  }
}
