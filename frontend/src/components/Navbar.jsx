import React from "react";
import { Link } from "react-router-dom";
    
const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link style={{textDecoration:'none'}} to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link style={{textDecoration:'none'}} to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;