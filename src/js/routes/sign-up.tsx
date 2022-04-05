import React, {useState} from "react";
import {GOOGLE_AUTH_URL} from "../constants/APIurl";
import googleLogo from "../../assets/google-logo.png";
import {signup, SignUpRequest} from "../api/auth";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const SignUp = () => {
    const {handleSubmit, register, getValues, errors} = useForm<SignUpRequest>();
    const [verify, changeVerify] = useState(false);

    const onSubmit = handleSubmit(async (form) => {
        try {
            await signup(form);
            changeVerify(true);
        } catch (e) {
            console.log(e);
            toast.error("An error happened. Please try again")
        }
    });

    if (verify)
        return <div className="container text-center">
            Please go to the link which sent to your email {getValues().email}
        </div>;

    return <div id="authentication-card">
        <h4 className="mb-3">Sign up to Cooking Notes</h4>
        {/*<a className="btn social-btn authentication-input" href={GOOGLE_AUTH_URL}>*/}
        {/*    <img src={googleLogo} alt="Google"/>Sign up with Google</a>*/}
        {/*<div id="authorisation-separator">*/}
        {/*    <span>OR</span>*/}
        {/*</div>*/}
        <form onSubmit={onSubmit}>
            <div className="align-items-center mt-2 d-flex flex-column">
                <input type="text" name="name" autoComplete="off"
                       className="form-control authentication-input" placeholder="Name"
                       ref={register} required/>
                {errors.name?<div className="text-danger">Fill out this field</div>:null}
                <input type="email" name="email" autoComplete="off"
                       className="form-control authentication-input" placeholder="Email"
                       ref={register} required/>
                {errors.name?<div className="text-danger">Fill out this field</div>:null}
                <input type="password" name="password" autoComplete="off"
                       className="form-control authentication-input" placeholder="Password"
                       ref={register} required/>
                {errors.name?<div className="text-danger">Fill out this field</div>:null}
                <button type="submit" className="btn btn-primary authentication-input mt-0">Sign up</button>
            </div>
        </form>
    </div>;
};

export default SignUp;