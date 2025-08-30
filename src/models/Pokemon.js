export class Pokemon {
  constructor(id, name, types, image, price, stock) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.image = image;
    this.price = price || Math.floor(Math.random() * 100) + 10;
    this.stock = stock || Math.floor(Math.random() * 20) + 1;
  }
}
