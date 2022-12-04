import React from "react";
import Home from "./Home";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Create from "./AREA/Create";
import List from "./AREA/List";
import Services from "./AREA/Services";
import SingleService from "./AREA/SingleService";
import Login from "./Login";
import Profile from "./Profile";
import SingleAction from "./AREA/SingleAction";
import ProtectedRoute from "./RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/action/services",
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/action/services/:serviceName",
    element: (
      <ProtectedRoute>
        <SingleService type="action" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/action/services/:serviceName/:actionId",
    element: (
      <ProtectedRoute>
        <SingleAction type="action" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/reaction/services",
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/reaction/services/:serviceName",
    element: (
      <ProtectedRoute>
        <SingleService type="reaction" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/reaction/services/:serviceName/:actionId",
    element: (
      <ProtectedRoute>
        <SingleAction type="reaction" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/list",
    element: (
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
