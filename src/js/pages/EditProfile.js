import React, {useState, useEffect} from 'react';
import {editProfile, getMyProfile} from "../store/actions";
import CropImage from "../util/CropImage";
import topImage from "../../img/pages/add-recipe-top.png";
import b64toBlob from "../util/b64toBlob";
import $ from "jquery";
import readImage from "../util/readImage";

const EditProfile = () => {
    const [name, changeName] = useState("");
    const [image, changeImage] = useState("")
    const [isFetching, stopFetching] = useState(true);
    useEffect(() => {
        getMyProfile(data => {
            changeName(data.name);
            changeImage(b64toBlob(data.avatar))
            stopFetching(false);
        });
    }, []);
    const submit = ()=>{
        readImage(image).then((data)=>{
            editProfile({name, avatar: data}, () => {
                $.notify({message: "Profile changed successfully"}, {type: "success"})
            })
        })
    }
    let content;
    if (isFetching)
        content = <div>Nothing</div>
    else content = <div>
        <div className="page-top" style={{backgroundImage: "url(" + topImage + ")"}}>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <h2>Edit Profile</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-5">
            <div className="d-flex">
                <div className="profile-avatar">
                    <CropImage content={<img className="w-100 h-100" src={URL.createObjectURL(image)} alt="food"/>} width={200} height={200} onChange={val=>changeImage(val)}/>
                </div>
                <div className="ml-4">
                    <div className="mt-3">
                        <label htmlFor="asjdflhaskjdf">Name</label>
                        <input value={name} id="asjdflhaskjdf" className="input-1" type="text"
                               onChange={e => changeName(e.target.value)}/>
                    </div>
                    <button className="btn btn-1 mt-4" onClick={submit}>Apply</button>
                </div>
            </div>
        </div>
    </div>
    return content;
}

export default EditProfile;