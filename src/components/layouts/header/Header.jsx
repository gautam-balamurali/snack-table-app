/* eslint-disable */

import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <nav className="navigation">
      <NavLink className={"link"} to="/">
        {" "}
        🏠 Home{" "}
      </NavLink>{" "}
    </nav>
  );
};

export default Header;
