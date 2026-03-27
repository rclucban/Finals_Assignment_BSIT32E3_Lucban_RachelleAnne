import React from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-brand">Todo Master</div>
        <ul className="nav-links">
          <li><Link to="/">Todos</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <ThemeSwitcher />
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Finals Assignment - Q2</p>
      </footer>
    </div>
  );
};

export default Layout;
