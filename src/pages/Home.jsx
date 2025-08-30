import React, { useEffect, useState, useContext } from "react";
import { CartItem } from "../models/CartItem";
import { CartContext } from "../context/CartContext";
import PokemonCard from "../components/PokemonCard";
import Filters from "../components/Filters";
import CheckoutModal from "../components/CheckoutModal";
import { fetchPokemons } from "../services/pokemonService";

const Home = () => {
  const { cart, addToCart } = useContext(CartContext);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("");

  const [showCheckout, setShowCheckout] = useState(false);

  // cargar Pokémon desde service
  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
      setFilteredPokemons(data.slice(0, 20));
    };
    loadPokemons();
  }, []);

  // aplicar filtros cada vez que cambien pokemons o filtros
  useEffect(() => {
    let filtered = [...pokemons];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((p) => p.types.includes(filterType));
    }

    if (minPrice !== "") {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortField === "price") return a.price - b.price;
        if (sortField === "name") return a.name.localeCompare(b.name);
        return 0;
      });
    }

    // si no hay filtros, mostrar primeros 20
    if (!search && !filterType && !minPrice && !maxPrice && !sortField) {
      setFilteredPokemons(pokemons.slice(0, 20));
    } else {
      setFilteredPokemons(filtered);
    }
  }, [search, filterType, minPrice, maxPrice, sortField, pokemons]);

  const handleAddToCart = (pokemon) => {
    if (pokemon.stock <= 0) {
      alert("Stock agotado");
      return;
    }
    addToCart(new CartItem(pokemon));
    pokemon.stock -= 1;
    setPokemons([...pokemons]);
  };

  return (
    <div className="container my-4">

      <div className="row mb-3">
        <div className="col-md-12">
          <Filters
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortField={sortField}
            setSortField={setSortField}
          />
        </div>
      </div>

      <div className="row">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-md-3 mb-3">
            <PokemonCard pokemon={pokemon} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>

      <div className="fixed-bottom p-3 bg-light d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => setShowCheckout(true)}
        >
          Checkout ({cart.items.length} items) - Total: ${cart.calculateTotal()}
        </button>
      </div>

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default Home;
