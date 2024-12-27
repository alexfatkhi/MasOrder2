import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Menu from "../Pages/Menu";
import MenuDetail from "../Pages/MenuDetail"; // Perbaikan path import
import Cart from "../Pages/Cart";
import Checkout from "../Pages/CheckOut";
import MainLayout from "../Layouts/MainLayout";
import Scan from "../Pages/Scan";
import ScanResult from "../Pages/ScanResult";
import OrderDone from "../Pages/OrderDone";

const RouteList = createBrowserRouter([
    {
        path: "/", // Rute utama
        element: <Login />,
    },
    {
        path: "/", // Rute menu utama
        element: <MainLayout />,
        children: [
            {
                path: "menu", // Mengatur agar "/menu" langsung memuat Menu
                element: <Menu />,
            },
            {
                path: "menu/:id", // Rute detail menu berdasarkan ID
                element: <MenuDetail />,
            },
            {
                path: "/done",
                element: <OrderDone />
            },
            {
                path: "/table/:tableId",
                element: <ScanResult />
            },
            {
                path: "/scan",
                element: <Scan />
            },
        ],

    },
    {
        path: "/cart", // Rute utama
        element: <Cart />,
    },
    {
        path: "/checkout", // Rute utama
        element: <Checkout />,
    },
    {
        path: "/scan",
        element: <Scan />
    },
    {
        path: "/table/:tableId",
        element: <ScanResult />
    }
]);

export default RouteList;
