import React, {useState} from 'react'
import {signup} from "../store/actions";
import {GOOGLE_AUTH_URL} from "../constants/APIurl";
import googleLogo from "../../img/google-logo.png";
import CropImage from "../util/CropImage";
import readImage from "../util/readImage";

const SignUp = () => {
    const [name, changeName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [avatar, changeAvatar] = useState(null);

    const createContent = (image) => {
        let content;
        if (image != null) {
            content = <img className="w-100 h-100" src={URL.createObjectURL(image)} alt="food"/>
        } else content = "Upload avatar";
        console.log(content);
        return content;
    }

    const avatarContent = createContent(avatar);

    console.log(avatarContent);

    const handleSubmit = () => {
        readImage(avatar).then(avatar=>{
            signup({name, email, password, avatar})
        })
    }

    return <div id="authentication-card">
        <h4 className="mb-3">Sign up to Cooking Notes</h4>
        <a className="btn social-btn authentication-input" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google"/>Sign up with Google</a>
        <div id="authorisation-separator">
            <span>OR</span>
        </div>
        <div className="align-items-center mt-2 d-flex flex-column">
            <div className="w-50">
                <CropImage content={avatarContent} width={200}
                           height={200} onChange={changeAvatar}/>
            </div>
            <input type="text" name="name"
                   className="form-control authentication-input" placeholder="Name"
                   value={name} onChange={e => changeName(e.target.value)} required/>
            <input type="email" name="email"
                   className="form-control authentication-input" placeholder="Email"
                   value={email} onChange={e => changeEmail(e.target.value)} required/>
            <input type="password" name="password"
                   className="form-control authentication-input" placeholder="Password"
                   value={password} onChange={e => changePassword(e.target.value)} required/>
            <button onClick={handleSubmit} className="btn btn-primary authentication-input mt-0">Sign up</button>
        </div>
    </div>
}

export default SignUp;