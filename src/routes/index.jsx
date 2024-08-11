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
import Chat from "../pages/Chat/Chat"
import ChatFederation from "../pages/Chat/ChatFederation"
// Front office pages

import Events from "../pages/Events/projects-grid";

import Articles from "../frontoffice/landing/Articles/BlogList/index";

import ArticleDetails from "../frontoffice/landing/Articles/BlogDetails";

import EventOverview from "../pages/Events/EventDetails/EcommerceProductDetail";

import EventDetails from "../pages/Events/ProjectOverview/projects-overview";

import AddEvent from "../pages/Events/projects-create";

import Liste from "../pages/Events/projects-list";
import Home from "../frontoffice/pages/Home";

import Landing from "../frontoffice/landing/index";
import Header from "../frontoffice/pages/Header";
import Footer from "../frontoffice/pages/Footer";
import Unauthorized from "./unauthorized";
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";
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
        <Federation/>
      </Authmiddleware>
    ),
  },
  {
    path: "/chatCnot",
    component: (
      <Authmiddleware restrictedRoutes={restrictedRoutes}>
        <Chat />
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

  { path: "/events", component: <Events /> },

  { path: "/events/add", component: <AddEvent /> },

  { path: "/events/:id", component: <EventOverview /> },

  { path: "/event_details/:id", component: <EventDetails /> },

  { path: "/liste", component: <Liste /> },

  //email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read/:id", component: <EmailRead /> },
  { path: "/email-template-basic", component: <EmailBasicTemplte /> },
  { path: "/email-template-alert", component: <EmailAlertTemplte /> },
  { path: "/email-template-billing", component: <EmailTemplateBilling /> },

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
        <Landing />
      </>
    ),
  },
  { path: "/Chat",  component: (
    <>
      <Header />
      <ChatFederation />
      <Footer />
    </>
  ), },

  { path: "/articles", component: <Articles /> },

  { path: "/articles/:id", component: <ArticleDetails /> },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/unauthorized", component: <Unauthorized /> },

];

export { authProtectedRoutes, publicRoutes };
