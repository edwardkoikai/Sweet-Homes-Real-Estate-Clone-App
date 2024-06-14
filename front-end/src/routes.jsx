import * as React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import ViewReservations from "./pages/ViewReservations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/add-property",
        element: <AddProperty />
      },
      {
        path: "/reservations",
        element: <ViewReservations />
      }

    ]
  }
]);

export { router }