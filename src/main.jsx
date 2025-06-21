import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/amiri";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
