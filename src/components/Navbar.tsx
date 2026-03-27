import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">My Portfolio</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About Me
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact Me
          </NavLink>
        </li>
      </ul>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
