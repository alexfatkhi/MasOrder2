import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RouteList from "./Router/RouteList"; // Pastikan ini menunjuk ke file RouteList yang benar
import "./index.css"; // Opsional: Import CSS global jika ada
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={RouteList} />
  </React.StrictMode>
);
