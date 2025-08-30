// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

export default function ProtectedRoute({ children, roles }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/" replace />; // si no tiene permiso → home
  }

  return children;
}
