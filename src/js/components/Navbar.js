import React, {Component, createRef} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import arrow from "../../img/arrow-expand.svg";
import edit from "../../img/edit.svg";
import power from "../../img/power-button.svg"
import {logout} from "../store/actions"
import logo from "../../img/site-logo.svg";

const Navbar = (props) => {
    let rightPart;
    if (props.authenticated) {
        rightPart = <div className="navbar-nav ml-auto">
            <Profile user={props.user}/>
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
        <Link to="/home"><div className="navbar-page mr-4">Home</div></Link>
        <Link to="/search"><div className="navbar-page">Recipes</div></Link>
        {rightPart}
    </div>
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {display: false}
        this.expanding = createRef();
    }

    render() {
        const {user} = this.props;
        return <div id="navbar-profile" className="position-relative">
            <div className="align-items-center d-flex h-100 select-none">
                {/*// onClick={() => this.setState({display: !this.state.display})}>*/}
                <div className="d-flex justify-content-center align-items-center mx-4">
                    <img id="navbar-profile-img" className="mr-1" src={"data:image/png;base64,"+user.avatar} alt="profile"/>
                    <img className="arrow-expand" src={arrow} alt="arrow"/>
                </div>
            </div>
            {/*<div id="navbar-profile-expanding" style={{display:(this.state.display?"block":"none")}}>*/}
            <div id="navbar-profile-expanding">
                <div id="navbar-profile-expanding-top">
                    <h5>{user.name}</h5>
                    <Link to="/recipebook">Recipe Book</Link><br/>
                    <Link to="/editprofile">Edit Profile</Link><br/>
                    <a onClick={logout}>Logout</a>
                </div>
            </div>
        </div>
    }
}

export default connect(state => ({authenticated: state.authenticated, user: state.user}))(Navbar);