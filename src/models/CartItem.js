export class CartItem {
  constructor(pokemon, quantity = 1) {
    this.pokemon = pokemon;
    this.quantity = quantity;
  }

  getTotal() {
    return this.pokemon.price * this.quantity;
  }
}
