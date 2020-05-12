import React from "react";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../constants/APIurl";
import googleLogo from "../../../assets/google-logo.png";
import {useForm} from "react-hook-form";
import * as AuthAPI from "../../api/auth";
import {LoginRequest} from "../../api/auth";
import {useDispatch} from "react-redux";
import {me} from "../../api/profile";
import {login} from "../../store/auth";
import {RouteComponentProps} from "react-router";
import {toast} from "react-toastify";


const Login = ({history}: RouteComponentProps) => {
    const {handleSubmit, register} = useForm<LoginRequest>();
    const dispatch = useDispatch();

    const onSubmit = handleSubmit(async (form): Promise<void> => {
        try {
            const token = await AuthAPI.login(form);
            localStorage.setItem(ACCESS_TOKEN, token.accessToken);
            const response = await me();
            dispatch(login(response));
            history.push("/home")
        } catch (e){
            toast.error("Invalid password or email")
            console.log(e)
        }
    });

    return <div id="authentication-card">
        <h4 className="mb-3">Login to Cooking Notes</h4>
        <a className="btn social-btn authentication-input" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google"/> Login with Google</a>
        <div id="authentication-separator"><span>OR</span></div>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" className="form-control authentication-input" placeholder="Email"
                   ref={register} required/>
            <input type="password" name="password" className="form-control authentication-input" placeholder="Password"
                   ref={register} required/>
            <button type="submit" className="btn btn-primary authentication-input mt-0">Login</button>
        </form>
    </div>;
};

export default Login;
