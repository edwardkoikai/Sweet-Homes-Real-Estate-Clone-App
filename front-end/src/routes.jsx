import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import ViewReservations from "./pages/ViewReservations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/AddProperty",
    element: <AddProperty />
  },
  {
    path: "/reservations",
    element: <ViewReservations />
  }
]);

export {router}