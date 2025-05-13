import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Make sure this path is correct
import Nav from './components/nav'
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Nav/>
      <AppRoutes />
      <Footer/>
    </Router>
  );
}
