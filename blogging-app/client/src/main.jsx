// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'; // Import index.css
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
