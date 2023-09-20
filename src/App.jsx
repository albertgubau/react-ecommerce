import { products as initialProducts } from "./mocks/products.json";
import { Products } from "./components/Products.jsx";
import { useState } from "react";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart.jsx";
import { Footer } from "./components/Footer.jsx";
import { IS_DEVELOPMENT } from "./config";
import { useFilters } from "./hooks/useFilters";
import { CartContextProvider } from "./context/cart.jsx";

function App() {
  const [products] = useState(initialProducts);
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <CartContextProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartContextProvider>
    // Ens fem un footer que mostra dades només en estat de desenvolupament, en producció no!
  );
}

export default App;
