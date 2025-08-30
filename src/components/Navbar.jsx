// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../services/authService";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { switchUser } = useContext(CartContext) || {};
  const navigate = useNavigate();
  const user = getCurrentUser();
  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
    if (switchUser) switchUser(user.email);
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span className="navbar-brand mb-0 h1">Pokémon Marketplace</span>

      <div className="d-flex ms-auto align-items-center">
        <span className="me-3">{user?.email || "Invitado"}</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
