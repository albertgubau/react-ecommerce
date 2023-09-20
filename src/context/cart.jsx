import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    console.log(productInCartIndex);
    //Si hem trobat el producte en el carrito
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1; //Copia profunda del carrito
      return setCart(newCart);
    }

    //El producte no está en el carrito
    setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product) => {
    // Utilitzem prevState per actualitzar estats i assegurar que es l'últim estat (es una bona pràctica)
    setCart((prevState) =>
      prevState.filter((item) => {
        return item.id !== product.id;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
