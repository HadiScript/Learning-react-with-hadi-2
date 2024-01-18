import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./logic/context/AuthContext";

import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
