import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { setAuthToken } from "./api/setAuthToken";
import ErrorPage from "../src/routes/ErrorPage";
import Layout from "./components/Layout";
import Create from "./routes/AREA/Create";
import Services from "./routes/AREA/Services";
import SingleAction from "./routes/AREA/SingleAction";
import SingleService from "./routes/AREA/SingleService";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import RequireAuth from "./routes/RequireAuth";
import Admin from "./routes/Admin";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>LOADING...</h1>;
  } else {
    return (
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Layout />}>
          {/** Public routes **/}
          <Route path="login" element={<Login />} />

          {/** Protected routes **/}
          <Route element={<RequireAuth />}>
            <Route path="admin" element={<Admin />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create" element={<Create />} />
            <Route path="create/action/services" element={<Services />} />
            <Route path="create/reaction/services" element={<Services />} />
            <Route
              path="create/action/services/:serviceName"
              element={<SingleService type="action" />}
            />
            <Route
              path="create/reaction/services/:serviceName"
              element={<SingleService type="reaction" />}
            />
            <Route
              path="create/action/services/:serviceName/:actionId"
              element={<SingleAction type="action" />}
            />
            <Route
              path="create/reaction/services/:serviceName/:actionId"
              element={<SingleAction type="reaction" />}
            />
          </Route>
        </Route>
      </Routes>
    );
  }
}
