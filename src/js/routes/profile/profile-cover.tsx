import React from "react";
import "./profile.scss";
import topImage from "../../../assets/pages/add-recipe-top.png";
import userAvatar from "../../../assets/user.svg";
import {ProfileResponse} from "../../api/profile";

const ProfileCover = ({cover, avatar, name}: ProfileResponse) => {
    return <div>
        <div className="profile-top"
             style={{backgroundImage: cover ? "url(data:image/png;base64," + cover + ")" : "url(" + topImage + ")"}}>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="row">
                        <div className="col-auto">
                            <img src={avatar == null || avatar === "" ?
                                userAvatar :
                                "data:image/png;base64," + avatar}
                                 alt="avatar" className="avatar"/>
                        </div>
                        <div className="col-auto pl-0 align-items-end">
                            <div className="name">{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileCover;
