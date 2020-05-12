import React from "react";
import {NavLink, useParams} from "react-router-dom";

const ProfileNav = ()=>{
    const {id} = useParams()
    return <nav>
        <ul className="row">
            <li className="col"><NavLink to={`/profile/${id}/favourites`} activeClassName="active">Favourites</NavLink></li>
            <li className="col"><NavLink to={`/profile/${id}/madeit`} activeClassName="active">Made It</NavLink></li>
            <li className="col"><NavLink to={`/profile/${id}/recipes`} activeClassName="active">Personal Recipes</NavLink></li>
        </ul>
    </nav>
}

export default ProfileNav;
