import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
