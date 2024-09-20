import React from "react";
import { HeaderNav } from "./HeaderNav";


export const NavBar: React.FC = () => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <HeaderNav />
      </nav>
    </div>
  );
};
