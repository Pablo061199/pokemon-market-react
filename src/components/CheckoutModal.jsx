import React, { useState } from "react";
import axios from "axios";

const CheckoutModal = ({ cart, onClose }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setLoading(true);

    try {
      // Simulación de pago (70% éxito)
      const success = Math.random() > 0.3;
      await new Promise((res) => setTimeout(res, 1000)); // Delay de 1s

      if (!success) {
        setStatus("fail");
        setLoading(false);
        return;
      }

      // Datos a enviar a json-server
      const orderData = {
        items: cart.items.map((item) => ({
          id: item.id,
          name: item.name,
          types: item.types,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        total: cart.calculateTotal(),
        date: new Date().toISOString(),
      };

      // POST a json-server
      await axios.post("http://localhost:3001/orders", orderData);

      setStatus("success");
      cart.clear(); // Vacía el carrito
    } catch (error) {
      console.error("Error registrando la orden:", error);
      alert("Error al registrar la orden");
    }

    setLoading(false);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Checkout</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {status === null && <p>Total a pagar: ${cart.calculateTotal()}</p>}
            {status === "success" && (
              <p className="text-success">¡Pago exitoso! Tu orden se ha registrado.</p>
            )}
            {status === "fail" && (
              <p className="text-danger">Pago fallido. Intente de nuevo.</p>
            )}
          </div>
          <div className="modal-footer">
            {status === null ? (
              <>
                <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
                  {loading ? "Procesando..." : "Pagar"}
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={onClose}>
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
