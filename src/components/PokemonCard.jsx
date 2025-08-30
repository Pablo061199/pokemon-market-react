import React from "react";

const PokemonCard = ({ pokemon, onAddToCart }) => {
  return (
    <div className="card h-100">
      <img
        src={pokemon.image}
        className="card-img-top"
        alt={pokemon.name}
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
        <p className="card-text">Tipo: {pokemon.types.join(", ")}</p>
        <p className="card-text">Precio: ${pokemon.price}</p>
        <p className="card-text">Stock: {pokemon.stock}</p>
        <button
          className="btn btn-success w-100"
          onClick={() => onAddToCart(pokemon)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
