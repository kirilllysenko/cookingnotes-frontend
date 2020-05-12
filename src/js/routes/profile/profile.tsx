import "./profile.scss";

import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useParams} from "react-router-dom";
import ProfileCover from "./profile-cover";
import ProfileAbout from "./profile-about";
import ProfileNav from "./profile-nav";
import Search from "../../components/search";
import Spinner from "../../components/spinner";
import * as APIProfile from "../../api/profile";
import {ProfileResponse} from "../../api/profile";

const Profile = () => {
    const [isLoading, changeIsLoading] = useState(true);
    const [profile, changeProfile] = useState<ProfileResponse>();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const profile = await APIProfile.getProfile(id);
                    changeProfile(profile);
                } catch(e) {
                    console.log(e);
                } finally {
                    changeIsLoading(false);
                }
            }
        })()
    }, []);

    const renderProfileAbout = () => {
        if (profile)
            return profile.about || profile.city || profile.country ||
                profile.id === id || profile.twitterLink || profile.facebookLink || profile.instagramLink;
    };

    if (isLoading)
        return <Spinner/>;

    if (profile)
        return <div>
            <ProfileCover {...profile}/>
            <div className="container mt-5">
                <div className="row">
                    {renderProfileAbout() ? <div className="col-4">
                        <ProfileAbout {...profile}/>
                    </div> : null}
                    <div className={renderProfileAbout() ? "col-8" : "col"}>
                        <ProfileNav/>
                        <Switch>
                            <Route path="/profile/:id/favourites" render={(props) => <section key={0}>
                                <Search {...props} url={`/user/${id}/favourites`}/>
                            </section>}/>
                            <Route path="/profile/:id/madeit" render={(props) => <section key={1}>
                                <Search {...props} url={`/user/${id}/madeit`}/>
                            </section>}/>
                            <Route path="/profile/:id/recipes" render={(props) => <section key={2}>
                                <Search {...props} url={`/user/${id}/personal`}/>
                            </section>}/>
                            <Route render={() => <Redirect to={"/profile/" + id + "/recipes"}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>;

    return <NotFound/>;
};

const NotFound = () => <div className="text-center mt-5">
    <h1>Ooops...</h1>
    <h5 className="text-muted">Requested user doesn't exist</h5>
</div>;

export default Profile;
