import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Menu from "./Pages/Menu";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/menu",
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
    ],
  },
]);

export default RouteList;
