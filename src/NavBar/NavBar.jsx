import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="home-button">Home</NavLink>
    </nav>
  );
}

export default NavBar;