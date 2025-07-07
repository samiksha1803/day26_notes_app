// src/NavBar.js
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/create">Add Note</Link>
    </nav>
  );
}

export default NavBar;
