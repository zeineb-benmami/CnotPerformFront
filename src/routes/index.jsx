import React from "react";
import { Navigate } from "react-router-dom";
import Authmiddleware from "./route";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Calendar from "../pages/Calendar/index";
import Federation from "../pages/Federations/contacts-grid";

// Front office pages
import Home from "../frontoffice/pages/Home";
import Header from "../frontoffice/pages/Header";
import Footer from "../frontoffice/pages/Footer";
import Unauthorized from "./unauthorized";

const restrictedRoutes = ["/profile", "/dashboard", "/calendar", "/federation"];

const authProtectedRoutes = [
  {
    path: "/dashboard",
    component: (
      <Authmiddleware restrictedRoutes={restrictedRoutes}>
        <Dashboard />
      </Authmiddleware>
    ),
  },
  {
    path: "/calendar",
    component: (
      <Authmiddleware restrictedRoutes={restrictedRoutes}>
        <Calendar />
      </Authmiddleware>
    ),
  },
  {
    path: "/federation",
    component: (
      <Authmiddleware restrictedRoutes={restrictedRoutes}>
        <Federation />
      </Authmiddleware>
    ),
  },
  {
    path: "/profile",
    component: (
      <Authmiddleware restrictedRoutes={restrictedRoutes}>
        <UserProfile />
      </Authmiddleware>
    ),
  },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  {
    path: "/home",
    component: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/unauthorized", component: <Unauthorized /> },

];

export { authProtectedRoutes, publicRoutes };
