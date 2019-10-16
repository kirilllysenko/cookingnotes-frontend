import React, {useState, useEffect} from 'react';
import {getProfile} from "../store/actions";

const Profile = ({location})=>{
    const [user, changeUser] = useState({});
    const [isFetching, changeFetching] = useState(true);
    const [error, changeError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        getProfile(params.get("id"), data=>{
            changeUser(data);
            changeFetching(false);
        }, ()=>{
            changeError(true);
            changeFetching(false);
        });
    }, []);

    let content;
    console.log(user);
    if (error || isFetching)
        content = <div>Nothing</div>
    else content = <div className="container">
        <div className="d-flex align-items-center">
            <img className="profile-avatar" src={user.imageUrl} alt="Hello"/>
            <div className="ml-4">
                <h3>{user.name}</h3>
                <h5>Posted recipes: {user.recipesCount}</h5>
            </div>
        </div>
    </div>
    return content;
}

export default Profile;