// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { isLoggedIn } from "./services/authService";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {/* Mostrar Navbar en todas las rutas menos login */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/pokemons"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Ruta por defecto */}
        <Route
          path="*"
          element={
            isLoggedIn() ? <Navigate to="/pokemons" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
