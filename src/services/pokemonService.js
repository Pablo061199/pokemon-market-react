// src/services/pokemonService.js
import axios from "axios";
import { Pokemon } from "../models/Pokemon";

const STORAGE_KEY = "listPokemons";

// Generar precio y stock estáticos/aleatorios
function generatePrice() {
  return Math.floor(Math.random() * 100) + 10; // 10 - 110
}
function generateStock() {
  return Math.floor(Math.random() * 20) + 1; // 1 - 20
}

// Guardar en localStorage
function saveToStorage(pokemons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
}

// Leer de localStorage
function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

// Petición a la API de PokeAPI
export async function fetchPokemons() {
  // 1. Ver si ya hay en localStorage
  const cached = loadFromStorage();
  if (cached && cached.length > 0) {
    console.log("⚡ Cargando Pokémon desde localStorage");
    return cached.map(
      (p) => new Pokemon(p.id, p.name, p.types, p.image, p.price, p.stock)
    );
  }

  try {
    console.log("🌐 Cargando Pokémon desde API...");

    // 2. Obtener la lista de 151 Pokémon
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const results = res.data.results;

    // 3. Obtener datos individuales
    const detailed = await Promise.all(
      results.map(async (p, index) => {
        const pokeRes = await axios.get(p.url);
        const types = pokeRes.data.types.map((t) => t.type.name);
        const image =
          pokeRes.data.sprites.other["official-artwork"].front_default;

        return new Pokemon(
          index + 1,
          p.name,
          types,
          image,
          generatePrice(),
          generateStock()
        );
      })
    );

    // 4. Guardar en localStorage
    saveToStorage(detailed);

    return detailed;
  } catch (error) {
    console.error("Error cargando Pokémon:", error);
    return [];
  }
}
