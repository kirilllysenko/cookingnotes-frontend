import React from "react";
import Top from "../../components/top/top";
import topImage from "../../../assets/pages/editprofile.jpg";
import EditProfileNav from "./edit-profile-nav";
import "./edit-profile.scss";
import {Redirect, Route, Switch} from "react-router-dom";
import EditProfilePublic from "./edit-profile-public";
import EditProfileAuth from "./edit-profile-auth";

const EditProfile = () =>
    <div>
        <div id="edit-profile">
            <Top text="Edit profile" image={topImage}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-4">
                        <EditProfileNav/>
                    </div>
                    <div className="col-8">
                        <Switch>
                            <Route path="/editprofile/public" component={EditProfilePublic}/>
                            <Route path="/editprofile/auth" component={EditProfileAuth}/>
                            <Route render={()=><Redirect to="/editprofile/public"/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    </div>

export default EditProfile;
