import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // <--- IMPORT THIS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>  {/* <--- WRAP THE APP */}
      <App />
    </CartProvider>
  </StrictMode>
);