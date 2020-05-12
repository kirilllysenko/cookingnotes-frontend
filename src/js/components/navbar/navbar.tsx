import React from "react";
import {Link, NavLink} from "react-router-dom";
import Profile from "./navbar-profile";
import logo from "../../../assets/site-logo.svg";
import "./navbar.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";

const Navbar = () => {
    const authenticatedUser = useSelector <RootState> (state => state.user);

    let rightPart;
    if (authenticatedUser) {
        rightPart = <div className="navbar-nav ml-auto">
            <Profile/>
            <Link to="/addrecipe">
                <button className="btn btn-1">
                    Add recipe
                </button>
            </Link>
        </div>
    } else
        rightPart = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </ul>
    return <div id="navbar" className="navbar navbar-expand">
        <span className="navbar-brand mt-2 mr-5"><img src={logo} alt="logo" width="180"/></span>
        <NavLink activeClassName="active" to="/home">
            <div className="navbar-page">Home</div>
        </NavLink>
        <NavLink activeClassName="active" to="/search">
            <div className="navbar-page">Recipes</div>
        </NavLink>
        <NavLink activeClassName="active" to="/about">
            <div className="navbar-page">About Us</div>
        </NavLink>
        {rightPart}
    </div>
}

export default Navbar;
