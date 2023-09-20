import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

export const useCart = () => {
  const cart = useContext(CartContext);

  //Si la part en la que fem servir el context no está envoltada per un provider, error
  if (cart === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
};
