import React, {useEffect, useState} from "react";
import {Redirect, RouteComponentProps} from "react-router-dom";
import Spinner from "../components/spinner";
import {verify} from "../api/auth";
import {toast} from "react-toastify";

const VerifyHandler = ({location}: RouteComponentProps) => {
    const [isLoading, changeIsLoading] = useState(true);

    const handleVerification = async () => {
        try {
            const params = new URLSearchParams(location.search);
            if (!params.get("id")) {
                changeIsLoading(false);
                return;
            }
            await verify(params.get("id") as string);
            changeIsLoading(false);
        } catch (e) {
            console.log(e);
            toast.error("An error happened. Please try again")
        }
    };

    useEffect(() => {
        handleVerification();
    }, []);

    if (isLoading)
        return <div className="d-flex justify-content-center mt-5"><Spinner/></div>;

    return <Redirect to="/login"/>;
};

export default VerifyHandler;
