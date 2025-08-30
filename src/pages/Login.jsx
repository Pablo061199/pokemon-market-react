import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { UserLogin } from "../models/UserLogin";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Login() {
  const { switchUser } = useContext(CartContext) || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userLogin = new UserLogin(email, password);

    const res = await loginUser(userLogin);
    try {
      if (switchUser) switchUser(res.user.email);
      setSuccess("Bienvenido " + res.user.email);
      navigate("/pokemons"); // redirige a Home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center bg-light"
    >
      <Row className="w-100">
        <Col md={4} className="mx-auto">
          <div className="text-center mb-4">
            {/* Logo (coloca logo.png en /public) */}
            <img src="/logo-pokemon.png" alt="Logo" style={{ width: "400px" }} />
            <h3 className="mt-2">Inicio de Session</h3>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
