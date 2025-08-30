// fillDb.js
import fs from "fs";
import axios from "axios";

async function fillDb() {
  try {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const results = res.data.results;

    const pokemons = await Promise.all(
      results.map(async (p, index) => {
        const pokeRes = await axios.get(p.url);
        const types = pokeRes.data.types.map((t) => t.type.name);
        const image =
          pokeRes.data.sprites.other["official-artwork"].front_default ||
          pokeRes.data.sprites.front_default;

        const price = parseFloat((Math.random() * 100 + 10).toFixed(2));
        const stock = Math.floor(Math.random() * 20 + 1);

        return {
          id: index + 1,
          name: p.name,
          types,
          image,
          price,
          stock,
        };
      })
    );

    fs.writeFileSync("db.json", JSON.stringify({ pokemons, orders: [] }, null, 2));
    console.log("db.json actualizado con 151 Pokémon!");
  } catch (error) {
    console.error(error);
  }
}

fillDb();
