import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RouteList from "./RouteList"; // Pastikan ini menunjuk ke file RouteList yang benar
import "./index.css"; // Opsional: Import CSS global jika ada

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={RouteList} />
  </React.StrictMode>
);
