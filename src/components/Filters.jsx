import { useState } from "react";
import SearchBar from "../components/SearchBar";

const Filters = ({
    search,
    setSearch,
    filterType,
    setFilterType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortField,
    setSortField,
    applyFilters 
}) => {
    const handleFilter = (e) => {
        e.preventDefault();
        applyFilters();
    };
    const types = [
    "normal", "fire", "water", "grass", "electric",
    "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dragon",
    "dark", "steel", "fairy",
    ];
    const cleanFilters = () => {
        setSearch("");
        setFilterType("");
        setMinPrice("");
        setMaxPrice("");
        setSortField("");
        applyFilters();
    }

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">

        <SearchBar search={search} setSearch={setSearch} />

        <div className="dropdown ms-3">
            <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
            >
            Filtros
            </button>
            <form className="dropdown-menu p-4" style={{minWidth: "400px"}} onSubmit={handleFilter}>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        >
                        <option value="">Todos los tipos</option>
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input
                    type="number"
                    className="form-control"
                    placeholder="Precio min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="number"
                    className="form-control"
                    placeholder="Precio max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <select
                    className="form-select"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    >
                    <option value="">Ordenar</option>
                    <option value="price">Precio</option>
                    <option value="name">Nombre</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Aplicar filtros
                </button>
                <button onClick={cleanFilters} className="btn btn-danger float-end">
                    Limpiar filtros
                </button>
            </form>
        </div>
        </div>

  );
};

export default Filters;
