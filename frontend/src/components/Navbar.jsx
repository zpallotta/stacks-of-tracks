import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

import AuthInfo from './AuthInfo'

function Navbar() {
    return <nav className="navbar bg-dark container">
        <h4><Link className="link" to="/">Home</Link></h4>
        <h4><Link className="link" to="/search">Search Track</Link></h4>
        <h4><Link className="link" to="/add">Add Track</Link></h4>
        <AuthInfo />
        {/* <h4><Link className="link" to="/login">Login</Link></h4> */}
    </nav>
}

export default Navbar;
