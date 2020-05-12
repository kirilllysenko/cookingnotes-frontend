import React from "react";
import {Link, useHistory} from "react-router-dom";
import arrow from "../../../assets/arrow-expand.svg";
import {ACCESS_TOKEN} from "../../constants/APIurl";
import userAvatar from "../../../assets/user.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {LoggedUser} from "../../api/auth";
import {logout} from "../../store/auth";

const Profile = () => {
    const user = useSelector<RootState, LoggedUser | null>(state=>state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    if (!user)
        return <div/>

    return <div id="navbar-profile" className="position-relative">
        <div className="align-items-center d-flex h-100 select-none">
            <div className="d-flex justify-content-center align-items-center mx-4">
                <img id="navbar-profile-img" className="mr-1"
                     src={user.avatar == null || user.avatar == "" ? userAvatar : "data:image/png;base64," + user.avatar}
                     alt="profile"/>
                <img className="arrow-expand" src={arrow} alt="arrow"/>
            </div>
        </div>
        <div id="navbar-profile-expanding">
            <div id="navbar-profile-expanding-top">
                <h5>{user.name}</h5>
                <Link to={"/profile/" + user.id}>My Profile</Link><br/>
                <Link to="/editprofile">Edit Profile</Link><br/>
                <a className="text-danger edit" onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem(ACCESS_TOKEN);
                    history.push("/home");
                }}>Logout</a>
            </div>
        </div>
    </div>
}

export default Profile;
