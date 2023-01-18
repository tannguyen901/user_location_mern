import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const handleLogout = () => {auth.logout()};
  const userId = useParams().userId;

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn &&
      <li>
        <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
      </li>
      }
      {auth.isLoggedIn &&
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      }
      {!auth.isLoggedIn &&
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
      }
      {auth.isLoggedIn &&
      <li>
        <NavLink onClick={handleLogout} to="/auth">LOGOUT</NavLink>
      </li>
      }
    </ul>
  );
};
export default NavLinks;
