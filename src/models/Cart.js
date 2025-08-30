import { CartItem } from "./CartItem";

export class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const exist = this.items.find(i => i.pokemon.id === item.pokemon.id);
    if (exist) exist.quantity += item.quantity;
    else this.items.push(item);
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.pokemon.id !== id);
  }

  calculateTotal() {
    return this.items.reduce((acc, item) => acc + item.getTotal(), 0);
  }

  clear() {
    this.items = [];
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[user.email] = { items: [] };
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static fromJSON(data) {
    const cart = new Cart();
    cart.items = (data.items || []).map(
      (i) => new CartItem(i.pokemon, i.quantity)
    );
    return cart;
  }
}
