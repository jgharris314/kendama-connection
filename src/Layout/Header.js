import React from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";

import "../App.css";


function Header() {

    
  return (
   
    <header className="header">
      <div>
        <h1 className="">Kendama Connection</h1>
        <p className="">The one stop spot for web based kendama needs</p>
      </div>
      <nav className="headerNav">
          <Link className="Link" to={'/'}>
            Home
          </Link>
          <Link className="Link" to={'/trick-generators'}>
            Game Management
          </Link>
          <Link className="Link" to={'/meetup'}>
            Jams and Meets
          </Link>
      </nav>
    </header>
    
  );
}

export default Header;
