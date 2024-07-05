import React from "react";
import { Navigate } from "react-router-dom";

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

import Events from "../pages/Events/projects-grid";

import Liste from "../pages/Events/projects-list";
import Home from "../frontoffice/pages/Home";

import Landing from "../frontoffice/landing/index";
import Header from "../frontoffice/pages/Header";

import Footer from "../frontoffice/pages/Footer";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/calendar", component: <Calendar /> },

  { path: "/events", component: <Events /> },
  { path: "/liste", component: <Liste /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
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
  {
    path: "/landing",
    component: (
      <>
        <Landing />
      </>
    ),
  },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
