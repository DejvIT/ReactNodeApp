import React from "react";
import Home from "../views/home.component";
import Login from "../views/login.component";
import Register from "../views/register.component";
import Profile from "../views/profile.component";
import BoardUser from "../components/board-user.component";
import BoardModerator from "../components/board-moderator.component";
import BoardAdmin from "../components/board-admin.component";
import TermsAndConditions from "../views/terms.component";
import Gdpr from "../views/gdpr.component";
import Contact from "../views/contact.component";
import AboutUs from "../views/about-us.component";
import Career from "../views/career.component";
import Reservation from "../views/reservation.component";

const routes = (currentUser) => [
  {
    path: ["/home", "/"],
    name: "Home",
    type: "route",
    component: () => <Home currentUser={currentUser} />,
  },
  {
    path: "/login",
    name: "Login",
    type: "route",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    type: "route",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    type: "route",
    component: () => <Profile currentUser={currentUser} />,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    type: "route",
    component: () => <Profile currentUser={currentUser} />,
  },
  {
    path: "/user",
    name: "User board",
    type: "route",
    component: BoardUser,
  },
  {
    path: "/mod",
    name: "Moderator board",
    type: "route",
    component: BoardModerator,
  },
  {
    path: "/admin",
    name: "Admin board",
    type: "route",
    component: BoardAdmin,
  },
  {
    path: "/terms",
    name: "Terms and conditions",
    type: "route",
    component: TermsAndConditions,
  },
  {
    path: "/gdpr",
    name: "GDPR",
    type: "route",
    component: Gdpr,
  },
  {
    path: "/contact_us",
    name: "GDPR",
    type: "route",
    component: () => <Contact currentUser={currentUser} />,
  },
  {
    path: "/about_us",
    name: "About us",
    type: "route",
    component: AboutUs,
  },
  {
    path: "/career",
    name: "Career",
    type: "route",
    component: Career,
  },
  {
    path: currentUser ? "/reservation" : "/login",
    name: "Reservation",
    type: currentUser ? "route" : "redirect",
    component: () => <Reservation currentUser={currentUser} />,
  },
  {
    path: currentUser ? "/reservation/:type" : "/login",
    name: "Reservation",
    type: currentUser ? "route" : "redirect",
    component: () => <Reservation currentUser={currentUser} />,
  },
]

export default routes;
