import React, { createContext, useState, useEffect } from "react";
import { Cart } from "../models/Cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(new Cart());
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(null);

  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.email || null;
  };

  const loadCarts = () => JSON.parse(localStorage.getItem("cart") || "{}");
  const saveCarts = (carts) => localStorage.setItem("cart", JSON.stringify(carts));

  useEffect(() => {
    const currentEmail = getUserEmail();
    if (currentEmail !== email) {
      setEmail(currentEmail);
    }
  }, [email]);

  useEffect(() => {
    if (!email) {
      setCart(new Cart());
      setReady(true);
      return;
    }

    const carts = loadCarts();
    setCart(carts[email] ? Cart.fromJSON(carts[email]) : new Cart());
    setReady(true);
  }, [email]);

  useEffect(() => {
    if (!ready || !email) return;
    const carts = loadCarts();
    carts[email] = cart;
    saveCarts(carts);
  }, [cart, ready, email]);

  const addToCart = (item) => {
    cart.addItem(item);
    setCart(Cart.fromJSON(cart));
  };

  const removeFromCart = (id) => {
    cart.removeItem(id);
    setCart(Cart.fromJSON(cart));
  };

  const clearCart = () => {
    cart.clear();
    setCart(Cart.fromJSON(cart));
  };

  const switchUser = (newEmail) => setEmail(newEmail);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, switchUser }}>
      {children}
    </CartContext.Provider>
  );
};
