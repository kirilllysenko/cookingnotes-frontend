import React from "react";
import {NavLink} from "react-router-dom";

const EditProfileNav = ()=>{
    return <nav>
        <NavLink to="/editprofile/public" className="pl-1">Edit public profile</NavLink>
        <NavLink to="/editprofile/auth" className="pl-1">Edit authentication</NavLink>
    </nav>
}

export default EditProfileNav;
