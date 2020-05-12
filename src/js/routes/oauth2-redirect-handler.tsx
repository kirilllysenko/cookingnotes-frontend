import React, {useEffect, useState} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import {ACCESS_TOKEN} from "../constants/APIurl";
import {me} from "../api/profile";
import {login} from "../store/auth";
import Spinner from "../components/spinner";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

const OAuth2RedirectHandler = ({location}: RouteComponentProps) => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const [isLoading, changeIsLoading] = useState(true);
    const [error, changeError] = useState(false);
    const dispatch = useDispatch();

    const initialLoad = async () => {
        if (token) {
            try {
                changeIsLoading(false);
                localStorage.setItem(ACCESS_TOKEN, token);
                const response = await me();
                dispatch(login(response));
            } catch(e){
                console.log(e);
                toast.error("An error happened. Please try again")
            }
        } else
            changeIsLoading(false);
    };

    useEffect(() => {
        initialLoad();
    }, []);


    if (isLoading) {
        return <Spinner/>;
    } else {
        if (error)
            return <Redirect to="/login"/>;
        else
            return <Redirect to="/home"/>;
    }
};

export default OAuth2RedirectHandler;
